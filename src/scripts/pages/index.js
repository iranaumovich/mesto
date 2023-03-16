import '../../pages/index.css';
import {
  nameInput,
  descriptionInput,
  editButton,
  addButton,
} from '../utils/constants.js';
import initialCards from '../utils/cards.js';
import Card from '../components/card.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import Section from '../components/section.js';
import UserInfo from '../components/userInfo.js';
import FormValidator from '../components/formValidator.js';

const profileInfo = new UserInfo({
  userNameSelector: '.profile__title',
  descriptionSelector: '.profile__subtitle',
});

const profileEditPopup = new PopupWithForm(
  '.popup_type_edit-form',
  handleUserForm,
);

const cardAddPopup = new PopupWithForm('.popup_type_add-form', handleCardForm);

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  '.places',
);

function renderCard(cardItem) {
  const newCard = new Card(cardItem, '.template', (link, name) =>
    imagePopup.open(link, name),
  );
  const newCardCreate = newCard.createCard();
  cardList.addItem(newCardCreate);
}

function handleUserForm(inputValues) {
  profileInfo.setUserInfo(inputValues.name, inputValues.about);
}

function handleCardForm(inputValues) {
  const cardData = {
    name: inputValues['picture-title'],
    link: inputValues['picture-link'],
  };
  renderCard(cardData);
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

cardList.renderItems();

cardAddPopup.setEventListeners();
