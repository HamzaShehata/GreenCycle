import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ firstName, lastName, email, phone });
    setSaved(true);
  };

  const initials = (firstName.charAt(0) || '؟') + (lastName.charAt(0) || '');

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
                {initials}
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--n800)' }}>
                  {firstName} {lastName}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--n400)' }}>{user?.roleLabel}</div>
              </div>
            </div>

            <div className="grid-2 gap-16">
              <div className="form-group">
                <label>الاسم الأول</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setSaved(false);
                  }}
                />
              </div>
              <div className="form-group">
                <label>اسم العائلة</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setSaved(false);
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSaved(false);
                }}
              />
            </div>

            <div className="form-group">
              <label>رقم التليفون</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setSaved(false);
                }}
              />
            </div>

            <button className="btn btn-primary" onClick={handleSave}>
              حفظ التعديلات
            </button>

            {saved && (
              <p style={{ color: 'var(--g600)', fontSize: '13px', marginTop: '10px' }}>
                ✓ اتحفظ (هيتحفظ فعلياً في قاعدة البيانات لما نربط الباك اند)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}