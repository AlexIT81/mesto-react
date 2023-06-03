function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.card.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-wrapper">
        <figure className="popup__figure">
          <img className="popup__big-image" src={props.card.link} alt={props.card.name} />
          {/* <figcaption className="popup__figcaption">{props.card.name}</figcaption> */}
        </figure>
        <button className="popup__close main-link" onClick={props.onClose} type="button"></button>
      </div>
    </div>
  )
}

export default ImagePopup;