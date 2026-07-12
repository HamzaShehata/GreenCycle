import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ROLES = [
  { id: 'individual', icon: '👤', name: 'شخص عادي' },
  { id: 'collector', icon: '🚚', name: 'شركة توصيل' },
  { id: 'factory', icon: '🏭', name: 'مصنع' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('individual');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = 'الاسم الأول مطلوب';
    if (!lastName.trim()) newErrors.lastName = 'اسم العائلة مطلوب';

    if (!email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'صيغة البريد الإلكتروني مش صحيحة';
    }

    if (!phone.trim()) {
      newErrors.phone = 'رقم التليفون مطلوب';
    } else if (!/^[\d+\s]{8,}$/.test(phone)) {
      newErrors.phone = 'رقم التليفون مش صحيح';
    }

    if (!password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (password.length < 8) {
      newErrors.password = 'كلمة المرور لازم تكون 8 حروف على الأقل';
    }

    if (!agree) {
      newErrors.agree = 'لازم توافق على الشروط عشان تكمل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // نوجّه المستخدم لصفحة مختلفة حسب الدور اللي اختاره
      if (selectedRole === 'collector') {
        navigate('/collector');
      } else if (selectedRole === 'factory') {
        // لسه معملناش صفحة خاصة بالمصنع، فمؤقتاً بتوديه للداشبورد العادي
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const inputStyle = (field) => (errors[field] ? { borderColor: 'var(--r500)' } : {});

  const errorText = (field) =>
    errors[field] && (
      <p style={{ color: 'var(--r500)', fontSize: '12px', marginTop: '4px' }}>{errors[field]}</p>
    );

  return (
    <div className="screen">
      <div className="auth-page">
        <div className="auth-card" style={{ maxWidth: '480px' }}>
          <div className="auth-logo">
            <div style={{ fontSize: '36px' }}>🌱</div>
            <h2>اعمل حساب جديد</h2>
            <p>انضم لمنظومة الاقتصاد الدائري</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginBottom: '10px', display: 'block' }}>أنا...</label>
            <div className="role-grid">
              {ROLES.map((role) => (
                <div
                  key={role.id}
                  className={`role-card${selectedRole === role.id ? ' selected' : ''}`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="role-icon">{role.icon}</div>
                  <div className="role-name">{role.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid-2 gap-16">
            <div className="form-group">
              <label>الاسم الأول</label>
              <input
                type="text"
                placeholder="أحمد"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={inputStyle('firstName')}
              />
              {errorText('firstName')}
            </div>
            <div className="form-group">
              <label>اسم العائلة</label>
              <input
                type="text"
                placeholder="حسن"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={inputStyle('lastName')}
              />
              {errorText('lastName')}
            </div>
          </div>

          <div className="form-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="ahmed@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle('email')}
            />
            {errorText('email')}
          </div>

          <div className="form-group">
            <label>رقم التليفون</label>
            <input
              type="text"
              placeholder="+20 10 0000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle('phone')}
            />
            {errorText('phone')}
          </div>

          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              placeholder="8 أحرف على الأقل"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle('password')}
            />
            {errorText('password')}
          </div>

          <div style={{ margin: '16px 0', fontSize: '13px', color: 'var(--n500)' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontWeight: '400', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                style={{ accentColor: 'var(--g500)', marginTop: '2px' }}
              />
              <span>
                موافق على <a href="#" style={{ color: 'var(--g600)' }}>شروط الاستخدام</a> و
                <a href="#" style={{ color: 'var(--g600)' }}> سياسة الخصوصية</a>
              </span>
            </label>
            {errorText('agree')}
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleSubmit}
          >
            اعمل حساب ←
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--n500)', marginTop: '16px' }}>
            عندك حساب بالفعل؟{' '}
            <a href="#" style={{ color: 'var(--g600)', fontWeight: '600' }} onClick={() => navigate('/login')}>
              سجّل دخولك
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}