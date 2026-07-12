export default function AboutPage() {
  return (
    <div className="screen">
      <div style={{ background: 'linear-gradient(135deg,var(--g800),var(--e700))', padding: '60px 24px', textAlign: 'center' }}>
        <div className="section-label" style={{ color: '#86efac' }}>قصتنا</div>
        <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#fff', marginBottom: '12px', letterSpacing: '-.5px' }}>
          بنبني اقتصاد دائري
        </h1>
        <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
          اتأسست GreenCycle سنة 2026 برسالة واحدة: نخلي التدوير سهل ومربح وشفاف لأي حد.
        </p>
      </div>

      <div className="section" style={{ maxWidth: '800px' }}>
        <div className="grid-2 mt-16">
          <div className="card">
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--n900)', marginBottom: '6px' }}>رسالتنا</div>
            <p style={{ fontSize: '14px', color: 'var(--n500)', lineHeight: '1.7' }}>
              نبني البنية التحتية اللي بتحوّل المخلفات القابلة للتدوير من عبء لمورد له قيمة حقيقية، عن طريق التكنولوجيا والشفافية ومشاركة المجتمع.
            </p>
          </div>
          <div className="card">
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>👁️</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--n900)', marginBottom: '6px' }}>رؤيتنا</div>
            <p style={{ fontSize: '14px', color: 'var(--n500)', lineHeight: '1.7' }}>
              عالم مفيهوش حاجة بتتهدر. كل مادة قابلة للتدوير توصل لأعلى قيمة ممكنة، وكل شخص ياخد مقابل عادل عن التدوير.
            </p>
          </div>
        </div>

        <div className="card mt-24">
          <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--n900)', marginBottom: '16px' }}>فريقنا</div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', flex: '1', minWidth: '100px' }}>
              <div className="avatar" style={{ width: '56px', height: '56px', fontSize: '18px', background: 'var(--g100)', color: 'var(--g700)', margin: '0 auto 8px' }}>
                ح ش
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>حمزة شحاتة</div>
              <div style={{ fontSize: '11px', color: 'var(--n400)' }}>Team Leader</div>
            </div>

            <div style={{ textAlign: 'center', flex: '1', minWidth: '100px' }}>
              <div className="avatar" style={{ width: '56px', height: '56px', fontSize: '18px', background: 'var(--b100)', color: 'var(--b600)', margin: '0 auto 8px' }}>
                أ ي
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>أميرة يحيي</div>
              <div style={{ fontSize: '11px', color: 'var(--n400)' }}>Member</div>
            </div>

            <div style={{ textAlign: 'center', flex: '1', minWidth: '100px' }}>
              <div className="avatar" style={{ width: '56px', height: '56px', fontSize: '18px', background: '#ede9fe', color: '#5b21b6', margin: '0 auto 8px' }}>
                م أ
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>محمود البحار</div>
              <div style={{ fontSize: '11px', color: 'var(--n400)' }}>Member</div>
            </div>

            <div style={{ textAlign: 'center', flex: '1', minWidth: '100px' }}>
              <div className="avatar" style={{ width: '56px', height: '56px', fontSize: '18px', background: '#fef3c7', color: '#92400e', margin: '0 auto 8px' }}>
                ر ن
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>رنيم نعيم</div>
              <div style={{ fontSize: '11px', color: 'var(--n400)' }}>Member</div>
            </div>

            {/* العضو الخامس — غيّر الاسم والحروف والدور زي ما تحب */}
            <div style={{ textAlign: 'center', flex: '1', minWidth: '100px' }}>
              <div className="avatar" style={{ width: '56px', height: '56px', fontSize: '18px', background: '#fee2e2', color: '#991b1b', margin: '0 auto 8px' }}>
                ش دٍ
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}> شمس دلعاب </div>
              <div style={{ fontSize: '11px', color: 'var(--n400)' }}>Member</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}