import { Link } from 'react-router-dom';
import styles from '../styles/Page.module.css';

const NotFound = () => (
  <section className={styles.narrow}>
    <div className={styles.pageHeading}>
      <h2>Page Not Found</h2>
      <p>The route you requested does not exist. Use the navigation to head back home.</p>
    </div>
    <Link to="/">Return home</Link>
  </section>
);

export default NotFound;
