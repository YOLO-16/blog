import styles from '../styles/Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <p>© {new Date().getFullYear()} Portfolio & Blog SPA. Built for the graduation project.</p>
  </footer>
);

export default Footer;
