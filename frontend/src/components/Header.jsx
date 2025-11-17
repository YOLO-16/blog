import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from '../styles/Header.module.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link to="/" className={styles.logo}>
          Portfolio+
        </Link>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)} end>
          Home
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Projects
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Blog
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Contact
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/admin" className={({ isActive }) => (isActive ? styles.active : undefined)}>
              Admin
            </NavLink>
            <button type="button" className={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : undefined)}>
              Login
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : undefined)}>
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
