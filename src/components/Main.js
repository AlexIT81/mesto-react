function Main(props) {
  return (
    <main className="root__main">
      <section className="profile root__profile">
        <img src="<%=require('./images/jak-iv_kusto.jpg')%>" alt="Жак-Ив Кусто - французский исследователь Мирового океана, фотограф, режиссёр, изобретатель, автор множества книг и фильмов." className="profile__avatar" />
        <button className="profile__avatar-btn" onClick={props.onEditAvatar} type="button"></button>
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__title">Жак-Ив Кусто</h1>
            <button className="profile__edit-btn main-link" onClick={props.onEditProfile} type="button"></button>
          </div>
          <p className="profile__sub-title">Исследователь океана</p>
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