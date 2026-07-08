import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div className="hero">
        <div className="hero-badge">🌱 منصة الاقتصاد الدائري الذكية</div>
        <h1>
          مرحباً بيك في
          <br />
          <span>GreenCycle 🌱</span>
        </h1>
        <p>
          GreenCycle بتربط الأفراد وجامعين المخلفات ومصانع التدوير على منصة واحدة ذكية
          — بتخلي التدوير مجزي، قابل للتتبع، وليه تأثير حقيقي.
        </p>
        <div className="hero-btns">
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            ابدأ التدوير مجاناً ←
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>
            شوف لوحة التحكم
          </button>
        </div>
      </div>

      <div className="stats-strip">
        <div className="stat-item">
          <div className="stat-num">2.4M+</div>
          <div className="stat-label">كيلو اتدور</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">18K+</div>
          <div className="stat-label">مستخدم نشط</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">340+</div>
          <div className="stat-label">جامع مخلفات</div>
        </div>
      </div>
    </div>
  );
}