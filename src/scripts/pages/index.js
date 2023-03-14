import '../../pages/index.css';
import {
  nameInput,
  descriptionInput,
  editButton,
  addButton,
  pictureTitle,
  pictureLink,
} from '../utils/constants.js';
import initialCards from '../utils/cards.js';
import Card from '../components/card.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import Section from '../components/section.js';
import UserInfo from '../components/userInfo.js';

const profileInfo = new UserInfo({
  userNameSelector: '.profile__title',
  descriptionSelector: '.profile__subtitle',
});

const profileEditPopup = new PopupWithForm(
  '.popup_type_edit-form',
  handleUserForm,
);

const cardAddPopup = new PopupWithForm('.popup_type_add-form', handleCardForm);
cardAddPopup.setEventListeners();

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, '.template', () =>
        imagePopup.open(cardItem.link, cardItem.name),
      );
      const cardCreate = card.createCard();
      cardList.addItem(cardCreate);
    },
  },
  '.places',
);

function handleUserForm(evt) {
  evt.preventDefault();
  profileInfo.setUserInfo(nameInput.value, descriptionInput.value);
  profileEditPopup.close();
}

function handleCardForm(evt) {
  evt.preventDefault();
  const cardData = { name: pictureTitle.value, link: pictureLink.value };
  const newCard = new Card(cardData, '.template', () =>
    imagePopup.open(cardData.link, cardData.name),
  );
  const newCardCreate = newCard.createCard();
  cardList.addItem(newCardCreate);
  cardAddPopup.close();
  evt.target.reset();
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
