import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { apiRequest } from '../services/apiClient.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import formStyles from '../styles/Form.module.css';
import styles from '../styles/Admin.module.css';

const emptyProject = { title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' };
const emptyPost = { title: '', content: '' };

const Admin = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [postForm, setPostForm] = useState(emptyPost);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [projectData, postData] = await Promise.all([
          apiRequest('/api/projects'),
          apiRequest('/api/blog'),
        ]);
        setProjects(projectData);
        setPosts(postData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleProjectChange = (event) => {
    const { name, value } = event.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostChange = (event) => {
    const { name, value } = event.target;
    setPostForm((prev) => ({ ...prev, [name]: value }));
  };

  const upsertProject = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingProjectId) {
        const updated = await apiRequest(`/api/projects/${editingProjectId}`, {
          method: 'PUT',
          data: projectForm,
          token,
        });
        setProjects((prev) => prev.map((project) => (project._id === editingProjectId ? updated : project)));
      } else {
        const created = await apiRequest('/api/projects', {
          method: 'POST',
          data: projectForm,
          token,
        });
        setProjects((prev) => [created, ...prev]);
      }
      setProjectForm(emptyProject);
      setEditingProjectId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const removeProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    setError('');
    try {
      await apiRequest(`/api/projects/${id}`, { method: 'DELETE', token });
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const upsertPost = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingPostId) {
        const updated = await apiRequest(`/api/blog/${editingPostId}`, {
          method: 'PUT',
          data: postForm,
          token,
        });
        setPosts((prev) => prev.map((post) => (post._id === editingPostId ? updated : post)));
      } else {
        const created = await apiRequest('/api/blog', {
          method: 'POST',
          data: postForm,
          token,
        });
        setPosts((prev) => [created, ...prev]);
      }
      setPostForm(emptyPost);
      setEditingPostId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const removePost = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    setError('');
    try {
      await apiRequest(`/api/blog/${id}`, { method: 'DELETE', token });
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loader label="Loading dashboard..." />;

  return (
    <section>
      <h2>Admin Dashboard</h2>
      <p>Manage everything through secure, token-authenticated requests.</p>
      {error && <ErrorMessage message={error} />}

      <div className={styles.grid}>
        <div>
          <div className={styles.sectionHeading}>
            <h3>{editingProjectId ? 'Edit Project' : 'Create Project'}</h3>
            {editingProjectId && (
              <button type="button" onClick={() => { setEditingProjectId(null); setProjectForm(emptyProject); }}>
                Reset
              </button>
            )}
          </div>
          <form className={formStyles.form} onSubmit={upsertProject}>
            <input name="title" value={projectForm.title} onChange={handleProjectChange} placeholder="Title" required />
            <textarea
              name="description"
              rows={4}
              value={projectForm.description}
              onChange={handleProjectChange}
              placeholder="Description"
              required
            />
            <input
              name="imageUrl"
              value={projectForm.imageUrl}
              onChange={handleProjectChange}
              placeholder="Image URL"
            />
            <input
              name="repoUrl"
              value={projectForm.repoUrl}
              onChange={handleProjectChange}
              placeholder="Repository URL"
            />
            <input
              name="liveUrl"
              value={projectForm.liveUrl}
              onChange={handleProjectChange}
              placeholder="Live URL"
            />
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : editingProjectId ? 'Update Project' : 'Create Project'}
            </button>
          </form>
          <ul className={styles.list}>
            {projects.map((project) => (
              <li key={project._id}>
                <div>
                  <strong>{project.title}</strong>
                  <p>{project.description.slice(0, 120)}...</p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProjectId(project._id);
                      setProjectForm({
                        title: project.title,
                        description: project.description,
                        imageUrl: project.imageUrl || '',
                        repoUrl: project.repoUrl || '',
                        liveUrl: project.liveUrl || '',
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" onClick={() => removeProject(project._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className={styles.sectionHeading}>
            <h3>{editingPostId ? 'Edit Blog Post' : 'Create Blog Post'}</h3>
            {editingPostId && (
              <button type="button" onClick={() => { setEditingPostId(null); setPostForm(emptyPost); }}>
                Reset
              </button>
            )}
          </div>
          <form className={formStyles.form} onSubmit={upsertPost}>
            <input name="title" value={postForm.title} onChange={handlePostChange} placeholder="Title" required />
            <textarea
              name="content"
              rows={6}
              value={postForm.content}
              onChange={handlePostChange}
              placeholder="Content"
              required
            />
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : editingPostId ? 'Update Post' : 'Create Post'}
            </button>
          </form>
          <ul className={styles.list}>
            {posts.map((post) => (
              <li key={post._id}>
                <div>
                  <strong>{post.title}</strong>
                  <p>{post.content.slice(0, 120)}...</p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPostId(post._id);
                      setPostForm({ title: post.title, content: post.content });
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" onClick={() => removePost(post._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Admin;
