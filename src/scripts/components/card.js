export default class Card {
  constructor(
    cardData,
    templateSelector,
    handleCardClick,
    handleSetLike,
    handleDeleteLike,
    deletePopup,
    ownerId,
  ) {
    this._cardData = cardData;
    this._ownerId = ownerId;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._placeImage = this._cardElement.querySelector('.place__image');
    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;
    this._like = this._like.bind(this);
    this._deletePopup = deletePopup;
    this._trashButton = this._cardElement.querySelector(
      '.places__trash-button',
    );
    this._placeLikeCounter = this._cardElement.querySelector(
      '.place__like-counter',
    );
    this._placeLikeButton = this._cardElement.querySelector(
      '.place__like-button',
    );
    this._hasLike = this._cardData.likes
      .map((like) => like._id)
      .includes(this._ownerId);
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.places__item')
      .cloneNode(true);
    return templateElement;
  }

  _like() {
    if (!this._hasLike) {
      this._handleSetLike().then((data) => {
        this._changeLikeButton(true, data.likes.length);
      });
    } else {
      this._handleDeleteLike().then((data) => {
        this._changeLikeButton(false, data.likes.length);
      });
    }
  }

  _changeLikeButton(status, count) {
    this._placeLikeCounter.textContent = count;
    if (status) {
      this._placeLikeButton.classList.add('place__like-button_active');
    } else {
      this._placeLikeButton.classList.remove('place__like-button_active');
    }

    this._hasLike = status;
  }

  deleteCard() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector('.place__like-button');

    likeButton.addEventListener('click', this._like);
    this._trashButton.addEventListener('click', () =>
      this._deletePopup.open(this, this._cardData._id),
    );
    this._placeImage.addEventListener('click', () =>
      this._handleCardClick(this._cardData.link, this._cardData.name),
    );
  }

  createCard() {
    const placeTitle = this._cardElement.querySelector('.place__title');
    const trashButton = this._cardElement.querySelector(
      '.places__trash-button',
    );
    if (this._cardData.owner._id !== this._ownerId) {
      trashButton.classList.add('places__trash-button_invisible');
    }
    this._changeLikeButton(this._hasLike, this._cardData.likes.length);
    placeTitle.textContent = this._cardData.name;
    this._placeImage.alt = this._cardData.name;
    this._placeImage.src = this._cardData.link;

    this._setEventListeners();

    return this._cardElement;
  }
}
