import Popup from './popup';
import FormValidator from './formValidator';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.form');
    const formElement = this._formElement;
    this._validator = new FormValidator(
      {
        inputSelector: '.form__item',
        submitButtonSelector: '.form__button',
        inputErrorClass: 'form__item_type_error',
        errorClass: 'form__error_visible',
      },
      formElement,
    );
  }

  _getInputValues() {
    const inputList = this._formElement.querySelectorAll('.form__item');
    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._validator.enableValidation();
    this._formElement.addEventListener('submit', (evt) =>
      this._handleFormSubmit(evt),
    );
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
