import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, link: '', name: ''});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({isOpen: true, link: card.link, name: card.name});
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">
      <div className="root page__root">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
        {isEditProfilePopupOpen &&
          <PopupWithForm name={'edit'} title={'Редактировать профиль'} isOpen={true} onClose={closeAllPopups} children={
            <>
              <input className="popup__input popup__input_name" type="text" name="name" minLength="2" maxLength="40" required placeholder="Имя" />
              <span className="popup__error name-input-error"></span>
              <input className="popup__input popup__input_job" type="text" name="job" minLength="2" maxLength="200" required placeholder="Профессия" />
              <span className="popup__error job-input-error"></span>
            </>} />
        }
        {isAddPlacePopupOpen &&
          <PopupWithForm name={'add'} title={'Новое место'} isOpen={true} onClose={closeAllPopups} children={
            <>
              <input className="popup__input popup__input_title" type="text" name="title" minLength="2" maxLength="30" required placeholder="Название" />
              <span className="popup__error title-input-error"></span>
              <input className="popup__input popup__input_link" type="url" name="link" required placeholder="Ссылка на картинку" />
              <span className="popup__error link-input-error"></span>
            </>} />
        }
        {isEditAvatarPopupOpen &&
          <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} isOpen={true} onClose={closeAllPopups} children={
            <>
              <input className="popup__input popup__input_name" type="url" name="link" required placeholder="Ссылка на аватар" />
              <span className="popup__error link-input-error"></span>
            </>} />
        }
        {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups}/>}
      </div>
    </div>
  );
}

export default App;
