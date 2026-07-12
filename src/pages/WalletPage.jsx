import { useNavigate } from 'react-router-dom';

// ⚠️ MOCK DATA — البيانات دي كلها وهمية دلوقتي.
// لما نعمل الباك اند، الرصيد وتاريخ العمليات دول هيجيوا من الـ API
// (مثلاً GET /api/wallet) بدل ما يكونوا مثبتين هنا في الكود.
const WALLET_DATA = {
  balance: 4820,
  cashValue: 241.0,
  earnedThisMonth: 2340,
  redeemed: 450,
  expiringSoon: 1200,
};

const TRANSACTIONS = [
  { date: '22 يونيو', desc: 'استلام #REQ-0891 اتم بنجاح', type: 'earned', points: '+340' },
  { date: '20 يونيو', desc: 'استبدال بقسيمة كارفور', type: 'redeemed', points: '−500' },
  { date: '15 يونيو', desc: 'استلام #REQ-0889 اتم بنجاح', type: 'earned', points: '+210' },
  { date: '10 يونيو', desc: 'مكافأة دعوة صديق — نور أحمد', type: 'bonus', points: '+100' },
];

const TYPE_BADGE = {
  earned: { text: 'مكتسبة', className: 'badge-green' },
  redeemed: { text: 'مستبدلة', className: 'badge-blue' },
  bonus: { text: 'مكافأة', className: 'badge-purple' },
};

export default function WalletPage() {
  const navigate = useNavigate();

  // الأزرار دي مؤقتاً بترجع تنبيه بسيط لحد ما يتعمل الباك اند
  // ويبقى فيه فعلياً نظام استبدال/سحب/تبرع حقيقي
  const handleAction = (action) => {
    alert(`ميزة "${action}" هتشتغل فعلياً لما نربط الباك اند`);
  };

  return (
    <div className="screen">
      <div className="dash-layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--n200)', marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--n800)' }}>سارة أحمد</div>
            <div style={{ fontSize: '11px', color: 'var(--n400)' }}>مستخدم عادي</div>
          </div>
          <div className="sidebar-item" onClick={() => navigate('/dashboard')}>
            <span className="si-icon">📊</span>لوحة التحكم
          </div>
          <div className="sidebar-item" onClick={() => navigate('/request')}>
            <span className="si-icon">➕</span>طلب جديد
          </div>
          <div className="sidebar-item" onClick={() => navigate('/my-requests')}>
            <span className="si-icon">📍</span>طلباتي
          </div>
          <div className="sidebar-item active">
            <span className="si-icon">💰</span>المحفظة
          </div>
        </div>

        {/* MAIN */}
        <div className="dash-main">
          <div className="dash-header">
            <div className="dash-title">المحفظة والمكافآت</div>
          </div>

          <div className="reward-card">
            <div style={{ fontSize: '12px', opacity: '.8', marginBottom: '4px' }}>إجمالي رصيد GreenPoints</div>
            <div className="reward-pts">{WALLET_DATA.balance.toLocaleString('ar-EG')}</div>
            <div className="reward-label">≈ {WALLET_DATA.cashValue.toFixed(2)} جنيه قيمة نقدية</div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => handleAction('استبدال')}>
                💳 استبدال
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => handleAction('سحب')}>
                🏦 سحب
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => handleAction('تبرع')}>
                💚 تبرع
              </button>
            </div>
          </div>

          <div className="grid-3" style={{ gap: '14px', marginBottom: '16px' }}>
            <div className="card-sm" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--g700)' }}>
                {WALLET_DATA.earnedThisMonth.toLocaleString('ar-EG')}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--n500)' }}>مكتسب (الشهر ده)</div>
            </div>
            <div className="card-sm" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--b600)' }}>
                {WALLET_DATA.redeemed.toLocaleString('ar-EG')}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--n500)' }}>مستبدل</div>
            </div>
            <div className="card-sm" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--a600)' }}>
                {WALLET_DATA.expiringSoon.toLocaleString('ar-EG')}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--n500)' }}>هتنتهي قريب</div>
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '14px' }}>سجل العمليات</div>
            <table>
              <thead>
                <tr>
                  <th>التاريخ</th>
                  <th>الوصف</th>
                  <th>النوع</th>
                  <th>النقاط</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx, i) => (
                  <tr key={i}>
                    <td>{tx.date}</td>
                    <td>{tx.desc}</td>
                    <td>
                      <span className={`badge ${TYPE_BADGE[tx.type].className}`}>
                        {TYPE_BADGE[tx.type].text}
                      </span>
                    </td>
                    <td
                      style={{
                        fontWeight: '700',
                        color: tx.points.startsWith('+') ? 'var(--g600)' : 'var(--r500)',
                      }}
                    >
                      {tx.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}