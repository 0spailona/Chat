import ChatAPI from "./api/ChatAPI";
import UserView from "./userView";
import MessageView from "./MessageView";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI('http://localhost:3000', {
      onOpenConnection: this.onOpenConnection.bind(this),
      onError: this.showAlert.bind(this),
      onRenderChat: this.renderChatWindows.bind(this),
      addCurrentUser: this.addCurrentUser.bind(this),
      drawMessage: this.drawMessage.bind(this)
    });
  }

  init() {
    if (this.container) this.bindToDOM()
    else console.log('DOM Error')
  }

  bindToDOM() {
  }

  onOpenConnection(connection) {
    console.log('connection', connection)
    if (!connection) {
      alert('Error webSocket');
      return
    }
    this.drawRegisterForm()
  }

  drawRegisterForm() {
    const registerForm = this.container.querySelector('.registerForm');
    registerForm.style.display = 'flex';
    registerForm.addEventListener('submit', this.onRegister.bind(this));
  }

  async onRegister(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    this.api.onRegister(Object.fromEntries(formData))
  }

  showAlert(msg) {
    alert(msg)
  }

  renderChatWindows(users) {
    const chatModal = this.container.querySelector('.modalGroup');
    chatModal.style.display = 'inline-flex';
    const usersContainer = this.container.querySelector('.users');
    for (const user of users) {
      user.name = user.name === this.currentUser ? 'You' : user.name
      const userView = new UserView(usersContainer);
      userView.drawUser(user)
    }

    const sendMsgForm = this.container.querySelector('.chatConnect');
    sendMsgForm.addEventListener('submit', this.onSendMsg.bind(this))
  }

  addCurrentUser(user) {
    this.currentUser = user;
    const registerForm = this.container.querySelector('.registerForm');
    registerForm.reset();
    registerForm.style.display = 'none'
  }

  onSendMsg(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    this.api.onSendMsg(Object.fromEntries(formData))

  }

  drawMessage(data) {
    console.log('drawMessage', data)
    data.from = data.from === this.currentUser ? 'You' : data.from;
    const container = this.container.querySelector('.messageContainer');
    const messageView = new MessageView(container);
    messageView.drawMessage(data)
  }

  registerEvents() {
  }

  subscribeOnEvents() {
  }

  onEnterChatHandler() {
  }

  sendMessage() {
  }

  renderMessage() {
  }
}
