import Sidebar from '../components/Sidebar';

// ⚠️ MOCK DATA — الإشعارات دي هتيجي من الـ API لما يتعمل الباك اند
// (وممكن كمان تتحدث لايف عن طريق WebSocket بدل ما تكون قايمة ثابتة)
const NOTIFICATIONS = [
  {
    id: 1,
    icon: '✅',
    title: 'تم إرسال طلبك بنجاح',
    desc: 'طلب #REQ-0892 اتبعت وهنبعتلك تحديث لما جامع المخلفات يقبله',
    time: 'من شوية',
    unread: true,
  },
  {
    id: 2,
    icon: '🚚',
    title: 'جامع المخلفات في الطريق',
    desc: 'عمر خليل في الطريق لاستلام طلب #REQ-0890، وصول متوقع 15 دقيقة',
    time: 'من ساعتين',
    unread: true,
  },
  {
    id: 3,
    icon: '💰',
    title: 'اتضافلك نقاط',
    desc: 'اتضاف 340 نقطة لمحفظتك بعد استلام طلب #REQ-0891',
    time: 'إمبارح',
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <div className="screen">
      <div className="dash-layout">
        <Sidebar active="notifications" />
        <div className="dash-main">
          <div className="dash-header">
            <div className="dash-title">الإشعارات</div>
          </div>

          <div className="card" style={{ padding: '0', maxWidth: '600px' }}>
            {NOTIFICATIONS.map((n) => (
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
        </div>
      </div>
    </div>
  );
}