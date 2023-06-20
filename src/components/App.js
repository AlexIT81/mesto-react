import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardConfirmPopup from './DeleteCardConfirmPopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, link: '', name: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [buttonText, setButtonText] = React.useState('');
  const [deleteCardConfirm, setDeleteCardConfirm] = React.useState({ isOpen: false, card: {} });

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
    setButtonText('Сохранить');
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setButtonText('Добавить');
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setButtonText('Обновить');
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, link: card.link, name: card.name });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false, link: '', name: '' });
    setDeleteCardConfirm({ isOpen: false, card: '' })
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

  function handleUpdateUser({ name, about }) {
    setButtonText('Сохранение..');
    api
      .setUserInfo({ name, about })
      .then(
        (userData) => {
          setCurrentUser(userData);
          closeAllPopups();
        }
      )
      .catch(err => console.error(err))
      .finally(() => setButtonText('Сохранить'));
  }

  function handleUpdateAvatar({ avatar }) {
    setButtonText('Обновление...');
    api
      .setAvatar(avatar)
      .then(
        (userData) => {
          setCurrentUser(userData);
          closeAllPopups();
        }
      )
      .catch(err => console.error(err))
      .finally(() => setButtonText('Обновить'));

  }

  function handleAddPlaceSubmit({ name, link }) {
    setButtonText('Добавление...');
    api
      .addNewCard({ name, link })
      .then(
        (newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        }
      )
      .catch(err => console.error(err))
      .finally(() => setButtonText('Добавить'));
  }

  function handleCardDelete() {
    setButtonText('Удаление...');
    api
      .deleteCard(deleteCardConfirm.card._id)
      .then(
        () => {
          setCards(cards.filter((item) => item._id !== deleteCardConfirm.card._id));
          closeAllPopups();
          setDeleteCardConfirm({ isOpen: false, card: {} });
        }
      )
      .catch(err => console.error(err))
      .finally(() => setButtonText('Да!'));
  }

  function handleCardDeleteConfirmClick(card) {
    setDeleteCardConfirm({ isOpen: true, card: card });
    setButtonText('Да!');

  }

  return (
    <div className="page">
      <div className="root page__root">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDeleteConfirmClick} />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} buttonText={buttonText} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} buttonText={buttonText} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} buttonText={buttonText} />
          <DeleteCardConfirmPopup isOpen={deleteCardConfirm.isOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} buttonText={buttonText} />
          {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
