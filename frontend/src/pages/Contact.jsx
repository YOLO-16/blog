import { useState } from 'react';
import { apiRequest } from '../services/apiClient.js';
import formStyles from '../styles/Form.module.css';
import styles from '../styles/Page.module.css';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

const initialState = { name: '', email: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await apiRequest('/api/contact', { method: 'POST', data: form });
      setSuccess('Message sent! Thanks for reaching out.');
      setForm(initialState);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.narrow}>
      <div className={styles.pageHeading}>
        <h2>Contact</h2>
        <p>Send a message directly into the MongoDB-backed inbox.</p>
      </div>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Your message"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {loading && <Loader label="Sending message..." />}
      {error && <ErrorMessage message={error} />}
      {success && <p>{success}</p>}
    </section>
  );
};

export default Contact;
