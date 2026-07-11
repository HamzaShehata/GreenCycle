import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'صيغة البريد الإلكتروني مش صحيحة';
    }

    if (!password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (password.length < 6) {
      newErrors.password = 'كلمة المرور لازم تكون 6 حروف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="screen">
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">
            <div style={{ fontSize: '36px' }}>🌱</div>
            <h2>أهلاً بيك تاني</h2>
            <p>سجّل دخولك لحساب GreenCycle بتاعك</p>
          </div>

          <div className="form-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={errors.email ? { borderColor: 'var(--r500)' } : {}}
            />
            {errors.email && (
              <p style={{ color: 'var(--r500)', fontSize: '12px', marginTop: '4px' }}>
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={errors.password ? { borderColor: 'var(--r500)' } : {}}
            />
            {errors.password && (
              <p style={{ color: 'var(--r500)', fontSize: '12px', marginTop: '4px' }}>
                {errors.password}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 20px', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '400', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '14px', accentColor: 'var(--g500)' }} />
              فكّرني
            </label>
            <a href="#" style={{ color: 'var(--g600)', textDecoration: 'none', fontWeight: '600' }}>
              نسيت كلمة المرور؟
            </a>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleLogin}
          >
            تسجيل الدخول ←
          </button>

          <div className="divider">أو كمّل بـ</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button className="btn btn-outline btn-sm" style={{ justifyContent: 'center' }}>
              🔵 Google
            </button>
            <button className="btn btn-outline btn-sm" style={{ justifyContent: 'center' }}>
              📘 Facebook
            </button>
          </div>

          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--n500)', marginTop: '20px' }}>
            لسه معملتش حساب؟{' '}
            <a href="#" style={{ color: 'var(--g600)', fontWeight: '600' }} onClick={() => navigate('/register')}>
              اعمل حساب جديد
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}