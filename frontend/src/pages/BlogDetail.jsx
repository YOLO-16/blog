import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { apiRequest } from '../services/apiClient.js';
import { useAuth } from '../context/AuthContext.jsx';
import styles from '../styles/Page.module.css';
import formStyles from '../styles/Form.module.css';

const BlogDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, token } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await apiRequest(`/api/blog/${id}`);
        setPost(data);
        setComments(data.comments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!body.trim()) return;
    setSubmitting(true);
    setCommentError('');
    try {
      const newComment = await apiRequest(`/api/blog/${id}/comments`, {
        method: 'POST',
        data: { body },
        token,
      });
      setComments((prev) => [newComment, ...prev]);
      setBody('');
    } catch (err) {
      setCommentError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return null;

  return (
    <article className={styles.narrow}>
      <div className={styles.pageHeading}>
        <h2>{post.title}</h2>
        <p>By {post.author?.username ?? 'Unknown author'}</p>
      </div>
      <p style={{ lineHeight: 1.7 }}>{post.content}</p>

      <section className={styles.pageHeading}>
        <h3>Comments</h3>
        {isAuthenticated ? (
          <form className={formStyles.form} onSubmit={handleSubmit}>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              required
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Posting...' : 'Add Comment'}
            </button>
            {commentError && <ErrorMessage message={commentError} />}
          </form>
        ) : (
          <p>Please log in to post a comment.</p>
        )}
      </section>

      <div>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((comment) => (
          <div key={comment._id} className={formStyles.comment}>
            <p>{comment.body}</p>
            <span>— {comment.author?.username ?? 'Anonymous'}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default BlogDetail;
