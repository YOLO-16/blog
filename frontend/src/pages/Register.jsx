import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import formStyles from '../styles/Form.module.css';
import styles from '../styles/Page.module.css';
import ErrorMessage from '../components/ErrorMessage.jsx';

const Register = () => {
  const navigate = useNavigate();
  const { register, authLoading } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className={styles.narrow}>
      <div className={styles.pageHeading}>
        <h2>Register</h2>
        <p>Create an account to manage projects and blog posts.</p>
      </div>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={authLoading}>
          {authLoading ? 'Creating account...' : 'Register'}
        </button>
      </form>
      {error && <ErrorMessage message={error} />}
      <p>
        Already registered? <Link to="/login">Log in</Link>.
      </p>
    </section>
  );
};

export default Register;
