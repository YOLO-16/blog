import styles from '../styles/Feedback.module.css';

const ErrorMessage = ({ message }) => (
  <div className={`${styles.feedback} ${styles.error}`} role="alert">
    {message}
  </div>
);

export default ErrorMessage;
