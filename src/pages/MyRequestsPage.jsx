import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequests } from '../context/RequestsContext';

export default function MyRequestsPage() {
  const navigate = useNavigate();
  const { requests, STATUS_BADGE } = useRequests();
  const [selectedId, setSelectedId] = useState(requests[0]?.id);

  useEffect(() => {
    if (requests.length > 0 && !requests.find((r) => r.id === selectedId)) {
      setSelectedId(requests[0].id);
    }
  }, [requests, selectedId]);

  const selectedRequest = requests.find((r) => r.id === selectedId);

  return (
    <div className="screen">
      <div className="dash-layout">
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
          <div className="sidebar-item active">
            <span className="si-icon">📍</span>طلباتي
          </div>
        <div className="sidebar-item" onClick={() => navigate('/wallet')}>
            <span className="si-icon">💰</span>المحفظة
          </div>
        </div>

        <div className="dash-main">
          <div className="dash-header">
            <div>
              <div className="dash-title">طلباتي</div>
              <div className="dash-sub">كل طلبات التجميع بتاعتك وحالة كل واحد</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/request')}>
              + طلب جديد
            </button>
          </div>

          {requests.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
              <div style={{ fontSize: '15px', color: 'var(--n500)' }}>لسه معملتش أي طلب</div>
            </div>
          ) : (
            <div className="grid-2" style={{ gap: '16px', alignItems: 'flex-start' }}>
              <div className="card" style={{ padding: '0' }}>
                {requests.map((req) => (
                  <div
                    key={req.id}
                    onClick={() => setSelectedId(req.id)}
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid var(--n100)',
                      cursor: 'pointer',
                      background: selectedId === req.id ? 'var(--g50)' : 'transparent',
                      borderRight: selectedId === req.id ? '3px solid var(--g500)' : '3px solid transparent',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--n800)' }}>{req.id}</span>
                      <span className={`badge ${STATUS_BADGE[req.status].className}`}>
                        {STATUS_BADGE[req.status].text}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      {req.materials.map((m) => (
                        <span key={m} className="tag">{m}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--n500)' }}>
                      <span>{req.date} · {req.weight}</span>
                      <span style={{ fontWeight: '600', color: 'var(--g600)' }}>{req.reward}</span>
                    </div>
                  </div>
                ))}
              </div>

              {selectedRequest && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--n800)' }}>
                      تتبع الطلب {selectedRequest.id}
                    </div>
                    <span className={`badge ${STATUS_BADGE[selectedRequest.status].className}`}>
                      {STATUS_BADGE[selectedRequest.status].text}
                    </span>
                  </div>
                  <div className="timeline">
                    {selectedRequest.timeline.map((step, i) => (
                      <div key={i} className="tl-item">
                        <div className={`tl-dot ${step.state}`}>{step.icon}</div>
                        <div className="tl-content">
                          <div className="tl-title">{step.title}</div>
                          <div className="tl-time">{step.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}