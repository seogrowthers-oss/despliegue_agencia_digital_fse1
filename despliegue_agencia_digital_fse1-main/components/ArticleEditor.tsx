import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import { useState } from 'react';
import { Upload, Bold, Italic, List, ListOrdered, Quote, Code, Heading2 } from 'lucide-react';

interface ArticleEditorProps {
  initialContent?: string;
  onChange: (html: string) => void;
}

export default function ArticleEditor({ initialContent = '', onChange }: ArticleEditorProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return <div>Cargando editor...</div>;
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setImagePreview(url);
      editor.chain().focus().setImage({ src: url }).run();
    };
    reader.readAsDataURL(file);
  };

  const toolbarButtons = [
    {
      label: 'H2',
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
    },
    {
      label: 'Bold',
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
    {
      label: 'Italic',
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
    },
    {
      label: 'Cita',
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    },
    {
      label: 'Código',
      icon: Code,
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
    },
    {
      label: 'Lista',
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      label: 'Lista Numerada',
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
  ];

  return (
    <div className="editor-wrapper">
      <style>{`
        .editor-toolbar {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          border: 1px solid var(--border-color, #e5e7eb);
          border-bottom: none;
          background: var(--bg-secondary, #f9fafb);
          flex-wrap: wrap;
          border-radius: 0.5rem 0.5rem 0 0;
        }

        .editor-toolbar button {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color, #d1d5db);
          border-radius: 0.375rem;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .editor-toolbar button:hover {
          background: var(--primary, #3b82f6);
          color: white;
          border-color: var(--primary, #3b82f6);
        }

        .editor-toolbar button.active {
          background: var(--primary, #3b82f6);
          color: white;
          border-color: var(--primary, #3b82f6);
        }

        .editor-content {
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0 0 0.5rem 0.5rem;
          padding: 1.5rem;
          min-height: 400px;
          background: white;
        }

        .editor-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .editor-content h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1.5rem 0 0.75rem 0;
        }

        .editor-content blockquote {
          border-left: 3px solid var(--primary, #3b82f6);
          padding-left: 1rem;
          margin-left: 0;
          color: #6b7280;
          font-style: italic;
        }

        .editor-content code {
          background: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.875rem;
        }

        .editor-content pre {
          background: #1f2937;
          color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .editor-content pre code {
          background: none;
          padding: 0;
          color: inherit;
        }

        .editor-content ul, .editor-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .editor-content li {
          margin-bottom: 0.5rem;
        }

        .editor-content img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          border-radius: 0.5rem;
        }

        .image-upload-btn {
          position: relative;
          overflow: hidden;
        }

        .image-upload-btn input {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .dark-mode .editor-content {
          background: var(--bg-black, #111827);
          color: var(--text-light, #f3f4f6);
          border-color: var(--border-dark, #374151);
        }

        .dark-mode .editor-content code {
          background: #374151;
        }

        .dark-mode .editor-toolbar {
          background: var(--bg-secondary, #1f2937);
          border-color: var(--border-dark, #374151);
        }

        .dark-mode .editor-toolbar button {
          background: var(--bg-black, #111827);
          border-color: var(--border-dark, #374151);
          color: var(--text-light, #f3f4f6);
        }
      `}</style>

      <div className="editor-toolbar">
        {toolbarButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className={btn.isActive ? 'active' : ''}
            title={btn.label}
          >
            <btn.icon size={18} />
          </button>
        ))}

        <label className="editor-toolbar button image-upload-btn">
          <Upload size={18} />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      <EditorContent editor={editor} className="editor-content" />

      {imagePreview && (
        <div style={{ marginTop: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Imagen cargada:</p>
          <img src={imagePreview} alt="preview" style={{ maxWidth: '200px', marginTop: '0.5rem', borderRadius: '0.5rem' }} />
        </div>
      )}
    </div>
  );
}
