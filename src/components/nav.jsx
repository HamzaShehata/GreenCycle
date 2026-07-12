import { useNavigate, useLocation } from 'react-router-dom';

const TABS = [
  { id: '', label: '🌍 الرئيسية' },
  { id: 'about', label: 'مين إحنا' },
  { id: 'pricing', label: 'الأسعار' },
  { id: 'login', label: 'تسجيل الدخول' },
];

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname.replace('/', '');

  return (
    <nav id="nav">
      <div id="logo">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#22c55e" opacity=".15" />
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 8V5M16.24 9.76l2.12-2.12M12 16v3M7.76 14.24l-2.12 2.12" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        GreenCycle
      </div>
      <div className="nav-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab${current === tab.id ? ' active' : ''}`}
            onClick={() => navigate(`/${tab.id}`)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}