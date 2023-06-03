import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header root__header">
      <a className="main-link" href="./index.html" title="Проект - Место">
        <img src={logo} alt="Проект - Место." className="header__logo" />
      </a>
    </header>
  )
}

export default Header;