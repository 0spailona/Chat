export default class UserView{
  constructor(container) {
    this.container = container
  }
  drawUser(user){
    this.user = user;
    const {id,name} = this.user;
    const userWRP = document.createElement('div');
    userWRP.classList.add('userWRP');
    userWRP.dataset.id = id;

    const userImg = document.createElement('div');
    userImg.style.background = 'lightgray';
    userImg.classList.add('userImg');

    userWRP.appendChild(userImg);

    const userName = document.createElement('span');
    userName.textContent = name;
    userName.classList.add('userName');

    userWRP.appendChild(userName);
    this.container.appendChild(userWRP)
  }

}
