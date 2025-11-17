import { useEffect, useState } from 'react';
import BlogPostCard from '../components/BlogPostCard.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { apiRequest } from '../services/apiClient.js';
import styles from '../styles/Page.module.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiRequest('/api/blog');
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section>
      <div className={styles.pageHeading}>
        <h2>Blog</h2>
        <p>Long-form updates, commentary, and release notes.</p>
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className={styles.grid}>
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;
