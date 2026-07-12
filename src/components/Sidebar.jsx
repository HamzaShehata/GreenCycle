import { useNavigate } from 'react-router-dom';

const MAIN_ITEMS = [
  { id: 'dashboard', path: '/dashboard', icon: '📊', label: 'لوحة التحكم' },
  { id: 'request', path: '/request', icon: '➕', label: 'طلب جديد' },
  { id: 'my-requests', path: '/my-requests', icon: '📍', label: 'طلباتي' },
  { id: 'wallet', path: '/wallet', icon: '💰', label: 'المحفظة' },
];

const ACCOUNT_ITEMS = [
  { id: 'profile', path: '/profile', icon: '👤', label: 'الملف الشخصي' },
  { id: 'notifications', path: '/notifications', icon: '🔔', label: 'الإشعارات' },
  { id: 'settings', path: '/settings', icon: '⚙️', label: 'الإعدادات' },
];

export default function Sidebar({ active }) {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--n200)', marginBottom: '12px' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--n800)' }}>سارة أحمد</div>
        <div style={{ fontSize: '11px', color: 'var(--n400)' }}>مستخدم عادي</div>
      </div>

      <div className="sidebar-section">
        {MAIN_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item${active === item.id ? ' active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="si-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">الحساب</div>
        {ACCOUNT_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item${active === item.id ? ' active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="si-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}