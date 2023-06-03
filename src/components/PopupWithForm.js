function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" action="./" name={props.name} noValidate>
          {/* <input className="popup__input popup__input_name" type="text" name="name" minlength="2" maxlength="40" required placeholder="Имя" />
          <span className="popup__error name-input-error"></span>
          <input className="popup__input popup__input_job" type="text" name="job" minlength="2" maxlength="200" required placeholder="Профессия" />
          <span className="popup__error job-input-error"></span> */}
          {props.children}
          <button className="popup__button" type="submit">Сохранить</button>
        </form>
        <button className="popup__close main-link" onClick={props.onClose} type="button"></button>
      </div>
    </div>
  )
}

export default PopupWithForm;