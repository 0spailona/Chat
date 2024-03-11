export default class ChatAPI {
  constructor(url, eventHandlers) {
    this.url = url;
    this.ws = new WebSocket('ws://localhost:3000/ws');
    this.ws.addEventListener('open', this.onOpen.bind(this))
    this.ws.addEventListener('message', this.onMessage.bind(this))
    this.eventHandlers = eventHandlers;
  }

  onRegister(user) {
    const data = {type: 'register', user}
    const json = JSON.stringify(data);
    //console.log(json)

    this.ws.send(json)
  }

  onOpen(e) {
    this.eventHandlers.onOpenConnection?.call(this, e.returnValue)
  }

  onClose() {

  }

  onError() {

  }

  onSendMsg(msg){
    const data = {type:'send',data:msg.msg}
    const json = JSON.stringify(data)
    console.log('onSendApi',json)
    this.ws.send(json)
  }

  onMessage(e) {
    console.log('onMSg', e.data)
    const data = JSON.parse(e.data)

    switch (data.type) {
      case 'error':
        this.eventHandlers.onError?.call(this, data.reason)
        break;
      case 'ok': //console.log('ok', data)
        if (data.command === 'register') {
          this.eventHandlers.addCurrentUser?.call(this, data.user)
        } else if (data.command === 'exit') {
          console.log('exit')
        }
        break;
      case 'users': //console.log('users',data.users)
        this.eventHandlers.onRenderChat?.call(this, data.users)
        break;
      case 'message':
        this.eventHandlers.drawMessage?.call(this, {from: data.from, msg: data.data})
    }

  }
}
