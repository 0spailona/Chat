export default class MessageView {
  constructor(container) {
    this.container = container
  }

  drawMessage(dataMsg) {
    const {from, msg} = dataMsg;

    const messageWRP = document.createElement('div');
    messageWRP.classList.add('messageWRP');

    if(from === 'You'){
      messageWRP.classList.add('currentUserMsg');
    } else {
      messageWRP.classList.add('otherUsersMsg');
    }

    const authorAndDateWrp = document.createElement('div');
    authorAndDateWrp.classList.add('authorAndDateWrp');

    const authorEl = document.createElement('span');
    authorEl.textContent = from;
    authorAndDateWrp.appendChild(authorEl);

    messageWRP.appendChild(authorAndDateWrp)

    const messageEl = document.createElement('span');
    messageEl.classList.add('message');
    messageEl.textContent = msg;

    messageWRP.appendChild(messageEl)

    this.container.appendChild(messageWRP)
  }
}
