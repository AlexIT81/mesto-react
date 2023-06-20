import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  }

  return (
      <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} isOpen={isOpen} onClose={onClose} buttonText={'Сохранить'} onSubmit={handleSubmit}>
        <input ref={avatarRef} className="popup__input popup__input_name" type="url" name="link" required placeholder="Ссылка на аватар" />
        <span className="popup__error link-input-error"></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;