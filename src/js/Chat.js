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
      drawMessage: this.drawMessage.bind(this),
      leaveChat: this.renderRegisterForm.bind(this)
    });
  }

  init() {
    if (this.container) this.formsAddEventListeners()
    else console.log('DOM Error')
  }


  onOpenConnection(connection) {
    if (!connection) {
      alert('Error webSocket');
      return
    }
    this.renderRegisterForm()
    this.disconnect()
  }

  disconnect() {
    const disconnectBtn = this.container.querySelector('.leaveChat');
    disconnectBtn.addEventListener('click', () => {
      this.api.onClose()
    })
  }

  renderRegisterForm() {
    const modalGroup = this.container.querySelector('.modalGroup');
    modalGroup.style.display = 'none'
    const registerForm = this.container.querySelector('.registerForm');
    registerForm.style.display = 'flex';
  }

  formsAddEventListeners() {
    const registerForm = this.container.querySelector('.registerForm');
    registerForm.addEventListener('submit', this.onRegister.bind(this));

    const sendMsgForm = this.container.querySelector('.chatConnect');
    sendMsgForm.addEventListener('submit', this.onSendMsg.bind(this))
  }

  async onRegister(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    this.api.onRegister(Object.fromEntries(formData));
  }

  showAlert(data) {
    const {msg, command} = data;
    if (command === 'register') {
      this.container.querySelector('.registerForm').reset()
    }
    alert(msg)
  }

  renderChatWindows(users) {
    const chatModal = this.container.querySelector('.modalGroup');
    chatModal.style.display = 'inline-flex';
    const usersContainer = this.container.querySelector('.users');
    const usersCol = usersContainer.querySelectorAll('.userWRP');
    if (usersCol.length > 0) {
      for (const user of usersCol) {
        user.remove()
      }
    }
    for (const user of users) {
      user.name = user.name === this.currentUser ? 'You' : user.name
      const userView = new UserView(usersContainer);
      userView.drawUser(user)
    }
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
    e.target.reset()
  }

  drawMessage(data) {
    data.from = data.from === this.currentUser ? 'You' : data.from;
    const container = this.container.querySelector('.messageContainer');
    const messageView = new MessageView(container);
    messageView.drawMessage(data)
  }
}
