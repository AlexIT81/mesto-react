import React from "react";
import api from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({onAddPlace, onCardClick, onEditAvatar, onEditProfile}) {
  // const [userInfo, setUserInfo] = React.useState({ userName: '', userDescription: '', userAvatar: '' });
  const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    api
      ._getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="root__main">
      <section className="profile root__profile">
        <img src={currentUser.avatar} alt={currentUser.about} className="profile__avatar" />
        <button className="profile__avatar-btn" onClick={onEditAvatar} type="button"></button>
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-btn main-link" onClick={onEditProfile} type="button"></button>
          </div>
          <p className="profile__sub-title">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn main-link" onClick={onAddPlace} type="button"></button>
      </section>
      <section className="root__elements-wrapper">
        <ul className="elements root__elements">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main >
  )
}

export default Main; 