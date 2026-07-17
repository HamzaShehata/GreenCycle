import { useState } from 'react';
import FactorySidebar from '../components/FactorySidebar';
import { useRequests } from '../context/RequestsContext';

const GRADE_BADGE = {
  'A — ممتاز': 'badge-green',
  'B — جيد': 'badge-blue',
  'C — مخلوط': 'badge-amber',
  'D — ملوّث': 'badge-red',
};

const MATERIAL_OPTIONS = ['الكل', 'بلاستيك', 'ورق', 'معدن', 'زجاج', 'إلكترونيات'];
const GRADE_OPTIONS = ['الكل', 'A — ممتاز', 'B — جيد', 'C — مخلوط', 'D — ملوّث'];

export default function InventoryPage() {
  const { inventory, purchaseInventoryItem } = useRequests();
  const [view, setView] = useState('dashboard');
  const [materialFilter, setMaterialFilter] = useState('الكل');
  const [gradeFilter, setGradeFilter] = useState('الكل');
  const [search, setSearch] = useState('');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const available = inventory.filter((i) => i.status === 'available');
  const sold = inventory.filter((i) => i.status === 'sold');

  const totalSpent = sold.reduce((sum, i) => sum + (i.totalPrice || 0), 0);
  const totalWeightPurchased = sold.reduce((sum, i) => sum + (i.verifiedWeightNum || 0), 0);

  const filteredAvailable = available.filter((item) => {
    const matchesMaterial = materialFilter === 'الكل' || item.materials.includes(materialFilter);
    const matchesGrade = gradeFilter === 'الكل' || item.qualityGrade === gradeFilter;
    const matchesSearch =
      !search.trim() || item.materials.some((m) => m.includes(search.trim()));
    return matchesMaterial && matchesGrade && matchesSearch;
  });

  const handlePurchase = (item) => {
    if (window.confirm(`تأكيد شراء ${item.materials.join(' + ')} (${item.verifiedWeight}) مقابل ${item.totalPrice.toFixed(2)} جنيه؟`)) {
      purchaseInventoryItem(item.id);
    }
  };
  return (
    <div className="screen">
      <div className="dash-layout">
        <FactorySidebar active={view} onNavigate={setView} />

        <div className="dash-main">
          {/* ============ DASHBOARD ============ */}
          {view === 'dashboard' && (
            <>
              <div className="dash-header">
                <div>
                  <div className="dash-title">لوحة تحكم المصنع</div>
                  <div className="dash-sub">نظرة عامة على المخزون والمشتريات</div>
                </div>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card green">
                  <div className="kpi-label">متاح للشراء دلوقتي</div>
                  <div className="kpi-value">{available.length}</div>
                </div>
                <div className="kpi-card blue">
                  <div className="kpi-label">إجمالي المشتريات</div>
                  <div className="kpi-value">{sold.length}</div>
                </div>
                <div className="kpi-card amber">
                  <div className="kpi-label">إجمالي المصروف</div>
                  <div className="kpi-value">{totalSpent.toFixed(0)} ج</div>
                </div>
                <div className="kpi-card purple">
                  <div className="kpi-label">وزن اتشترى</div>
                  <div className="kpi-value">
                    {totalWeightPurchased.toFixed(1)}<span style={{ fontSize: '16px', color: 'var(--n500)' }}> كجم</span>
                  </div>
                </div>
              </div>

              {/* ملخص الأثر البيئي — مناسب لمصنع بيهتم بالاستدامة */}
              <div className="esg-grid" style={{ marginBottom: '24px' }}>
                <div className="esg-card e">
                  <div className="esg-letter">E</div>
                  <div className="esg-score">{totalWeightPurchased.toFixed(0)} كجم</div>
                  <div style={{ fontSize: '13px', color: 'var(--n600)' }}>مواد اتحولت من مكب نفايات</div>
                </div>
                <div className="esg-card s">
                  <div className="esg-letter">S</div>
                  <div className="esg-score">{sold.length}</div>
                  <div style={{ fontSize: '13px', color: 'var(--n600)' }}>أسرة/جامعين مخلفات دعمتهم</div>
                </div>
                <div className="esg-card g">
                  <div className="esg-letter">G</div>
                  <div className="esg-score">{(totalWeightPurchased * 2.1).toFixed(0)} كجم</div>
                  <div style={{ fontSize: '13px', color: 'var(--n600)' }}>انبعاثات CO₂ اتوفرت</div>
                </div>
              </div>

              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700' }}>أحدث المتاح في المخزون</div>
                  <button className="btn btn-outline btn-sm" onClick={() => setView('inventory')}>
                    شوف الكل
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {available.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px solid var(--n200)',
                        borderRadius: 'var(--r-lg)',
                        padding: '10px 12px',
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: '600' }}>
                        {item.materials.join(' + ')} · {item.verifiedWeight}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--g600)' }}>
                        {item.totalPrice.toFixed(0)} ج
                      </span>
                    </div>
                  ))}
                  {available.length === 0 && (
                    <p style={{ fontSize: '13px', color: 'var(--n400)', textAlign: 'center', padding: '16px 0' }}>
                      مفيش مواد متاحة دلوقتي
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ============ BROWSE INVENTORY ============ */}
          {view === 'inventory' && (
            <>
              <div className="dash-header">
                <div>
                  <div className="dash-title">تصفح المخزون</div>
                  <div className="dash-sub">مواد اتوثقت فعلياً وجاهزة للشراء</div>
                </div>
              </div>

              <div className="card" style={{ marginBottom: '16px' }}>
                <div className="grid-3 gap-16">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>نوع المادة</label>
                    <select value={materialFilter} onChange={(e) => setMaterialFilter(e.target.value)}>
                      {MATERIAL_OPTIONS.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>درجة الجودة</label>
                    <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)}>
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>بحث</label>
                    <input
                      type="text"
                      placeholder="دور على مادة..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {filteredAvailable.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
                  <p style={{ color: 'var(--n500)' }}>مفيش مواد مطابقة للفلاتر دي دلوقتي</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '16px' }}>
                  {filteredAvailable.map((item) => (
                    <div key={item.id} className="card">
                      {item.photo && (
                        <img
                          src={item.photo}
                          alt="صورة المادة"
                          onClick={() => setLightboxPhoto(item.photo)}
                          style={{
                            width: '100%',
                            height: '140px',
                            objectFit: 'cover',
                            borderRadius: 'var(--r-md)',
                            marginBottom: '12px',
                            cursor: 'zoom-in',
                          }}
                        />
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ fontSize: '15px', fontWeight: '700' }}>{item.materials.join(' + ')}</div>
                        <span className={`badge ${GRADE_BADGE[item.qualityGrade] || 'badge-gray'}`}>{item.qualityGrade}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--n500)', marginBottom: '4px' }}>
                        ⚖️ الوزن الموثق: <strong style={{ color: 'var(--n800)' }}>{item.verifiedWeight}</strong>
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--n500)', marginBottom: '4px' }}>
                        💵 السعر: <strong style={{ color: 'var(--n800)' }}>{item.pricePerKg.toFixed(2)} ج/كجم</strong>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--n400)', marginBottom: '14px' }}>
                        وُثّق بتاريخ {item.dateVerified} · طلب أصلي {item.sourceRequestId}
                      </div>
                      <div
                        style={{
                          background: 'var(--g50)',
                          borderRadius: 'var(--r-md)',
                          padding: '10px',
                          textAlign: 'center',
                          marginBottom: '10px',
                          fontWeight: '800',
                          fontSize: '16px',
                          color: 'var(--g700)',
                        }}
                      >
                        الإجمالي: {item.totalPrice.toFixed(2)} جنيه
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={() => handlePurchase(item)}
                      >
                        🛒 اشتري الآن
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ============ PURCHASE ORDERS ============ */}
          {view === 'orders' && (
            <>
              <div className="dash-header">
                <div>
                  <div className="dash-title">أوامر الشراء</div>
                  <div className="dash-sub">{sold.length} عملية شراء، إجمالي {totalSpent.toFixed(0)} جنيه</div>
                </div>
              </div>
              <div className="card">
                <table>
                  <thead>
                    <tr>
                      <th>المواد</th>
                      <th>الوزن</th>
                      <th>الجودة</th>
                      <th>السعر الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sold.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {item.photo && (
                            <img
                              src={item.photo}
                              alt=""
                              onClick={() => setLightboxPhoto(item.photo)}
                              style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover', cursor: 'zoom-in', marginLeft: '8px', verticalAlign: 'middle' }}
                            />
                          )}
                          {item.materials.join(' + ')}
                        </td>
                        <td>{item.verifiedWeight}</td>
                        <td>
                          <span className={`badge ${GRADE_BADGE[item.qualityGrade] || 'badge-gray'}`}>{item.qualityGrade}</span>
                        </td>
                        <td style={{ fontWeight: '700', color: 'var(--g600)' }}>{item.totalPrice.toFixed(2)} ج</td>
                      </tr>
                    ))}
                    {sold.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', color: 'var(--n400)', padding: '24px' }}>
                          لسه معملتش أي عملية شراء
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* LIGHTBOX — عرض الصورة بحجم كامل */}
      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,.85)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={lightboxPhoto}
            alt="عرض كامل"
            style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-xl)' }}
          />
        </div>
      )}
    </div>
  );
}