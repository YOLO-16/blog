import styles from '../styles/Feedback.module.css';

const Loader = ({ label = 'Loading...' }) => (
  <div className={styles.feedback} role="status">
    <span className={styles.spinner} aria-hidden="true" />
    <span>{label}</span>
  </div>
);

export default Loader;
