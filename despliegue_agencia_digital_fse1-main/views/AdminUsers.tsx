import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/services/firebase';
import { makeAdmin, removeAdmin, getAdmins } from '@/services/adminService';
import { Shield, ShieldOff } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Member' | 'Premium' | 'Admin';
  createdAt?: string;
}

export default function AdminUsers() {
  const navigate = useNavigate();
  const { userData } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.role !== 'Admin') {
      navigate('/');
      return;
    }
    loadUsers();
  }, [userData, navigate]);

  async function loadUsers() {
    try {
      setLoading(true);
      setError('');

      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData: User[] = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as User));

      const adminIds = await getAdmins();
      setAdmins(adminIds);
      setUsers(usersData.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
      handleFirestoreError(err, OperationType.LIST, 'users');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleAdmin(userId: string, isAdmin: boolean) {
    try {
      setUpdating(userId);
      if (isAdmin) {
        await removeAdmin(userId);
        setAdmins(admins.filter((id) => id !== userId));
        setUsers(
          users.map((u) =>
            u.id === userId ? { ...u, role: 'Member' } : u
          )
        );
      } else {
        await makeAdmin(userId);
        setAdmins([...admins, userId]);
        setUsers(
          users.map((u) =>
            u.id === userId ? { ...u, role: 'Admin' } : u
          )
        );
      }
    } catch (err) {
      setError(`Error al ${isAdmin ? 'remover' : 'asignar'} administrador`);
      console.error(err);
    } finally {
      setUpdating(null);
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

        .btn-secondary {
          background: var(--bg-secondary, #e5e7eb);
          color: var(--text-dark, #111827);
        }

        .btn-secondary:hover {
          opacity: 0.8;
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

        .users-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .users-table thead {
          background: var(--bg-secondary, #f9fafb);
          border-bottom: 2px solid var(--border-color, #e5e7eb);
        }

        .dark-mode .users-table thead {
          background: var(--bg-secondary, #1f2937);
          border-bottom-color: var(--border-dark, #374151);
        }

        .users-table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--text-dark, #111827);
        }

        .dark-mode .users-table th {
          color: var(--text-light, #f3f4f6);
        }

        .users-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color, #e5e7eb);
        }

        .dark-mode .users-table td {
          border-bottom-color: var(--border-dark, #374151);
        }

        .users-table tbody tr:hover {
          background: var(--bg-secondary, #f9fafb);
        }

        .dark-mode .users-table tbody tr:hover {
          background: var(--bg-secondary, #1f2937);
        }

        .user-name {
          font-weight: 600;
          color: var(--text-dark, #111827);
        }

        .dark-mode .user-name {
          color: var(--text-light, #f3f4f6);
        }

        .user-email {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .role-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .role-admin {
          background: #dbeafe;
          color: #1e40af;
        }

        .role-member {
          background: #f3f4f6;
          color: #374151;
        }

        .dark-mode .role-admin {
          background: #1e3a8a;
          color: #93c5fd;
        }

        .dark-mode .role-member {
          background: #4b5563;
          color: #d1d5db;
        }

        .toggle-btn {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0.375rem;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .dark-mode .toggle-btn {
          background: var(--bg-secondary, #1f2937);
          color: var(--text-light, #f3f4f6);
        }

        .toggle-btn:hover:not(:disabled) {
          background: var(--primary, #3b82f6);
          color: white;
          border-color: var(--primary, #3b82f6);
        }

        .toggle-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .toggle-btn.remove {
          color: #dc2626;
        }

        .toggle-btn.remove:hover:not(:disabled) {
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
        <h1>Gestión de Usuarios</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/admin/articulos')}
        >
          ← Volver a Artículos
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Cargando usuarios...</div>
      ) : users.length === 0 ? (
        <div className="empty-state">
          <p>No hay usuarios registrados</p>
        </div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isAdmin = admins.includes(user.id);
              return (
                <tr key={user.id}>
                  <td>
                    <div className="user-name">{user.name}</div>
                  </td>
                  <td>
                    <div className="user-email">{user.email}</div>
                  </td>
                  <td>
                    <span className={`role-badge role-${isAdmin ? 'admin' : 'member'}`}>
                      {isAdmin ? 'Administrador' : 'Miembro'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`toggle-btn ${isAdmin ? 'remove' : ''}`}
                      onClick={() => handleToggleAdmin(user.id, isAdmin)}
                      disabled={updating === user.id}
                    >
                      {isAdmin ? (
                        <>
                          <ShieldOff size={16} />
                          Remover Admin
                        </>
                      ) : (
                        <>
                          <Shield size={16} />
                          Hacer Admin
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
