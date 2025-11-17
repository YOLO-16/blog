import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import formStyles from '../styles/Form.module.css';
import styles from '../styles/Page.module.css';
import ErrorMessage from '../components/ErrorMessage.jsx';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authLoading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      const redirectTo = location.state?.from?.pathname || '/admin';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className={styles.narrow}>
      <div className={styles.pageHeading}>
        <h2>Login</h2>
        <p>Access your admin dashboard to manage the site.</p>
      </div>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={authLoading}>
          {authLoading ? 'Signing in...' : 'Login'}
        </button>
      </form>
      {error && <ErrorMessage message={error} />}
      <p>
        Need an account? <Link to="/register">Register here</Link>.
      </p>
    </section>
  );
};

export default Login;
