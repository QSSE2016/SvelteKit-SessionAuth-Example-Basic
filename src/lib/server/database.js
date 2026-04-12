// In a real app, this data would live in a database,
// rather than in memory. But for now, we cheat.

// This is stateful auth (server + cookies --> sessions) as opposed to stateless (JWT + refresh tokens)
// In this one the server remembers user state whereas the opposite is true on the JWT approach.
// Both are great so pick the one that fits best (google it i guess)

// Typically session cleanup is done by the database you are using itself (e.g Redis, MySQL etc.) by
// using TTL (Time-To-Live) a mechanism that auto deletes things are no longer "alive".
// You can also use a background job to do it or the worst option of lazy delete (delete as you check in getUserBySession)
// For the sake of this exercise, I will just do a background job (setInterval) that will clean up any stale sessions.

// Truth be told in real apps, you actually use TTL and lazy cleanup (on access). or all 3 for max coverage.

export const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

const users = [];
const sessions = [];

setInterval(
  () => {
    cleanupExpiredSessions();
  },
  60 * 60 * 1000,
);

export function createUser(name, email, password) {
  if (users.find((user) => user.email == email)) {
    throw new Error("User with that email already exists.");
  }

  users.push({
    id: crypto.randomUUID(),
    name: name,
    email: email,
    password: password, // obviously you should hash this but im too lazy rn.
  });
}

export function loginUser(email, password) {
  const user = users.find(
    (user) => user.email == email && user.password == password,
  );

  if (!user) {
    throw new Error("Your email or password is incorrect. Please try again.");
  }

  const session = {
    sessionId: crypto.randomUUID(),
    userId: user.id,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
  };

  sessions.push(session);
  return session.sessionId;
}

export function getUserFromSession(sessionId) {
  const session = sessions.find((session) => session.sessionId == sessionId);

  //
  if (!session) return null;
  if (session.expiresAt < new Date()) {
    sessions = sessions.filter((s) => s.sessionId !== session.sessionId); // lazy cleanup (on access)
    return null;
  }

  const user = users.find((user) => user.id == session.userId);

  return user
    ? {
        name: user.name,
        email: user.email,
      }
    : null;
}

function cleanupExpiredSessions() {
  sessions = sessions.filter((session) => session.expiresAt < new Date());
}
