import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getArticlesBySection, deleteArticle, Article, ArticleSection } from '@/services/articleService';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

const SECTIONS: { value: ArticleSection; label: string }[] = [
  { value: 'noticias', label: 'Noticias' },
  { value: 'recursos', label: 'Recursos' },
  { value: 'academia', label: 'Academia' },
  { value: 'analisis', label: 'Análisis' },
];

export default function AdminArticles() {
  const navigate = useNavigate();
  const { userData } = useAuth();

  const [selectedSection, setSelectedSection] = useState<ArticleSection>('noticias');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.role !== 'Admin') {
      navigate('/');
      return;
    }
    loadArticles();
  }, [userData, navigate, selectedSection]);

  async function loadArticles() {
    try {
      setLoading(true);
      setError('');
      const data = await getArticlesBySection(selectedSection);
      setArticles(data);
    } catch (err) {
      setError('Error al cargar artículos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteArticle(id);
      setArticles(articles.filter((a) => a.id !== id));
    } catch (err) {
      setError('Error al eliminar artículo');
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  }

  if (userData?.role !== 'Admin') {
    return null;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <style>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header h1 {
          margin: 0;
          font-size: 2rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.375rem;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
          font-weight: 500;
        }

        .btn-primary {
          background: var(--primary, #3b82f6);
          color: white;
        }

        .btn-primary:hover {
          opacity: 0.9;
        }

        .section-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          border-bottom: 2px solid var(--border-color, #e5e7eb);
        }

        .tab {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: #6b7280;
          border-bottom: 3px solid transparent;
          transition: all 0.2s;
          margin-bottom: -2px;
        }

        .tab.active {
          color: var(--primary, #3b82f6);
          border-bottom-color: var(--primary, #3b82f6);
        }

        .tab:hover {
          color: var(--primary, #3b82f6);
        }

        .error-message {
          background: #fee2e2;
          color: #dc2626;
          padding: 1rem;
          border-radius: 0.375rem;
          margin-bottom: 1.5rem;
        }

        .dark-mode .error-message {
          background: #7f1d1d;
          color: #fca5a5;
        }

        .articles-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .articles-table thead {
          background: var(--bg-secondary, #f9fafb);
          border-bottom: 2px solid var(--border-color, #e5e7eb);
        }

        .dark-mode .articles-table thead {
          background: var(--bg-secondary, #1f2937);
          border-bottom-color: var(--border-dark, #374151);
        }

        .articles-table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--text-dark, #111827);
        }

        .dark-mode .articles-table th {
          color: var(--text-light, #f3f4f6);
        }

        .articles-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color, #e5e7eb);
        }

        .dark-mode .articles-table td {
          border-bottom-color: var(--border-dark, #374151);
        }

        .articles-table tbody tr:hover {
          background: var(--bg-secondary, #f9fafb);
        }

        .dark-mode .articles-table tbody tr:hover {
          background: var(--bg-secondary, #1f2937);
        }

        .article-title {
          font-weight: 600;
          color: var(--text-dark, #111827);
        }

        .dark-mode .article-title {
          color: var(--text-light, #f3f4f6);
        }

        .article-slug {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-published {
          background: #d1fae5;
          color: #065f46;
        }

        .status-draft {
          background: #fef3c7;
          color: #92400e;
        }

        .dark-mode .status-published {
          background: #064e3b;
          color: #a7f3d0;
        }

        .dark-mode .status-draft {
          background: #78350f;
          color: #fcd34d;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.5rem;
          background: none;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover {
          background: var(--primary, #3b82f6);
          color: white;
          border-color: var(--primary, #3b82f6);
        }

        .action-btn.delete {
          color: #dc2626;
        }

        .action-btn.delete:hover {
          background: #dc2626;
          border-color: #dc2626;
          color: white;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #6b7280;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #6b7280;
        }
      `}</style>

      <div className="header">
        <h1>Gestión de Artículos</h1>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={() => navigate('/admin/usuarios')} style={{ background: '#6b7280' }}>
            Usuarios
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/admin/articulos/nuevo')}>
            <Plus size={20} />
            Nuevo Artículo
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="section-tabs">
        {SECTIONS.map((sec) => (
          <button
            key={sec.value}
            className={`tab ${selectedSection === sec.value ? 'active' : ''}`}
            onClick={() => setSelectedSection(sec.value)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Cargando artículos...</div>
      ) : articles.length === 0 ? (
        <div className="empty-state">
          <p>No hay artículos en esta sección</p>
          <button className="btn btn-primary" onClick={() => navigate('/admin/articulos/nuevo')} style={{ margin: '1rem auto 0' }}>
            <Plus size={20} />
            Crear Primero
          </button>
        </div>
      ) : (
        <table className="articles-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Estado</th>
              <th>Categoría</th>
              <th>Publicado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>
                  <div className="article-title">{article.title}</div>
                  <div className="article-slug">/{article.slug}</div>
                </td>
                <td>
                  <span className={`status-badge ${article.published ? 'status-published' : 'status-draft'}`}>
                    {article.published ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td>{article.category || '-'}</td>
                <td>
                  {article.publishedAt
                    ? new Date(article.publishedAt.toDate()).toLocaleDateString('es-ES')
                    : '-'}
                </td>
                <td>
                  <div className="actions">
                    <button
                      className="action-btn"
                      onClick={() => navigate(`/admin/articulos/${article.id}`)}
                      title="Editar"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => article.id && handleDelete(article.id)}
                      disabled={deletingId === article.id}
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
