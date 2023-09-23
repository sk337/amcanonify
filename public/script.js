const socket = io();
socket.on('message', (d)=>{
  chat=document.getElementById('chat')
  chat.innerHTML = chat.innerHTML + d
})

document.getElementById('sht').addEventListener('click', (e)=>{
  socket.emit('shout', document.getElementById('text').value)
  document.getElementById('text').value=''
})