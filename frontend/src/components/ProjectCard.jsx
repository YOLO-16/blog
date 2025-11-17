import styles from '../styles/Card.module.css';

const ProjectCard = ({ project }) => (
  <article className={styles.card}>
    <div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className={styles.links}>
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            Repository
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Live Site
          </a>
        )}
      </div>
    </div>
    <span className={styles.meta}>Owner: {project.user?.username ?? 'N/A'}</span>
  </article>
);

export default ProjectCard;
