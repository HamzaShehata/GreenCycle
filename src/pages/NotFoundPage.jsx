import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div
        style={{
          minHeight: 'calc(100vh - 52px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px 20px',
        }}
      >
        <div style={{ fontSize: '80px', fontWeight: '900', color: 'var(--g200)', lineHeight: '1' }}>404</div>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--n900)', margin: '16px 0 8px' }}>
          الصفحة دي مش موجودة
        </h1>
        <p style={{ color: 'var(--n500)', fontSize: '14px', marginBottom: '28px' }}>
          يمكن الرابط غلط أو الصفحة اتشالت
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          رجوع للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}