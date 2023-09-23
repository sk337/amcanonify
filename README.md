# AMC Anonify

### Setup

Requirements

* node js
* a running discourse instance with the chat plugin enabled
* a server with an exposed port prefably 80

steps

1. know the id of the chat channel you want the anonymose users to talk on and put that id in the varible in `index.js` on `line 16`
2. create an incomming webhook which can be found at <https://{discourseurl}/admin/plugins/chat> for that same chat channel and assign that url to the env var `webhook`
3. create a out going webhook which can be made at <https://{discourseurl}/admin/api/web_hooks> create a secret string for it and assign that string to the env var `incomingsecret` make sure you select the event trigger `chat_message_event` set the payload url to <https://{amcanonify}/webhook>
5. run `npm i` then `node index.js`

if you have any trouble email me at <a href="mailto:rimuru@cryptolab.net">rimuru@cryptolab.net</a> or on discord at rf.to