import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

const ITEMS = [
  { id: 'dashboard', icon: '📊', label: 'لوحة التحكم' },
  { id: 'inventory', icon: '📦', label: 'تصفح المخزون' },
  { id: 'orders', icon: '🧾', label: 'أوامر الشراء' },
];

export default function FactorySidebar({ active, onNavigate }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { mobileSidebarOpen, closeMobileSidebar } = useUI();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const goTo = (id) => {
    onNavigate(id);
    closeMobileSidebar();
  };

  const displayName = user ? `${user.firstName} ${user.lastName}`.trim() : 'مصنع';
  const initials = user ? user.firstName.charAt(0) + (user.lastName.charAt(0) || '') : '؟';

  return (
    <>
      {mobileSidebarOpen && <div className="sidebar-backdrop open" onClick={closeMobileSidebar} />}
      <div
        className={`sidebar${mobileSidebarOpen ? ' mobile-open' : ''}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: collapsed ? '68px' : '220px',
          minWidth: collapsed ? '68px' : '220px',
          transition: 'width .18s ease, min-width .18s ease',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: collapsed ? 'center' : 'flex-end',
            padding: '8px 10px',
            borderBottom: '1px solid var(--n200)',
          }}
        >
          <button
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? 'فتح السايدبار' : 'قفل السايدبار'}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'var(--n50)',
              border: '1px solid var(--n200)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '700',
              color: 'var(--n600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {collapsed ? '☰' : '⟨⟨'}
          </button>
        </div>

        <div style={{ padding: '16px', borderBottom: '1px solid var(--n200)', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'nowrap', minWidth: 0 }}>
            <div
              className="avatar"
              style={{ width: '36px', height: '36px', background: '#fef3c7', color: '#92400e', fontSize: '13px', flexShrink: 0 }}
            >
              {initials}
            </div>
            {!collapsed && (
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{ fontSize: '13px', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  title={displayName}
                >
                  {displayName}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--n400)' }}>🏭 مصنع</div>
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-section">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className={`sidebar-item${active === item.id ? ' active' : ''}`}
              onClick={() => goTo(item.id)}
              title={collapsed ? item.label : ''}
              style={{ justifyContent: collapsed ? 'center' : 'flex-start', whiteSpace: 'nowrap' }}
            >
              <span className="si-icon">{item.icon}</span>
              {!collapsed && item.label}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', padding: '12px 16px', borderTop: '1px solid var(--n200)' }}>
          <div
            className="sidebar-item"
            onClick={handleLogout}
            title={collapsed ? 'تسجيل خروج' : ''}
            style={{ color: 'var(--r500)', justifyContent: collapsed ? 'center' : 'flex-start', whiteSpace: 'nowrap' }}
          >
            <span className="si-icon">🚪</span>
            {!collapsed && 'تسجيل خروج'}
          </div>
        </div>
      </div>
    </>
  );
}