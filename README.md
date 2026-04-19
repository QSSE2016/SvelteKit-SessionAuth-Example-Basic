# SvelteKit Session (Stateful) Auth using Cookies

This is a small app to showcase how you can implement session based auth in SvelteKit. In general there are two types of auth:
- Stateful (Sessions, e.g Cookies + Server)
- Stateless (JWT, refresh tokens) - Completely different architecture/idea

*Auth: Authentication and Authorization*

Both have their upsides and downsides and this app chooses the first as it's pretty simple to implement. **The basic idea is this:**
1. User logs in
2. If user has entered correct information, server approves, generates a session (creates sessionID) and sends back a sessionID
3. Cookie gets set with that sessionID
4. On any requests, under specific routes (that you choose), cookies are checked to see if there is a cookie with a valid sessionID
5. If yes, user is authenticated and can access whatever route they are trying to access.
6. If not, user is redirected back to login.

Obviously cookies at some point time out (in this case after an hour) and are no longer valid/are deleted. You will find relevant comments on the database.js file about how expired session IDs are typically handled. For the sake of this example app, a fake in-memory "database" is used and I just have a background job (setInterval) cleaning up any expired sessionIDs.

That's about it really, feel free to look at the code or even try to recreate it yourself for the best possible learning experience. I hope this helps someone who was confused about how auth works or how to implement it.

_PS: In real apps your users will be able to manually log out. You should get rid of the corresponding session. In this example, manually logging out isn't implemented so I don't do that, but yeah, should be trivial to implement._
