import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRequests } from '../context/RequestsContext';

const ADMIN_ITEMS = [
  { id: 'dashboard', icon: '📊', label: 'لوحة التحكم' },
  { id: 'users', icon: '👥', label: 'المستخدمين' },
  { id: 'requests', icon: '📋', label: 'كل الطلبات' },
  { id: 'inventory', icon: '📦', label: 'المخزون' },
];

const ROLE_ICON = {
  individual: '👤',
  collector: '🚚',
  factory: '🏭',
  admin: '🛡️',
};

const STATUS_BADGE_ADMIN = {
  scheduled: { text: '⏳ مجدول', className: 'badge-amber' },
  in_transit: { text: '🚚 في الطريق', className: 'badge-blue' },
  completed: { text: '✓ مكتمل', className: 'badge-green' },
};

const EMPTY_USER_FORM = { firstName: '', lastName: '', email: '', phone: '' };

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, allUsers, logout, addUserByAdmin, updateUserByAdmin, deleteUserByAdmin } = useAuth();
  const { requests, inventory, updateRequestByAdmin, deleteRequestByAdmin } = useRequests();
  const [view, setView] = useState('dashboard');

  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState(EMPTY_USER_FORM);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserDraft, setEditUserDraft] = useState({});

  const [editingRequestId, setEditingRequestId] = useState(null);
  const [editRequestDraft, setEditRequestDraft] = useState({});

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const usersByRole = allUsers.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  const activeRequests = requests.filter((r) => r.status !== 'completed').length;
  const completedRequests = requests.filter((r) => r.status === 'completed').length;
  const availableInventory = inventory.filter((i) => i.status === 'available').length;
  const soldInventory = inventory.filter((i) => i.status === 'sold').length;

  const handleAddAdmin = () => {
    if (!newAdminForm.firstName.trim() || !newAdminForm.email.trim()) {
      alert('اكتب الاسم والإيميل على الأقل');
      return;
    }
    addUserByAdmin({ ...newAdminForm, role: 'admin' });
    setNewAdminForm(EMPTY_USER_FORM);
    setShowAddAdminForm(false);
  };

  const startEditUser = (u) => {
    setEditingUserId(u.id);
    setEditUserDraft({ firstName: u.firstName, lastName: u.lastName, email: u.email, phone: u.phone, role: u.role });
  };

  const saveEditUser = (id) => {
    updateUserByAdmin(id, editUserDraft);
    setEditingUserId(null);
  };

  const handleDeleteUser = (id, name) => {
    if (window.confirm(`متأكد إنك عايز تحذف ${name}؟`)) {
      deleteUserByAdmin(id);
    }
  };

  const startEditRequest = (r) => {
    setEditingRequestId(r.id);
    setEditRequestDraft({
      materialsText: r.materials.join(', '),
      weight: r.weight,
      address: r.address,
      status: r.status,
    });
  };

  const saveEditRequest = (id) => {
    updateRequestByAdmin(id, {
      materials: editRequestDraft.materialsText.split(',').map((m) => m.trim()).filter(Boolean),
      weight: editRequestDraft.weight,
      address: editRequestDraft.address,
      status: editRequestDraft.status,
    });
    setEditingRequestId(null);
  };

  const handleDeleteRequest = (id) => {
    if (window.confirm(`متأكد إنك عايز تحذف الطلب ${id}؟`)) {
      deleteRequestByAdmin(id);
    }
  };
  const displayName = user ? `${user.firstName} ${user.lastName}`.trim() : 'أدمن';
  const initials = user ? user.firstName.charAt(0) + (user.lastName.charAt(0) || '') : '؟';

  return (
    <div className="screen">
      <div className="dash-layout">
        {/* SIDEBAR */}
        <div className="sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--n200)', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="avatar" style={{ width: '36px', height: '36px', background: '#ede9fe', color: '#5b21b6', fontSize: '13px' }}>
                {initials}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700' }}>{displayName}</div>
                <div style={{ fontSize: '11px', color: 'var(--n400)' }}>🛡️ أدمن</div>
              </div>
            </div>
          </div>
          {ADMIN_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`sidebar-item${view === item.id ? ' active' : ''}`}
              onClick={() => setView(item.id)}
            >
              <span className="si-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: '12px 16px', borderTop: '1px solid var(--n200)' }}>
            <div className="sidebar-item" onClick={handleLogout} style={{ color: 'var(--r500)' }}>
              <span className="si-icon">🚪</span>تسجيل خروج
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="dash-main">
          {/* ============ DASHBOARD ============ */}
          {view === 'dashboard' && (
            <>
              <div className="dash-header">
                <div className="dash-title">لوحة تحكم الأدمن</div>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card green">
                  <div className="kpi-label">إجمالي المستخدمين</div>
                  <div className="kpi-value">{allUsers.length}</div>
                </div>
                <div className="kpi-card blue">
                  <div className="kpi-label">طلبات نشطة</div>
                  <div className="kpi-value">{activeRequests}</div>
                </div>
                <div className="kpi-card amber">
                  <div className="kpi-label">طلبات مكتملة</div>
                  <div className="kpi-value">{completedRequests}</div>
                </div>
                <div className="kpi-card purple">
                  <div className="kpi-label">مواد في المخزون</div>
                  <div className="kpi-value">{availableInventory}</div>
                </div>
              </div>

              <div className="grid-2" style={{ gap: '16px' }}>
                <div className="card">
                  <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '14px' }}>المستخدمين حسب الدور</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['individual', 'collector', 'factory', 'admin'].map((role) => (
                      <div key={role} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px' }}>
                          {ROLE_ICON[role]} {role === 'individual' ? 'أفراد' : role === 'collector' ? 'شركات توصيل' : role === 'factory' ? 'مصانع' : 'أدمن'}
                        </span>
                        <span style={{ fontWeight: '700' }}>{usersByRole[role] || 0}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '14px' }}>ملخص المخزون</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px' }}>متاح للبيع</span>
                      <span style={{ fontWeight: '700', color: 'var(--g600)' }}>{availableInventory}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px' }}>اتباع</span>
                      <span style={{ fontWeight: '700', color: 'var(--b600)' }}>{soldInventory}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ============ USERS ============ */}
          {view === 'users' && (
            <>
              <div className="dash-header">
                <div>
                  <div className="dash-title">كل المستخدمين</div>
                  <div className="dash-sub">{allUsers.length} مستخدم مسجل</div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setShowAddAdminForm((v) => !v)}>
                  + ضيف أدمن جديد
                </button>
              </div>

              {showAddAdminForm && (
                <div className="card" style={{ marginBottom: '16px', maxWidth: '520px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>حساب أدمن جديد</div>
                  <div className="grid-2 gap-16">
                    <div className="form-group">
                      <label>الاسم الأول</label>
                      <input
                        type="text"
                        value={newAdminForm.firstName}
                        onChange={(e) => setNewAdminForm({ ...newAdminForm, firstName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>اسم العائلة</label>
                      <input
                        type="text"
                        value={newAdminForm.lastName}
                        onChange={(e) => setNewAdminForm({ ...newAdminForm, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>الإيميل</label>
                    <input
                      type="email"
                      value={newAdminForm.email}
                      onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>التليفون</label>
                    <input
                      type="text"
                      value={newAdminForm.phone}
                      onChange={(e) => setNewAdminForm({ ...newAdminForm, phone: e.target.value })}
                    />
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={handleAddAdmin}>
                    حفظ الحساب
                  </button>
                </div>
              )}

              <div className="card">
                <table>
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>الإيميل</th>
                      <th>التليفون</th>
                      <th>الدور</th>
                      <th>إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u) =>
                      editingUserId === u.id ? (
                        <tr key={u.id}>
                          <td style={{ display: 'flex', gap: '6px' }}>
                            <input
                              type="text"
                              value={editUserDraft.firstName}
                              onChange={(e) => setEditUserDraft({ ...editUserDraft, firstName: e.target.value })}
                              style={{ width: '80px' }}
                            />
                            <input
                              type="text"
                              value={editUserDraft.lastName}
                              onChange={(e) => setEditUserDraft({ ...editUserDraft, lastName: e.target.value })}
                              style={{ width: '80px' }}
                            />
                          </td>
                          <td>
                            <input
                              type="email"
                              value={editUserDraft.email}
                              onChange={(e) => setEditUserDraft({ ...editUserDraft, email: e.target.value })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editUserDraft.phone}
                              onChange={(e) => setEditUserDraft({ ...editUserDraft, phone: e.target.value })}
                            />
                          </td>
                          <td>
                            <select
                              value={editUserDraft.role}
                              onChange={(e) => setEditUserDraft({ ...editUserDraft, role: e.target.value })}
                            >
                              <option value="individual">مستخدم عادي</option>
                              <option value="collector">جامع مخلفات</option>
                              <option value="factory">مصنع</option>
                              <option value="admin">أدمن</option>
                            </select>
                          </td>
                          <td>
                            <button className="btn btn-primary btn-sm" onClick={() => saveEditUser(u.id)}>
                              حفظ
                            </button>
                            <button className="btn btn-outline btn-sm" onClick={() => setEditingUserId(null)} style={{ marginRight: '6px' }}>
                              إلغاء
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={u.id}>
                          <td style={{ fontWeight: '600' }}>{u.firstName} {u.lastName}</td>
                          <td>{u.email || '—'}</td>
                          <td>{u.phone || '—'}</td>
                          <td>
                            <span className="tag">{ROLE_ICON[u.role]} {u.roleLabel}</span>
                          </td>
                          <td>
                            <button className="btn btn-outline btn-sm" onClick={() => startEditUser(u)}>
                              تعديل
                            </button>
                            <button
                              className="btn btn-outline btn-sm"
                              style={{ marginRight: '6px', borderColor: 'var(--r500)', color: 'var(--r500)' }}
                              onClick={() => handleDeleteUser(u.id, `${u.firstName} ${u.lastName}`)}
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                    {allUsers.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', color: 'var(--n400)', padding: '24px' }}>
                          لسه محدش سجّل
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============ REQUESTS ============ */}
          {view === 'requests' && (
            <>
              <div className="dash-header">
                <div>
                  <div className="dash-title">كل الطلبات</div>
                  <div className="dash-sub">{requests.length} طلب في النظام</div>
                </div>
              </div>
              <div className="card">
                <table>
                  <thead>
                    <tr>
                      <th>الرقم</th>
                      <th>المواد</th>
                      <th>الوزن</th>
                      <th>العنوان</th>
                      <th>الحالة</th>
                      <th>إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((r) =>
                      editingRequestId === r.id ? (
                        <tr key={r.id}>
                          <td style={{ fontWeight: '600' }}>{r.id}</td>
                          <td>
                            <input
                              type="text"
                              value={editRequestDraft.materialsText}
                              onChange={(e) => setEditRequestDraft({ ...editRequestDraft, materialsText: e.target.value })}
                              style={{ width: '140px' }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editRequestDraft.weight}
                              onChange={(e) => setEditRequestDraft({ ...editRequestDraft, weight: e.target.value })}
                              style={{ width: '80px' }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editRequestDraft.address}
                              onChange={(e) => setEditRequestDraft({ ...editRequestDraft, address: e.target.value })}
                            />
                          </td>
                          <td>
                            <select
                              value={editRequestDraft.status}
                              onChange={(e) => setEditRequestDraft({ ...editRequestDraft, status: e.target.value })}
                            >
                              <option value="scheduled">مجدول</option>
                              <option value="in_transit">في الطريق</option>
                              <option value="completed">مكتمل</option>
                            </select>
                          </td>
                          <td>
                            <button className="btn btn-primary btn-sm" onClick={() => saveEditRequest(r.id)}>
                              حفظ
                            </button>
                            <button className="btn btn-outline btn-sm" onClick={() => setEditingRequestId(null)} style={{ marginRight: '6px' }}>
                              إلغاء
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={r.id}>
                          <td style={{ fontWeight: '600' }}>{r.id}</td>
                          <td>{r.materials.join(' + ')}</td>
                          <td>{r.weight}</td>
                          <td>{r.address}</td>
                          <td>
                            <span className={`badge ${STATUS_BADGE_ADMIN[r.status].className}`}>
                              {STATUS_BADGE_ADMIN[r.status].text}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-outline btn-sm" onClick={() => startEditRequest(r)}>
                              تعديل
                            </button>
                            <button
                              className="btn btn-outline btn-sm"
                              style={{ marginRight: '6px', borderColor: 'var(--r500)', color: 'var(--r500)' }}
                              onClick={() => handleDeleteRequest(r.id)}
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                    {requests.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', color: 'var(--n400)', padding: '24px' }}>
                          لسه مفيش طلبات
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============ INVENTORY ============ */}
          {view === 'inventory' && (
            <>
              <div className="dash-header">
                <div>
                  <div className="dash-title">المخزون</div>
                  <div className="dash-sub">{inventory.length} عنصر (متاح ومباع)</div>
                </div>
              </div>
              <div className="card">
                <table>
                  <thead>
                    <tr>
                      <th>المواد</th>
                      <th>الوزن</th>
                      <th>الجودة</th>
                      <th>السعر</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: '600' }}>{item.materials.join(' + ')}</td>
                        <td>{item.verifiedWeight}</td>
                        <td>{item.qualityGrade}</td>
                        <td>{item.totalPrice ? item.totalPrice.toFixed(2) + ' ج' : '—'}</td>
                        <td>
                          <span className={`badge ${item.status === 'available' ? 'badge-green' : 'badge-blue'}`}>
                            {item.status === 'available' ? 'متاح' : 'اتباع'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {inventory.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', color: 'var(--n400)', padding: '24px' }}>
                          لسه مفيش مخزون
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}