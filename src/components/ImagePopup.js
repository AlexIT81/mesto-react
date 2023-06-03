function ImagePopup() {
  return (
    <div className="popup popup_image">
      <div className="popup__image-wrapper">
        <figure className="popup__figure">
          <img className="popup__big-image" src="https://plus.unsplash.com/premium_photo-1675949335329-d42910909742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Байкал" />
          <figcaption className="popup__figcaption">Байкал</figcaption>
        </figure>
        <button className="popup__close main-link" type="button"></button>
      </div>
    </div>
  )
}

export default ImagePopup;