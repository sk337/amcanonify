# AMC Anonify

### Setup

Requirements

* node js
* express
* a running discourse instance with the chat plugin enabled
* a server with an exposed port prefably 80

steps

1. know the id of the chat channel you want the anonymose users to talk on and put that id in the varible in `index.js` on `line 16`
2. create an incomming webhook which can be found at <https://{discourseurl}/admin/plugins/chat> for that same chat channel and assign that url to the env var `webhook`
3. create a out going webhook which can be made at <https://{discourseurl}/admin/api/web_hooks> create a secret string for it and assign that string to the env var `incomingsecret`
4. run `npm i` then `node index.js`