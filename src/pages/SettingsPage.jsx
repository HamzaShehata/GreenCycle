import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [language, setLanguage] = useState('ar');

  const Toggle = ({ checked, onChange }) => (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: '42px',
        height: '24px',
        borderRadius: '20px',
        background: checked ? 'var(--g500)' : 'var(--n300)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background .15s',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: '3px',
          right: checked ? '3px' : '21px',
          transition: 'right .15s',
          boxShadow: '0 1px 2px rgba(0,0,0,.2)',
        }}
      />
    </div>
  );

  return (
    <div className="screen">
      <div className="dash-layout">
        <Sidebar active="settings" />
        <div className="dash-main">
          <div className="dash-header">
            <div className="dash-title">الإعدادات</div>
          </div>

          <div className="card" style={{ maxWidth: '520px', marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--n800)', marginBottom: '16px' }}>
              الإشعارات
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--n100)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--n800)' }}>إشعارات الإيميل</div>
                <div style={{ fontSize: '12px', color: 'var(--n500)' }}>تحديثات الطلبات والمحفظة</div>
              </div>
              <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--n100)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--n800)' }}>إشعارات فورية (Push)</div>
                <div style={{ fontSize: '12px', color: 'var(--n500)' }}>تنبيهات لحظية على الموبايل</div>
              </div>
              <Toggle checked={pushNotifs} onChange={setPushNotifs} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--n800)' }}>رسائل SMS</div>
                <div style={{ fontSize: '12px', color: 'var(--n500)' }}>تنبيهات عن طريق رسالة نصية</div>
              </div>
              <Toggle checked={smsNotifs} onChange={setSmsNotifs} />
            </div>
          </div>

          <div className="card" style={{ maxWidth: '520px', marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--n800)', marginBottom: '16px' }}>
              اللغة
            </div>
            <div className="form-group">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <div className="card" style={{ maxWidth: '520px', borderColor: 'var(--r500)' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--r500)', marginBottom: '8px' }}>
              منطقة الخطر
            </div>
            <p style={{ fontSize: '12px', color: 'var(--n500)', marginBottom: '14px' }}>
              حذف الحساب هيمسح كل بياناتك نهائياً ومش هينفع ترجعه
            </p>
            <button
              className="btn btn-outline btn-sm"
              style={{ borderColor: 'var(--r500)', color: 'var(--r500)' }}
            >
              حذف الحساب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}