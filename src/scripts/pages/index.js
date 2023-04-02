import '../../pages/index.css';
import {
  nameInput,
  descriptionInput,
  editButton,
  addButton,
} from '../utils/constants.js';
import Card from '../components/card.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupConfirmDelete from '../components/popupConfirmDelete.js';
import Section from '../components/section.js';
import UserInfo from '../components/userInfo.js';
import FormValidator from '../components/formValidator.js';
import Api from '../components/api.js';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'a7a9da57-8aca-43e1-840a-faeb7be1b7c3',
    'Content-Type': 'application/json',
  },
});

api.getInitialCards().then((data) => {
  cardList.renderItems(data);
});

api.getUserInfoFromServer().then((data) => {
  profileInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
});

const profileInfo = new UserInfo({
  userNameSelector: '.profile__title',
  descriptionSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar',
});

const profileEditPopup = new PopupWithForm(
  '.popup_type_edit-form',
  handleUserForm,
);

const cardAddPopup = new PopupWithForm('.popup_type_add-form', handleCardForm);

const imagePopup = new PopupWithImage('.popup_type_image');

const cardList = new Section(renderCard, '.places');

function renderCard(cardItem) {
  const hasLike = cardItem.likes
    .map((like) => like._id)
    .includes(profileInfo.getId());
  const handleSetLike = () => api.setLike(cardItem._id);
  const handleDeleteLike = () => api.deleteLike(cardItem._id);

  const newCard = new Card(
    cardItem,
    '.template',
    hasLike,
    (link, name) => imagePopup.open(link, name),
    handleSetLike,
    handleDeleteLike,
    cardDeletePopup,
  );
  const newCardCreate = newCard.createCard();
  cardList.addItem(newCardCreate);
}

function handleUserForm(inputValues) {
  api.editUserInfo(inputValues.name, inputValues.about).then((data) => {
    profileInfo.setUserInfo(data.name, data.about);
  });
}

function handleCardForm(inputValues) {
  const cardData = {
    name: inputValues['picture-title'],
    link: inputValues['picture-link'],
  };
  api.addNewCard(cardData.name, cardData.link).then((data) => {
    renderCard(data);
  });
}

const profileEditPopupValidator = new FormValidator(
  {
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__error_visible',
  },
  profileEditPopup.getFormElement(),
);

const cardAddPopupValidator = new FormValidator(
  {
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__error_visible',
  },
  cardAddPopup.getFormElement(),
);

profileEditPopupValidator.enableValidation();
cardAddPopupValidator.enableValidation();

editButton.addEventListener('click', function () {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.userName;
  descriptionInput.value = userInfo.description;
  profileEditPopup.open();
});

addButton.addEventListener('click', () => cardAddPopup.open());

profileEditPopup.setEventListeners();

cardAddPopup.setEventListeners();

imagePopup.setEventListeners();

const cardDeletePopup = new PopupConfirmDelete(
  '.popup_type_delete',
  handleConfirmation,
);

function handleConfirmation(card, cardId) {
  api.deleteCard(cardId).then(() => {
    card.deleteCard();
  });
}

cardDeletePopup.setEventListeners();
