import Popup from './popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, createValidator) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.form');
    createValidator(this._formElement);
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
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
