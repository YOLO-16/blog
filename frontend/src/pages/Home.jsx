import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';

const Home = () => (
  <section className={styles.hero}>
    <div>
      <p className={styles.kicker}>Graduation Project</p>
      <h1>Showcase your work with a modern SPA tied to your REST API.</h1>
      <p className={styles.subtitle}>
        This React app consumes the portfolio &amp; blog API you built in the backend project. Browse public content,
        send messages, leave comments, and manage everything via the secure admin dashboard.
      </p>
      <div className={styles.ctaRow}>
        <Link to="/projects" className={styles.primary}>
          View Projects
        </Link>
        <Link to="/blog" className={styles.secondary}>
          Read the Blog
        </Link>
      </div>
    </div>
    <div className={styles.metrics}>
      <div>
        <strong>React + Express</strong>
        <span>Fully integrated stack</span>
      </div>
      <div>
        <strong>JWT Auth</strong>
        <span>Protected admin tools</span>
      </div>
      <div>
        <strong>MongoDB Atlas</strong>
        <span>Live data source</span>
      </div>
    </div>
  </section>
);

export default Home;
