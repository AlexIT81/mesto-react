function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card)
  }

  return (
    <li className="element" >
      <img className="element__img" src={card.link} alt={card.name} onClick={handleClick} />
      <button className="element__trash main-link" type="button"></button>
      <div className="element__block">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__icon-wrapper">
          <button className="element__icon" type="button"></button>
          <span className="element__icon-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;