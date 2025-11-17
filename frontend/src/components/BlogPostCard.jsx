import { Link } from 'react-router-dom';
import styles from '../styles/Card.module.css';

const BlogPostCard = ({ post }) => (
  <article className={styles.card}>
    <h3>{post.title}</h3>
    <p>{post.content.slice(0, 160)}{post.content.length > 160 ? '…' : ''}</p>
    <div className={styles.cardFooter}>
      <span>By {post.author?.username ?? 'Unknown'}</span>
      <Link to={`/blog/${post._id}`} className={styles.linkButton}>
        Read more
      </Link>
    </div>
  </article>
);

export default BlogPostCard;
