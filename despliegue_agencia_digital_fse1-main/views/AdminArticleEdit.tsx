import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ArticleEditor from '@/components/ArticleEditor';
import {
  createArticle,
  updateArticle,
  getArticleById,
  generateSlug,
  checkSlugExists,
  ArticleSection,
} from '@/services/articleService';
import { Timestamp } from 'firebase/firestore';
import { ArrowLeft, Save, Eye } from 'lucide-react';

const SECTIONS: { value: ArticleSection; label: string }[] = [
  { value: 'noticias', label: 'Noticias' },
  { value: 'recursos', label: 'Recursos' },
  { value: 'academia', label: 'Academia' },
  { value: 'analisis', label: 'Análisis' },
];

export default function AdminArticleEdit() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user, userData } = useAuth();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [section, setSection] = useState<ArticleSection>('noticias');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [slugError, setSlugError] = useState('');
  const [isLoadingArticle, setIsLoadingArticle] = useState(!!id);

  // Verificar que sea admin
  useEffect(() => {
    if (user && userData?.role !== 'admin') {
      navigate('/');
    }
  }, [user, userData, navigate]);

  // Cargar artículo si es edición
  useEffect(() => {
    if (id) {
      loadArticle(id);
    }
  }, [id]);

  async function loadArticle(articleId: string) {
    try {
      setIsLoadingArticle(true);
      const article = await getArticleById(articleId);

      if (!article) {
        setError('Artículo no encontrado');
        return;
      }

      setTitle(article.title);
      setSlug(article.slug);
      setDescription(article.description);
      setContent(article.content);
      setSection(article.section);
      setCategory(article.category || '');
      setImageUrl(article.imageUrl || '');
      setPublished(article.published);
    } catch (err) {
      setError('Error al cargar el artículo');
      console.error(err);
    } finally {
      setIsLoadingArticle(false);
    }
  }

  async function handleAutoSlug() {
    const newSlug = generateSlug(title);
    setSlug(newSlug);
    await validateSlug(newSlug);
  }

  async function validateSlug(slugToCheck: string) {
    try {
      const exists = await checkSlugExists(slugToCheck, id);
      if (exists) {
        setSlugError('Este slug ya existe');
      } else {
        setSlugError('');
      }
    } catch (err) {
      console.error('Error validando slug', err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !slug.trim() || !content.trim()) {
      setError('Título, slug y contenido son requeridos');
      return;
    }

    if (slugError) {
      setError('Corrige el error del slug antes de continuar');
      return;
    }

    if (!user) {
      setError('Usuario no autenticado');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (id) {
        // Editar artículo existente
        await updateArticle(id, {
          title,
          slug,
          description,
          content,
          section,
          category,
          imageUrl,
          published,
        });
      } else {
        // Crear nuevo artículo
        await createArticle(
          {
            title,
            slug,
            description,
            content,
            section,
            category,
            imageUrl,
            published,
            author: user.uid,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          },
          user.uid
        );
      }

      navigate('/admin/articulos');
    } catch (err) {
      setError('Error al guardar el artículo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (isLoadingArticle) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando artículo...</div>;
  }

  if (userData?.role !== 'admin') {
    return null;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{`
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--text-dark, #111827);
        }

        .dark-mode .form-group label {
          color: var(--text-light, #f3f4f6);
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0.375rem;
          font-size: 1rem;
          font-family: inherit;
          background: white;
          color: #111827;
        }

        .dark-mode .form-group input,
        .dark-mode .form-group textarea,
        .dark-mode .form-group select {
          background: var(--bg-black, #1f2937);
          color: var(--text-light, #f3f4f6);
          border-color: var(--border-dark, #374151);
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--primary, #3b82f6);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        .slug-error {
          color: #dc2626;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .checkbox-group input {
          width: auto;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
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

        .btn-secondary {
          background: #e5e7eb;
          color: #111827;
        }

        .btn-secondary:hover {
          background: #d1d5db;
        }

        .dark-mode .btn-secondary {
          background: var(--border-dark, #374151);
          color: var(--text-light, #f3f4f6);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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

        .header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .header h1 {
          margin: 0;
          font-size: 2rem;
        }
      `}</style>

      <div className="header">
        <button className="btn btn-secondary" onClick={() => navigate('/admin/articulos')}>
          <ArrowLeft size={20} />
          Volver
        </button>
        <h1>{id ? 'Editar Artículo' : 'Crear Artículo'}</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título del artículo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="section">Sección *</label>
            <select value={section} onChange={(e) => setSection(e.target.value as ArticleSection)} required>
              {SECTIONS.map((sec) => (
                <option key={sec.value} value={sec.value}>
                  {sec.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="slug">
              Slug *
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAutoSlug}
                style={{ marginLeft: '1rem', padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
              >
                Auto-generar
              </button>
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                validateSlug(e.target.value);
              }}
              placeholder="article-slug"
              required
            />
            {slugError && <div className="slug-error">{slugError}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="ej: Inteligencia Artificial"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción (SEO) *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Breve descripción para SEO (160 caracteres recomendado)"
            rows={3}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">URL de Imagen Principal</label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div className="form-group">
          <label>Contenido *</label>
          <ArticleEditor initialContent={content} onChange={setContent} />
        </div>

        <div className="form-group checkbox-group">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published" style={{ margin: 0 }}>
            Publicado
          </label>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary" disabled={loading || !!slugError}>
            <Save size={20} />
            {loading ? 'Guardando...' : 'Guardar Artículo'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/articulos')}
            disabled={loading}
          >
            <ArrowLeft size={20} />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
