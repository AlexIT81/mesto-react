import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name={'edit'} title={'Редактировать профиль'} isOpen={isOpen} onClose={onClose} buttonText={'Сохранить'} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_name" type="text" name="name" minLength="2" maxLength="40" value={name} onChange={handleNameChange} required placeholder="Имя" />
      <span className="popup__error name-input-error"></span>
      <input className="popup__input popup__input_job" type="text" name="job" minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} required placeholder="Профессия" />
      <span className="popup__error job-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;