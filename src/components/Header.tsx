import './css/header.css';
import { Link } from 'react-router-dom';
function Header() {
  const role = localStorage.getItem('role');
  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/login'; 
};
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-title">
          <img src="/logo.png" alt="Logo de Javih" className="logo-area" />
          <div>
            <h1 className="blog-title">Javih.Blog</h1>
            <p className="subtitle">Reflexiones sobre cultura tecnológica y GameDev</p>
          </div>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            {role === 'admin' && (
              <Link to="/crear">Crear Post</Link>
            )}
            {role === 'admin' && (
              <button onClick={handleLogout}>Cerrar Sesión</button>
            )}
            
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
