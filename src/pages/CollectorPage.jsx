import { useState } from 'react';
import CollectorSidebar from '../components/CollectorSidebar';
import RouteMap from '../components/RouteMap';
import { useRequests } from '../context/RequestsContext';

// ⚠️ موقع جامع المخلفات الحالي — دلوقتي مثبت، بعد الباك اند هيجي من GPS الموبايل فعلياً
const COLLECTOR_LOCATION = { lat: 27.245, lng: 33.82 };

// حساب المسافة بالكيلومتر بين نقطتين (معادلة Haversine)
function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const STATUS_LABELS = {
  scheduled: { text: '⏳ قيد الانتظار', className: 'badge-amber' },
  in_transit: { text: '🚚 في الطريق', className: 'badge-blue' },
  completed: { text: '✓ مكتمل', className: 'badge-green' },
};

export default function CollectorPage() {
  const { requests, acceptRequest, verifyAndComplete } = useRequests();
  const [view, setView] = useState('dashboard');
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [actualWeight, setActualWeight] = useState('');
  const [qualityGrade, setQualityGrade] = useState('A — ممتاز');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const activeRequests = requests
    .filter((r) => r.status === 'scheduled' || r.status === 'in_transit')
    .map((r) => ({
      ...r,
      distanceKm: getDistanceKm(COLLECTOR_LOCATION.lat, COLLECTOR_LOCATION.lng, r.lat, r.lng),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);

  const completedRequests = requests.filter((r) => r.status === 'completed');

  const selectedRequest = activeRequests.find((r) => r.id === selectedRequestId);

  const handleAccept = (id) => {
    acceptRequest(id);
  };

  const handleVerify = () => {
    const newErrors = {};
    if (!actualWeight || Number(actualWeight) <= 0) {
      newErrors.weight = 'اكتب الوزن الفعلي بعد الوزن';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0 && selectedRequestId) {
      verifyAndComplete(selectedRequestId, { actualWeight, qualityGrade });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setActualWeight('');
        setSelectedRequestId(null);
      }, 2500);
    }
  };

  const inTransitRequests = activeRequests.filter((r) => r.status === 'in_transit');
  return (
    <div className="screen">
      <div className="dash-layout">
        <CollectorSidebar active={view} onNavigate={setView} assignedCount={activeRequests.length} />

        <div className="dash-main">
          {/* ============ DASHBOARD ============ */}
          {view === 'dashboard' && (
            <>
              <div className="dash-header">
                <div>
                  <div className="dash-title">لوحة تحكم جامع المخلفات</div>
                  <div className="dash-sub">عندك {activeRequests.length} طلب متاح دلوقتي</div>
                </div>
                <span className="badge badge-green">🟢 في الخدمة</span>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card green">
                  <div className="kpi-label">طلبات نشطة</div>
                  <div className="kpi-value">{activeRequests.length}</div>
                  <div className="kpi-change up">↑ متاحة دلوقتي</div>
                </div>
                <div className="kpi-card blue">
                  <div className="kpi-label">مكتمل</div>
                  <div className="kpi-value">{completedRequests.length}</div>
                  <div className="kpi-change up">↑ إجمالي</div>
                </div>
                <div className="kpi-card amber">
                  <div className="kpi-label">التقييم</div>
                  <div className="kpi-value">4.9 ⭐</div>
                  <div className="kpi-change up">142 تقييم</div>
                </div>
                <div className="kpi-card purple">
                  <div className="kpi-label">أقرب طلب</div>
                  <div className="kpi-value">
                    {activeRequests[0] ? activeRequests[0].distanceKm.toFixed(1) : '—'}
                    <span style={{ fontSize: '16px', color: 'var(--n500)' }}> كم</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700' }}>أقرب الطلبات ليك</div>
                  <button className="btn btn-outline btn-sm" onClick={() => setView('assigned')}>
                    شوف الكل
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeRequests.slice(0, 4).map((req) => (
                    <div
                      key={req.id}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        border: '1px solid var(--n200)',
                        borderRadius: 'var(--r-lg)',
                        padding: '10px 12px',
                      }}
                    >
                      <div style={{ flex: 1, fontSize: '13px', fontWeight: '600' }}>
                        {req.id} · {req.materials.join(' + ')}
                      </div>
                      {req.distanceKm < 3 && <span className="tag">🔥 قريب</span>}
                      <span style={{ fontSize: '12px', color: 'var(--n500)' }}>{req.distanceKm.toFixed(1)} كم</span>
                      <span className={`badge ${STATUS_LABELS[req.status].className}`}>
                        {STATUS_LABELS[req.status].text}
                      </span>
                    </div>
                  ))}
                  {activeRequests.length === 0 && (
                    <p style={{ fontSize: '13px', color: 'var(--n400)', textAlign: 'center', padding: '20px 0' }}>
                      مفيش طلبات متاحة دلوقتي
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ============ ASSIGNED REQUESTS ============ */}
          {view === 'assigned' && (
            <>
              <div className="dash-header">
                <div>
                  <div className="dash-title">الطلبات المتاحة</div>
                  <div className="dash-sub">مرتبة حسب الأقرب لموقعك</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeRequests.map((req) => (
                  <div key={req.id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>
                          {req.id} · {req.materials.join(' + ')}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--n500)' }}>📍 {req.address}</div>
                        <div style={{ fontSize: '13px', color: 'var(--n500)' }}>⚖️ الوزن التقريبي: {req.weight}</div>
                        <div style={{ fontSize: '13px', marginTop: '4px' }}>
                          <strong style={{ color: req.distanceKm < 3 ? 'var(--g600)' : 'var(--n600)' }}>
                            {req.distanceKm < 3 ? '🔥 قريب — ' : ''}
                            {req.distanceKm.toFixed(1)} كم من موقعك
                          </strong>
                        </div>
                      </div>
                      {req.photo && (
                        <img
                          src={req.photo}
                          alt="صورة المخلفات"
                          style={{ width: '64px', height: '64px', borderRadius: 'var(--r-md)', objectFit: 'cover', marginRight: '10px' }}
                        />
                      )}
                      <span className={`badge ${STATUS_LABELS[req.status].className}`}>
                        {STATUS_LABELS[req.status].text}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                      {req.status === 'scheduled' && (
                        <button className="btn btn-primary btn-sm" onClick={() => handleAccept(req.id)}>
                          ✓ اقبل الطلب
                        </button>
                      )}
                      {req.status === 'in_transit' && (
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            setSelectedRequestId(req.id);
                            setView('weight');
                          }}
                        >
                          ⚖️ وثّق الوزن
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {activeRequests.length === 0 && (
                  <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                    <p style={{ color: 'var(--n400)' }}>مفيش طلبات متاحة دلوقتي</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ============ COMPLETED ============ */}
          {view === 'completed' && (
            <>
              <div className="dash-header">
                <div>
                  <div className="dash-title">المكتمل</div>
                  <div className="dash-sub">{completedRequests.length} طلب اتقفل</div>
                </div>
              </div>
              <div className="card">
                <table>
                  <thead>
                    <tr>
                      <th>الرقم</th>
                      <th>المواد</th>
                      <th>الوزن</th>
                      <th>العنوان</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedRequests.map((c) => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: '600' }}>{c.id}</td>
                        <td>{c.materials.join(' + ')}</td>
                        <td>{c.weight}</td>
                        <td>{c.address}</td>
                      </tr>
                    ))}
                    {completedRequests.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', color: 'var(--n400)', padding: '20px' }}>
                          لسه مفيش طلبات مكتملة
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============ ROUTE PLANNER ============ */}
          {view === 'route' && (
            <>
              <div className="dash-header">
                <div>
                  <div className="dash-title">مخطط الرحلات</div>
                  <div className="dash-sub">الترتيب المقترح حسب الأقرب لموقعك</div>
                </div>
              </div>
              {activeRequests.length > 0 ? (
                <>
                  <div className="card" style={{ marginBottom: '16px' }}>
                    <RouteMap
                      stops={activeRequests.map((r, i) => ({
                        lat: r.lat,
                        lng: r.lng,
                        label: `${r.id} — ${r.materials.join(' + ')}`,
                        sub: r.address,
                        color: i === 0 ? '#22c55e' : '#94a3b8',
                      }))}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeRequests.map((req, i) => (
                      <div key={req.id} className="card-sm" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            background: i === 0 ? 'var(--g500)' : 'var(--n300)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '700',
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: '600' }}>
                          {req.id} · {req.address} ({req.distanceKm.toFixed(1)} كم)
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: 'var(--n400)' }}>مفيش طلبات نشطة نعرضها على الخريطة</p>
                </div>
              )}
            </>
          )}

          {/* ============ WEIGHT VERIFICATION ============ */}
          {view === 'weight' && (
            <>
              <div className="dash-header">
                <div>
                  <div className="dash-title">توثيق الوزن</div>
                  <div className="dash-sub">وثّق الوزن الفعلي بعد استلام أي طلب</div>
                </div>
              </div>

              <div className="card" style={{ maxWidth: '460px' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--g600)' }}>
                      تم توثيق الوزن، والمادة اتضافت للمخزون تلقائي
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label>اختار الطلب</label>
                      <select
                        value={selectedRequestId || ''}
                        onChange={(e) => setSelectedRequestId(e.target.value)}
                      >
                        <option value="">-- اختار طلب --</option>
                        {inTransitRequests.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.id} — {r.materials.join(' + ')}
                          </option>
                        ))}
                      </select>
                    </div>
                    {selectedRequest && (
                      <div className="form-group">
                        <label>نوع المادة</label>
                        <input type="text" value={selectedRequest.materials.join(' + ')} readOnly style={{ background: 'var(--n50)' }} />
                      </div>
                    )}
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
                    <button
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={handleVerify}
                      disabled={!selectedRequestId}
                    >
                      ✓ تأكيد التوثيق
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}