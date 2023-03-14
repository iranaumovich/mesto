export default class FormValidator {
  constructor(formData, formElement) {
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorClass = formData.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );
    this._formButton = this._formElement.querySelector(
      this._submitButtonSelector,
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.getAttribute('aria-describedby')}`,
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.getAttribute('aria-describedby')}`,
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  _enableSubmitButton() {
    this._formButton.removeAttribute('disabled');
  }

  _disableSubmitButton() {
    this._formButton.setAttribute('disabled', true);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setInputsHandler() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener('submit', () => {
      this._toggleButtonState();
    });

    this._formElement.addEventListener('reset', () => {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
      this._disableSubmitButton();
    });
  }

  enableValidation() {
    this._setInputsHandler();
  }
}
