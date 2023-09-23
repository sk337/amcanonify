const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const crypto = require('crypto');
const axios = require('axios');

app.settings['x-powered-by'] = false
// web hook for outgoing messages you can get one at https://{discourseurl}/admin/plugins/chat
const webhookUrl = process.env['webhook']
// secret string for webhook pointed here at https://{discourseurl}/admin/api/web_hooks
const secret = process.env['incomingsecret']
// chat channel id to listen to
const chatid = 2

function hmacSAH256(msg, secret) {
  hmac = crypto.createHmac("sha256", secret)
  hmac.update(msg)
  return hmac.digest()
}

app.use(express.raw({ "type": "*/*" }));
app.use(express.static(__dirname + "/public"))

app.post('/webhook', (req, res) => {

  hmacdigest = hmacSAH256(req.body, secret).toString('hex')
  hmacexpect = req.headers['x-discourse-event-signature'].replace('sha256=', '')
  if (hmacdigest != hmacexpect) {
    res.status(401)
    res.send('seceret invalid')
    return
  }
  jsonData = JSON.parse(req.body.toString('utf8'))
  if (req.headers['x-discourse-event-type'] == 'chat_message' && jsonData['chat_message']['channel']['id'] == chatid) {
    // console.log(jsonData['chat_message']['message']['user'])
    msg = `<span class="green">[</span>#AMC<span class="green">]</span> <span class="grey">@</span> <span class="rf_god">${jsonData['chat_message']['message']['user']['username']}</span>: ${jsonData['chat_message']['message']['message']}<br>`
    io.emit("message", msg)

  }
  res.send("Succuess")
  res.status(200)
})

io.on('connection', (socket) => {

  socket.on('shout', (e) => {
    console.log(e)
    axios.post(webhookUrl, {'text': e})
  })
  // socket.on('disconnect', () => {
  // })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});