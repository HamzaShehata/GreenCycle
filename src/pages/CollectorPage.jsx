import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ⚠️ MOCK DATA — الطلبات المسندة دي هتيجي من الـ API لما يتعمل الباك اند
// (GET /api/collector/assigned-requests) بدل ما تكون قايمة ثابتة هنا
const ASSIGNED_REQUESTS = [
  {
    id: '#REQ-0890',
    materials: 'معدن',
    location: 'شارع الممشى',
    estWeight: '8 كجم',
    status: 'in_transit',
    dotColor: 'var(--g500)',
  },
  {
    id: '#REQ-0892',
    materials: 'بلاستيك + ورق',
    location: 'شارع الشيراتون',
    estWeight: '15 كجم',
    status: 'upcoming',
    dotColor: 'var(--a500)',
  },
  {
    id: '#REQ-0895',
    materials: 'إلكترونيات',
    location: 'المنطقة السياحية',
    estWeight: '5 كجم',
    status: 'pending',
    dotColor: 'var(--n300)',
  },
];

const STATUS_BADGE = {
  in_transit: { text: 'في الطريق', className: 'badge-blue' },
  upcoming: { text: 'قادم', className: 'badge-amber' },
  pending: { text: 'قيد الانتظار', className: 'badge-gray' },
};

export default function CollectorPage() {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState(ASSIGNED_REQUESTS[0]);
  const [actualWeight, setActualWeight] = useState('');
  const [qualityGrade, setQualityGrade] = useState('A — ممتاز');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleVerify = () => {
    const newErrors = {};
    if (!actualWeight || Number(actualWeight) <= 0) {
      newErrors.weight = 'اكتب الوزن الفعلي بعد الوزن';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setActualWeight('');
      }, 2500);
    }
  };

  return (
    <div className="screen">
      <div className="dash-layout">
        <div className="sidebar">
          <div style={{ padding: '16px', borderBottom: '1px solid var(--n200)', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="avatar" style={{ width: '36px', height: '36px', background: 'var(--b100)', color: 'var(--b600)', fontSize: '13px' }}>
                ح ش
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700' }}>حمزة شحاتة</div>
                <div style={{ fontSize: '11px', color: 'var(--n400)' }}>🚚 جامع مخلفات</div>
              </div>
            </div>
          </div>
          <div className="sidebar-item active" onClick={() => navigate('/collector')}>
            <span className="si-icon">📊</span>لوحة التحكم
          </div>
          <div className="sidebar-item">
            <span className="si-icon">📋</span>الطلبات المسندة<span className="sidebar-badge">{ASSIGNED_REQUESTS.length}</span>
          </div>
          <div className="sidebar-item">
            <span className="si-icon">✅</span>المكتمل النهاردة
          </div>
          <div className="sidebar-item">
            <span className="si-icon">📍</span>مخطط الرحلات
          </div>
          <div className="sidebar-item">
            <span className="si-icon">⚖️</span>توثيق الوزن
          </div>
        </div>

        <div className="dash-main">
          <div className="dash-header">
            <div>
              <div className="dash-title">لوحة تحكم جامع المخلفات</div>
              <div className="dash-sub">النهاردة: الأحد، 12 يوليو 2026</div>
            </div>
            <span className="badge badge-green">🟢 في الخدمة</span>
          </div>

          <div className="kpi-grid">
            <div className="kpi-card green">
              <div className="kpi-label">استلامات النهاردة</div>
              <div className="kpi-value">4 / 7</div>
              <div className="kpi-change up">↑ اتعمل 57%</div>
            </div>
            <div className="kpi-card blue">
              <div className="kpi-label">الوزن المُجمّع</div>
              <div className="kpi-value">
                186<span style={{ fontSize: '16px', color: 'var(--n500)' }}> كجم</span>
              </div>
              <div className="kpi-change up">↑ النهاردة</div>
            </div>
            <div className="kpi-card amber">
              <div className="kpi-label">التقييم</div>
              <div className="kpi-value">4.9 ⭐</div>
              <div className="kpi-change up">142 تقييم</div>
            </div>
            <div className="kpi-card purple">
              <div className="kpi-label">الأرباح</div>
              <div className="kpi-value">340 جنيه</div>
              <div className="kpi-change up">↑ الأسبوع ده</div>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '16px' }}>
            <div className="card">
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '14px' }}>الطلبات المسندة</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {ASSIGNED_REQUESTS.map((req) => (
                  <div
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    style={{
                      border: selectedRequest.id === req.id ? '2px solid var(--g500)' : '1px solid var(--n200)',
                      borderRadius: 'var(--r-lg)',
                      padding: '14px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                      cursor: 'pointer',
                      background: selectedRequest.id === req.id ? 'var(--g50)' : 'transparent',
                    }}
                  >
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: req.dotColor, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '700' }}>
                        {req.id} · {req.materials}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--n400)' }}>
                        📍 {req.location} · {req.estWeight} تقريباً
                      </div>
                    </div>
                    <span className={`badge ${STATUS_BADGE[req.status].className}`}>
                      {STATUS_BADGE[req.status].text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card">
                <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>فورم توثيق الوزن</div>

                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--g600)' }}>
                      تم توثيق الوزن بنجاح
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label>رقم الطلب</label>
                      <input type="text" value={selectedRequest.id} readOnly style={{ background: 'var(--n50)' }} />
                    </div>
                    <div className="form-group">
                      <label>نوع المادة</label>
                      <input type="text" value={selectedRequest.materials} readOnly style={{ background: 'var(--n50)' }} />
                    </div>
                    <div className="form-group">
                      <label>الوزن الفعلي (كجم)</label>
                      <input
                        type="number"
                        placeholder="اكتب الوزن بعد الوزن الحقيقي"
                        value={actualWeight}
                        onChange={(e) => setActualWeight(e.target.value)}
                        style={errors.weight ? { borderColor: 'var(--r500)' } : {}}
                      />
                      {errors.weight && (
                        <p style={{ color: 'var(--r500)', fontSize: '12px', marginTop: '4px' }}>{errors.weight}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label>درجة الجودة</label>
                      <select value={qualityGrade} onChange={(e) => setQualityGrade(e.target.value)}>
                        <option>A — ممتاز</option>
                        <option>B — جيد</option>
                        <option>C — مخلوط</option>
                        <option>D — ملوّث</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>صورة إثبات</label>
                      <div
                        style={{
                          border: '2px dashed var(--n200)',
                          borderRadius: 'var(--r-lg)',
                          padding: '20px',
                          textAlign: 'center',
                          fontSize: '13px',
                          color: 'var(--n400)',
                        }}
                      >
                        📷 ارفع صورة للمخلفات اللي اتجمعت
                      </div>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleVerify}>
                      ✓ تأكيد التوثيق
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}