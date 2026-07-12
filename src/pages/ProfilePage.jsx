import { useState } from 'react';
import Sidebar from '../components/Sidebar';

// ⚠️ MOCK DATA — بيانات المستخدم دي هتيجي من الـ API لما يتعمل الباك اند (GET /api/profile)
const INITIAL_PROFILE = {
  firstName: 'سارة',
  lastName: 'أحمد',
  email: 'sara.ahmed@example.com',
  phone: '+20 10 1234 5678',
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="screen">
      <div className="dash-layout">
        <Sidebar active="profile" />
        <div className="dash-main">
          <div className="dash-header">
            <div className="dash-title">الملف الشخصي</div>
          </div>

          <div className="card" style={{ maxWidth: '480px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div
                className="avatar"
                style={{ width: '56px', height: '56px', background: 'var(--g100)', color: 'var(--g700)', fontSize: '20px' }}
              >
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--n800)' }}>
                  {profile.firstName} {profile.lastName}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--n400)' }}>مستخدم عادي</div>
              </div>
            </div>

            <div className="grid-2 gap-16">
              <div className="form-group">
                <label>الاسم الأول</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>اسم العائلة</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>رقم التليفون</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>

            <button className="btn btn-primary" onClick={handleSave}>
              حفظ التعديلات
            </button>

            {saved && (
              <p style={{ color: 'var(--g600)', fontSize: '13px', marginTop: '10px' }}>
                ✓ اتحفظ محلياً (هيتحفظ فعلياً في قاعدة البيانات لما نربط الباك اند)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}