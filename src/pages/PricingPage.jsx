import { useNavigate } from 'react-router-dom';

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div style={{ background: 'var(--n50)', padding: '60px 24px 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
          <div className="section-label">الأسعار</div>
          <div className="section-title">الخطط والمكافآت</div>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            الأفراد بيكسبوا نقاط مجاناً. الشركات بتاخد أدوات إدارة متقدمة. المصانع توصل للسوق.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: '20px',
            maxWidth: '900px',
            margin: '0 auto',
            paddingBottom: '60px',
          }}
        >
          <div className="card" style={{ border: '2px solid var(--n200)' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--n500)', marginBottom: '12px', textTransform: 'uppercase' }}>
              فرد
            </div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--n900)' }}>مجاني</div>
            <p style={{ fontSize: '13px', color: 'var(--n500)', margin: '8px 0 20px', lineHeight: '1.5' }}>
              مثالي للبيوت والأفراد اللي عايزين يدوروا مخلفاتهم ويكسبوا مكافآت.
            </p>
            <div style={{ borderTop: '1px solid var(--n200)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ طلبات تجميع من غير حد أقصى</div>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ محفظة GreenPoints</div>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ تتبع لحظي للطلبات</div>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ تقرير تأثير شهري</div>
            </div>
            <button
              className="btn btn-outline btn-sm"
              style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}
              onClick={() => navigate('/register')}
            >
              ابدأ مجاناً
            </button>
          </div>

          <div className="card" style={{ border: '2px solid var(--g500)', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--g500)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 14px',
                borderRadius: '20px',
              }}
            >
              الأكتر طلباً
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--g600)', marginBottom: '12px', textTransform: 'uppercase' }}>
              شركة
            </div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--n900)' }}>
              1,500<span style={{ fontSize: '14px', color: 'var(--n500)', fontWeight: '500' }}> جنيه/شهر</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--n500)', margin: '8px 0 20px', lineHeight: '1.5' }}>
              للشركات الصغيرة والمتوسطة اللي بتدير مخلفاتها وتقارير الاستدامة (ESG).
            </p>
            <div style={{ borderTop: '1px solid var(--n200)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ كل مميزات خطة الفرد</div>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ إدارة أكتر من فرع</div>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ تقارير امتثال ESG</div>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ مدير حساب مخصص</div>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ مواعيد تجميع مخصصة</div>
            </div>
            <button className="btn btn-primary btn-sm" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              ابدأ تجربة مجانية
            </button>
          </div>

          <div className="card" style={{ border: '2px solid var(--n200)' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--n500)', marginBottom: '12px', textTransform: 'uppercase' }}>
              مصنع
            </div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--n900)' }}>
              6,000<span style={{ fontSize: '14px', color: 'var(--n500)', fontWeight: '500' }}> جنيه/شهر</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--n500)', margin: '8px 0 20px', lineHeight: '1.5' }}>
              وصول كامل للسوق لمصانع التدوير عشان توفر مواد موثقة.
            </p>
            <div style={{ borderTop: '1px solid var(--n200)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ وصول كامل للسوق</div>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ بيانات توثيق المواد</div>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ طلبات شراء بالجملة</div>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ فوترة تلقائية</div>
              <div style={{ fontSize: '13px', color: 'var(--n700)' }}>✓ تكامل عبر API</div>
            </div>
            <button className="btn btn-outline btn-sm" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              كلّم فريق المبيعات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}