import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, link: '', name: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getServerData()
      .then((res) => {
        const [initialCards, userData] = res;
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch(err => console.error(err));
  }, []);

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
    setSelectedCard({ isOpen: true, link: card.link, name: card.name });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false, link: '', name: '' });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.error(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(setCards(cards.filter((item) => item._id !==card._id)))
      .catch(err => console.error(err));
  }

  function handleUpdateUser({name, about}) {
    api
      .setUserInfo({name, about})
      .then(res => setCurrentUser(res))
      .catch(err => console.error(err))
      .finally(closeAllPopups());

  }

  return (
    <div className="page">
      <div className="root page__root">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />        
          <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
          <Footer />
          {/* {isEditProfilePopupOpen &&
            <PopupWithForm name={'edit'} title={'Редактировать профиль'} isOpen={true} onClose={closeAllPopups} buttonText={'Сохранить'}>
              <input className="popup__input popup__input_name" type="text" name="name" minLength="2" maxLength="40" required placeholder="Имя" />
              <span className="popup__error name-input-error"></span>
              <input className="popup__input popup__input_job" type="text" name="job" minLength="2" maxLength="200" required placeholder="Профессия" />
              <span className="popup__error job-input-error"></span>
            </PopupWithForm>
          } */}
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
          {isAddPlacePopupOpen &&
            <PopupWithForm name={'add'} title={'Новое место'} isOpen={true} onClose={closeAllPopups} buttonText={'Создать'}>
              <input className="popup__input popup__input_title" type="text" name="title" minLength="2" maxLength="30" required placeholder="Название" />
              <span className="popup__error title-input-error"></span>
              <input className="popup__input popup__input_link" type="url" name="link" required placeholder="Ссылка на картинку" />
              <span className="popup__error link-input-error"></span>
            </PopupWithForm>
          }
          {isEditAvatarPopupOpen &&
            <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} isOpen={true} onClose={closeAllPopups} buttonText={'Сохранить'}>

              <input className="popup__input popup__input_name" type="url" name="link" required placeholder="Ссылка на аватар" />
              <span className="popup__error link-input-error"></span>
            </PopupWithForm>
          }
          {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
