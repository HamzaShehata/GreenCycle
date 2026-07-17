import { useState } from 'react';

const FAQS = [
  {
    q: 'إزاي أبدأ أدور مخلفاتي مع GreenCycle؟',
    a: 'اعمل حساب، اختار "شخص عادي"، وبعدين اعمل طلب تجميع جديد من صفحة "طلب جديد". اختار نوع المخلفات، الوزن التقريبي، والعنوان، وجامع مخلفات هيوصلك.',
  },
  {
    q: 'إزاي بتتحسب النقاط والمكافآت؟',
    a: 'كل نوع مخلفات ليه سعر لكل كيلو. لما جامع المخلفات يوثّق الوزن الفعلي، النقاط بتتحسب تلقائي وتتضاف لمحفظتك.',
  },
  {
    q: 'أنا شركة توصيل، إزاي أشتغل جامع مخلفات؟',
    a: 'سجّل حساب واختار "شركة توصيل" وقت التسجيل. هتوصلك تلقائي لصفحة خاصة بيك تقدر تشوف فيها الطلبات القريبة منك وتقبلها.',
  },
  {
    q: 'المصنع بيشتري إزاي من المنصة؟',
    a: 'المصانع بتشتري من "المخزون" — تجميعة مواد موثقة (نوع، وزن، ودرجة جودة) بعد ما جامعي المخلفات يستلموها ويوزنوها فعلياً، مش من طلبات الأفراد مباشرة.',
  },
  {
    q: 'بياناتي وصوري في أمان؟',
    a: 'أيوه، بس دلوقتي المشروع في مرحلة الفرونت إند وبيانه بتتخزن مؤقت في المتصفح بس. لما نربط الباك اند، هتتخزن بأمان في قاعدة بيانات حقيقية.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="screen">
      <div className="section" style={{ maxWidth: '700px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-label" style={{ textAlign: 'center' }}>أسئلة شائعة</div>
          <div className="section-title">عندك سؤال؟</div>
          <p className="section-sub" style={{ margin: '0 auto' }}>هنا إجابات لأكتر الأسئلة اللي بتتكرر</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {FAQS.map((item, i) => (
            <div key={i} className="card" style={{ cursor: 'pointer' }} onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--n800)' }}>{item.q}</div>
                <span style={{ fontSize: '18px', color: 'var(--g600)' }}>{openIndex === i ? '−' : '+'}</span>
              </div>
              {openIndex === i && (
                <p style={{ fontSize: '14px', color: 'var(--n500)', lineHeight: '1.7', marginTop: '12px' }}>{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}