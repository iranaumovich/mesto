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
  createValidator,
);

const cardAddPopup = new PopupWithForm(
  '.popup_type_add-form',
  handleCardForm,
  createValidator,
);

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, '.template', (link, name) =>
        imagePopup.open(link, name),
      );
      card.renderCard(cardList.addItem);
    },
  },
  '.places',
);

function handleUserForm(inputValues) {
  profileInfo.setUserInfo(inputValues.name, inputValues.about);
}

function handleCardForm(inputValues) {
  const cardData = {
    name: inputValues['picture-title'],
    link: inputValues['picture-link'],
  };
  const newCard = new Card(cardData, '.template', (link, name) =>
    imagePopup.open(link, name),
  );
  newCard.renderCard(cardList.addItem);
}

function createValidator(formElement) {
  const validator = new FormValidator(
    {
      inputSelector: '.form__item',
      submitButtonSelector: '.form__button',
      inputErrorClass: 'form__item_type_error',
      errorClass: 'form__error_visible',
    },
    formElement,
  );
  validator.enableValidation();
}

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
