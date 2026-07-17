import Sidebar from '../components/Sidebar';
import { useRequests } from '../context/RequestsContext';

export default function NotificationsPage() {
  const { notifications, markAllNotificationsRead } = useRequests();

  return (
    <div className="screen">
      <div className="dash-layout">
        <Sidebar active="notifications" />
        <div className="dash-main">
          <div className="dash-header">
            <div className="dash-title">الإشعارات</div>
            {notifications.some((n) => n.unread) && (
              <button className="btn btn-outline btn-sm" onClick={markAllNotificationsRead}>
                تعليم الكل كمقروء
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔕</div>
              <p style={{ color: 'var(--n500)' }}>مفيش إشعارات لسه</p>
            </div>
          ) : (
            <div className="card" style={{ padding: '0', maxWidth: '600px' }}>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--n100)',
                    background: n.unread ? 'var(--g50)' : 'transparent',
                  }}
                >
                  <div style={{ fontSize: '22px' }}>{n.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--n800)' }}>{n.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--n500)', marginTop: '2px' }}>{n.desc}</div>
                    <div style={{ fontSize: '11px', color: 'var(--n400)', marginTop: '6px' }}>{n.time}</div>
                  </div>
                  {n.unread && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--g500)', flexShrink: 0, marginTop: '4px' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}