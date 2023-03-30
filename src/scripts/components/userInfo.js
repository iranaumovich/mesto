export default class UserInfo {
  constructor({ userNameSelector, descriptionSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(name, description, avatar) {
    this._userName.textContent = name;
    this._description.textContent = description;
    if (avatar) {
      this._avatar.src = avatar;
    }
  }
}
