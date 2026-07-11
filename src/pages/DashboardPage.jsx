import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="screen">
      <div className="dash-layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div style={{ padding: '16px', borderBottom: '1px solid var(--n200)', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="avatar" style={{ width: '36px', height: '36px', background: 'var(--g100)', color: 'var(--g700)', fontSize: '13px' }}>
                سأ
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--n800)' }}>سارة أحمد</div>
                <div style={{ fontSize: '11px', color: 'var(--n400)' }}>مستخدم عادي</div>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-label">الرئيسية</div>
            <div className="sidebar-item active">
              <span className="si-icon">📊</span>لوحة التحكم
            </div>
            <div className="sidebar-item" onClick={() => navigate('/request')}>
              <span className="si-icon">➕</span>طلب جديد<span className="sidebar-badge">جديد</span>
            </div>
            <div className="sidebar-item">
              <span className="si-icon">📍</span>طلباتي
            </div>
            <div className="sidebar-item">
              <span className="si-icon">💰</span>المحفظة
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-label">الحساب</div>
            <div className="sidebar-item">
              <span className="si-icon">👤</span>الملف الشخصي
            </div>
            <div className="sidebar-item">
              <span className="si-icon">🔔</span>الإشعارات<span className="sidebar-badge">3</span>
            </div>
            <div className="sidebar-item">
              <span className="si-icon">⚙️</span>الإعدادات
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="dash-main">
          <div className="dash-header">
            <div>
              <div className="dash-title">صباح الخير، سارة 👋</div>
              <div className="dash-sub">ده ملخص نشاط التدوير بتاعك</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/request')}>+ طلب جديد</button>
          </div>

          {/* KPIs */}
          <div className="kpi-grid">
            <div className="kpi-card green">
              <div className="kpi-label">إجمالي المُدور</div>
              <div className="kpi-value">
                284<span style={{ fontSize: '16px', color: 'var(--n500)', fontWeight: '500' }}> كجم</span>
              </div>
              <div className="kpi-change up">↑ +12% الشهر ده</div>
            </div>
            <div className="kpi-card blue">
              <div className="kpi-label">نقاط GreenPoints</div>
              <div className="kpi-value">4,820</div>
              <div className="kpi-change up">↑ +340 الأسبوع ده</div>
            </div>
            <div className="kpi-card amber">
              <div className="kpi-label">إجمالي الطلبات</div>
              <div className="kpi-value">31</div>
              <div className="kpi-change up">↑ 3 تحت التنفيذ</div>
            </div>
            <div className="kpi-card purple">
              <div className="kpi-label">CO₂ اتوفر</div>
              <div className="kpi-value">
                142<span style={{ fontSize: '16px', color: 'var(--n500)', fontWeight: '500' }}> كجم</span>
              </div>
              <div className="kpi-change up">↑ تأثير رائع!</div>
            </div>
          </div>

          {/* CHART + BREAKDOWN */}
          <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--n800)' }}>نشاط التدوير الشهري</div>
                <span className="badge badge-green">↑ 12%</span>
              </div>
              <div className="chart-bars">
                <div className="bar-col"><div className="bar" style={{ height: '40%' }}></div><div className="bar-label">يناير</div></div>
                <div className="bar-col"><div className="bar" style={{ height: '55%' }}></div><div className="bar-label">فبراير</div></div>
                <div className="bar-col"><div className="bar" style={{ height: '45%' }}></div><div className="bar-label">مارس</div></div>
                <div className="bar-col"><div className="bar" style={{ height: '70%' }}></div><div className="bar-label">أبريل</div></div>
                <div className="bar-col"><div className="bar" style={{ height: '60%' }}></div><div className="bar-label">مايو</div></div>
                <div className="bar-col"><div className="bar" style={{ height: '85%', background: 'var(--e500)' }}></div><div className="bar-label">يونيو</div></div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--n200)' }}>
                <div style={{ fontSize: '12px', color: 'var(--n500)' }}>
                  <span style={{ color: 'var(--n800)', fontWeight: '700' }}>48 كجم</span> الشهر ده
                </div>
                <div style={{ fontSize: '12px', color: 'var(--n500)' }}>
                  <span style={{ color: 'var(--n800)', fontWeight: '700' }}>6</span> رحلات تجميع
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--n800)', marginBottom: '16px' }}>
                توزيع المواد
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--n600)' }}>♻️ بلاستيك</span>
                    <span style={{ fontWeight: '600' }}>38%</span>
                  </div>
                  <div className="progress"><div className="progress-fill" style={{ width: '38%' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--n600)' }}>📄 ورق</span>
                    <span style={{ fontWeight: '600' }}>27%</span>
                  </div>
                  <div className="progress"><div className="progress-fill" style={{ width: '27%', background: 'linear-gradient(90deg,var(--b400),var(--b600))' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--n600)' }}>🔩 معدن</span>
                    <span style={{ fontWeight: '600' }}>22%</span>
                  </div>
                  <div className="progress"><div className="progress-fill" style={{ width: '22%', background: 'linear-gradient(90deg,var(--a500),var(--a600))' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--n600)' }}>🔮 زجاج</span>
                    <span style={{ fontWeight: '600' }}>13%</span>
                  </div>
                  <div className="progress"><div className="progress-fill" style={{ width: '13%', background: 'linear-gradient(90deg,#8b5cf6,#7c3aed)' }}></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT REQUESTS */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--n800)' }}>آخر الطلبات</div>
              <button className="btn btn-outline btn-sm">شوف الكل</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>الرقم</th>
                  <th>المواد</th>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                  <th>النقاط</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: '600' }}>#REQ-0891</td>
                  <td><span className="tag">بلاستيك</span> <span className="tag">ورق</span></td>
                  <td>22 يونيو 2025</td>
                  <td><span className="badge badge-green">✓ مكتمل</span></td>
                  <td style={{ fontWeight: '700', color: 'var(--g600)' }}>+340 نقطة</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '600' }}>#REQ-0890</td>
                  <td><span className="tag">معدن</span></td>
                  <td>19 يونيو 2025</td>
                  <td><span className="badge badge-blue">🚚 في الطريق</span></td>
                  <td style={{ color: 'var(--n400)' }}>قيد الانتظار</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '600' }}>#REQ-0889</td>
                  <td><span className="tag">ورق</span> <span className="tag">زجاج</span></td>
                  <td>15 يونيو 2025</td>
                  <td><span className="badge badge-green">✓ مكتمل</span></td>
                  <td style={{ fontWeight: '700', color: 'var(--g600)' }}>+210 نقطة</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '600' }}>#REQ-0888</td>
                  <td><span className="tag">بلاستيك</span></td>
                  <td>10 يونيو 2025</td>
                  <td><span className="badge badge-amber">⏳ مجدول</span></td>
                  <td style={{ color: 'var(--n400)' }}>قيد الانتظار</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}