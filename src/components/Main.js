import React from "react";
import api from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
  const [userInfo, setUserInfo] = React.useState({ userName: '', userDescription: '', userAvatar: '' });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getServerData()
      .then((res) => {
        const [initialCards, userData] = res;
        setUserInfo({ userName: userData.name, userDescription: userData.about, userAvatar: userData.avatar })
        setCards(initialCards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="root__main">
      <section className="profile root__profile">
        <img src={userInfo.userAvatar} alt={userInfo.userDescription} className="profile__avatar" />
        <button className="profile__avatar-btn" onClick={props.onEditAvatar} type="button"></button>
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__title">{userInfo.userName}</h1>
            <button className="profile__edit-btn main-link" onClick={props.onEditProfile} type="button"></button>
          </div>
          <p className="profile__sub-title">{userInfo.userDescription}</p>
        </div>
        <button className="profile__add-btn main-link" onClick={props.onAddPlace} type="button"></button>
      </section>
      <section className="root__elements-wrapper">
        <ul className="elements root__elements">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
    </main >
  )
}

export default Main; 