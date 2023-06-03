import React from "react";
import api from '../utils/Api.js';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="root__main">
      <section className="profile root__profile">
        <img src={userAvatar} alt="Жак-Ив Кусто - французский исследователь Мирового океана, фотограф, режиссёр, изобретатель, автор множества книг и фильмов." className="profile__avatar" />
        <button className="profile__avatar-btn" onClick={props.onEditAvatar} type="button"></button>
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button className="profile__edit-btn main-link" onClick={props.onEditProfile} type="button"></button>
          </div>
          <p className="profile__sub-title">{userDescription}</p>
        </div>
        <button className="profile__add-btn main-link" onClick={props.onAddPlace} type="button"></button>
      </section>
      <section className="root__elements-wrapper">
        <ul className="elements root__elements">
        </ul>
      </section>
    </main>
  )
}

export default Main; 