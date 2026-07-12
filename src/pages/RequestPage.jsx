import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationPicker from '../components/LocationPicker';
import { useRequests } from '../context/RequestsContext';

// ملحوظة: الأسعار دي مؤقتة ومثبتة هنا بس لحد ما نعمل الباك اند وصفحة الأدمن.
// بعد كده الأسعار دي هتيجي من الـ API وهيقدر الأدمن يعدلها من لوحة التحكم بتاعته.
const MATERIALS = [
  { id: 'plastic', icon: '♻️', name: 'بلاستيك', desc: 'كل الأنواع', pricePerKg: 3 },
  { id: 'paper', icon: '📄', name: 'ورق', desc: 'كرتون', pricePerKg: 2 },
  { id: 'metal', icon: '🔩', name: 'معدن', desc: 'ألومنيوم، حديد', pricePerKg: 8 },
  { id: 'glass', icon: '🔮', name: 'زجاج', desc: 'زجاجات، برطمانات', pricePerKg: 1.5 },
  { id: 'electronics', icon: '💻', name: 'إلكترونيات', desc: 'مخلفات إلكترونية', pricePerKg: 12 },
];
export default function RequestPage() {
  const navigate = useNavigate();
  const { addRequest } = useRequests();

  const [selectedMaterials, setSelectedMaterials] = useState(['plastic', 'metal']);
  const [weight, setWeight] = useState('12');
  const [notes, setNotes] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('الغردقة');
  const [building, setBuilding] = useState('');
  const [location, setLocation] = useState({ lat: 27.2579, lng: 33.8116 });
  const [timeSlot, setTimeSlot] = useState('morning');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const toggleMaterial = (id) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  // متوسط سعر الكيلو للمواد المختارة × الوزن الكلي = القيمة التقديرية
  const selectedPrices = MATERIALS.filter((m) => selectedMaterials.includes(m.id)).map(
    (m) => m.pricePerKg
  );
  const avgPrice =
    selectedPrices.length > 0
      ? selectedPrices.reduce((a, b) => a + b, 0) / selectedPrices.length
      : 0;
  const estimatedValue = (avgPrice * Number(weight || 0)).toFixed(2);
  const estimatedPoints = Math.round(estimatedValue * 20);

  const validate = () => {
    const newErrors = {};
    if (selectedMaterials.length === 0) newErrors.materials = 'اختار نوع مخلفات واحد على الأقل';
    if (!weight || Number(weight) <= 0) newErrors.weight = 'الوزن التقريبي مطلوب';
    if (!address.trim()) newErrors.address = 'عنوان الاستلام مطلوب';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = () => {
    if (validate()) {
      const materialNames = MATERIALS.filter((m) => selectedMaterials.includes(m.id)).map(
        (m) => m.name
      );
      addRequest({ materials: materialNames, weight });
      setSubmitted(true);
    }
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
          <div className="sidebar-item active">
            <span className="si-icon">➕</span>طلب جديد
          </div>
       <div className="sidebar-item" onClick={() => navigate('/my-requests')}>
            <span className="si-icon">📍</span>طلباتي
          </div>
          <div className="sidebar-item">
            <span className="si-icon">💰</span>المحفظة
          </div>
        </div>

        {/* MAIN */}
        <div className="dash-main">
          <div className="dash-header">
            <div>
              <div className="dash-title">اطلب استلام مخلفات</div>
              <div className="dash-sub">اعمل طلب تجميع جديد لمخلفاتك القابلة للتدوير</div>
            </div>
          </div>

          {submitted ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--n800)', marginBottom: '8px' }}>
                تم إرسال طلبك بنجاح!
              </div>
              <div style={{ fontSize: '14px', color: 'var(--n500)', marginBottom: '20px' }}>
                هيوصلك إشعار لما جامع المخلفات يقبل الطلب
              </div>
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                رجوع للوحة التحكم
              </button>
            </div>
          ) : (
            <div className="grid-2" style={{ gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="card">
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--n800)', marginBottom: '16px' }}>
                    اختار نوع المخلفات
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {MATERIALS.map((m) => (
                      <div
                        key={m.id}
                        className={`role-card${selectedMaterials.includes(m.id) ? ' selected' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left', padding: '12px' }}
                        onClick={() => toggleMaterial(m.id)}
                      >
                        <span style={{ fontSize: '20px' }}>{m.icon}</span>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: '700' }}>{m.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--n400)' }}>{m.desc}</div>
                          <div style={{ fontSize: '11px', color: 'var(--g600)', fontWeight: '600', marginTop: '2px' }}>
                            {m.pricePerKg} جنيه / كجم
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.materials && (
                    <p style={{ color: 'var(--r500)', fontSize: '12px', marginTop: '8px' }}>{errors.materials}</p>
                  )}
                </div>

                <div className="card">
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--n800)', marginBottom: '12px' }}>
                    الوزن التقريبي
                  </div>
                  <div className="form-group">
                    <label>الوزن التقريبي (كجم)</label>
                    <input
                      type="number"
                      placeholder="مثلاً 15"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      style={errors.weight ? { borderColor: 'var(--r500)' } : {}}
                    />
                    {errors.weight && (
                      <p style={{ color: 'var(--r500)', fontSize: '12px', marginTop: '4px' }}>{errors.weight}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>ملاحظات لجامع المخلفات</label>
                    <textarea
                      style={{ height: '80px' }}
                      placeholder="أي تعليمات خاصة..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="card">
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--n800)', marginBottom: '12px' }}>
                    عنوان الاستلام
                  </div>
                  <div className="form-group">
                    <label>عنوان الشارع</label>
                    <input
                      type="text"
                      placeholder="١٢٣ شارع جمال"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={errors.address ? { borderColor: 'var(--r500)' } : {}}
                    />
                    {errors.address && (
                      <p style={{ color: 'var(--r500)', fontSize: '12px', marginTop: '4px' }}>{errors.address}</p>
                    )}
                  </div>
                  <div className="grid-2 gap-16">
                    <div className="form-group">
                      <label>المدينة</label>
                      <select value={city} onChange={(e) => setCity(e.target.value)}>
                        <option>الغردقة</option>
                        <option>القاهرة</option>
                        <option>الإسكندرية</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>المبنى / الدور</label>
                      <input
                        type="text"
                        placeholder="عمارة ٣، الدور ٤"
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                      />
                    </div>
                  </div>
                  <LocationPicker onLocationSelect={setLocation} />
                  <p style={{ fontSize: '12px', color: 'var(--n500)', marginTop: '8px' }}>
                    📍 الموقع المحدد: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                  </p>
                </div>

                <div className="card">
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--n800)', marginBottom: '12px' }}>
                    الميعاد
                  </div>
                  <div className="form-group">
                    <label>ميعاد الاستلام</label>
                    <input type="text" defaultValue="الأربعاء، ٢٥ يونيو ٢٠٢٥" />
                  </div>
                  <div className="form-group">
                    <label>الفترة</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                      <div
                        className={`role-card${timeSlot === 'morning' ? ' selected' : ''}`}
                        style={{ padding: '10px', textAlign: 'center' }}
                        onClick={() => setTimeSlot('morning')}
                      >
                        <div style={{ fontSize: '12px', fontWeight: '700' }}>الصبح</div>
                        <div style={{ fontSize: '11px', color: 'var(--n400)' }}>٨ ص – ١٢ م</div>
                      </div>
                      <div
                        className={`role-card${timeSlot === 'afternoon' ? ' selected' : ''}`}
                        style={{ padding: '10px', textAlign: 'center' }}
                        onClick={() => setTimeSlot('afternoon')}
                      >
                        <div style={{ fontSize: '12px', fontWeight: '700' }}>بعد الضهر</div>
                        <div style={{ fontSize: '11px', color: 'var(--n400)' }}>١ م – ٥ م</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: 'linear-gradient(135deg,var(--g700),var(--e600))',
                    borderRadius: 'var(--r-xl)',
                    padding: '20px',
                    color: '#fff',
                  }}
                >
                  <div style={{ fontSize: '12px', opacity: '.8', marginBottom: '4px' }}>القيمة التقديرية</div>
                  <div style={{ fontSize: '32px', fontWeight: '900' }}>
                    {estimatedValue} <span style={{ fontSize: '16px', fontWeight: '500', opacity: '.8' }}>جنيه</span>
                  </div>
                  <div style={{ fontSize: '12px', opacity: '.7', marginTop: '4px' }}>
                    ≈ {estimatedPoints} نقطة GreenPoints
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '14px' }}
                  onClick={handleSubmit}
                >
                  تأكيد الطلب ←
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}