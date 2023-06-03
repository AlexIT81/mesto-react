function Card(props) {
  function handleClick() {
    props.onCardClick(props.card)
  }

  return (
    <li className="element" >
      <img className="element__img" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button className="element__trash main-link" type="button"></button>
      <div className="element__block">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__icon-wrapper">
          <button className="element__icon" type="button"></button>
          <span className="element__icon-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;