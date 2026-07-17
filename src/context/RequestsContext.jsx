import { createContext, useContext, useState } from 'react';

const RequestsContext = createContext(null);



// ⚠️ نفس أسعار الكيلو المستخدمة في صفحة "طلب جديد" — لما يتعمل الباك اند هتيجي من مكان واحد مشترك
const MATERIAL_PRICES = {
  'بلاستيك': 3,
  'ورق': 2,
  'معدن': 8,
  'زجاج': 1.5,
  'إلكترونيات': 12,
};

function calcAveragePrice(materials) {
  const prices = materials.map((m) => MATERIAL_PRICES[m] || 2);
  return prices.reduce((a, b) => a + b, 0) / prices.length;
}

export const STATUS_BADGE = {
  completed: { text: '✓ مكتمل', className: 'badge-green' },
  in_transit: { text: '🚚 في الطريق', className: 'badge-blue' },
  scheduled: { text: '⏳ مجدول', className: 'badge-amber' },
};


const INITIAL_REQUESTS = [
  {
    id: '#REQ-0891',
    materials: ['بلاستيك', 'ورق'],
    date: '22 يونيو 2025',
    weight: '10 كجم',
    status: 'completed',
    reward: '+340 نقطة',
    address: 'شارع النصر',
    lat: 27.2579,
    lng: 33.8116,
    photo: null,
    timeline: [
      { title: 'الطلب اتبعت', time: '22 يونيو · 9:00 ص', state: 'done', icon: '✓' },
      { title: 'اتحدد جامع المخلفات', time: '22 يونيو · 9:20 ص · عمر خليل', state: 'done', icon: '✓' },
      { title: 'استلام ووزن', time: '22 يونيو · 10:15 ص', state: 'done', icon: '✓' },
      { title: 'وصل للمصنع', time: '22 يونيو · 12:00 م', state: 'done', icon: '✓' },
      { title: 'المكافأة اتضافت', time: '22 يونيو · 12:30 م', state: 'done', icon: '✓' },
    ],
  },
  {
    id: '#REQ-0890',
    materials: ['معدن'],
    date: '19 يونيو 2025',
    weight: '8 كجم',
    status: 'in_transit',
    reward: 'قيد الانتظار',
    address: 'شارع الممشى',
    lat: 27.2461,
    lng: 33.8129,
    photo: null,
    timeline: [
      { title: 'الطلب اتبعت', time: '19 يونيو · 9:30 ص', state: 'done', icon: '✓' },
      { title: 'اتحدد جامع المخلفات', time: '19 يونيو · 9:45 ص · عمر خليل', state: 'done', icon: '✓' },
      { title: 'جامع المخلفات في الطريق', time: '19 يونيو · 11:00 ص · وصول متوقع 15 دقيقة', state: 'active', icon: '🚚' },
      { title: 'استلام ووزن', time: 'لسه', state: 'pending', icon: '◯' },
      { title: 'وصل للمصنع', time: 'لسه', state: 'pending', icon: '◯' },
      { title: 'المكافأة اتضافت', time: 'لسه', state: 'pending', icon: '◯' },
    ],
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    icon: '💰',
    title: 'اتضافلك نقاط',
    desc: 'اتضاف 340 نقطة لمحفظتك بعد استلام طلب #REQ-0891',
    time: 'إمبارح',
    unread: false,
  },
];

function buildTimeline(status) {
  if (status === 'in_transit') {
    return [
      { title: 'الطلب اتبعت', time: 'دلوقتي', state: 'done', icon: '✓' },
      { title: 'اتحدد جامع المخلفات وفي الطريق', time: 'دلوقتي', state: 'active', icon: '🚚' },
      { title: 'استلام ووزن', time: 'لسه', state: 'pending', icon: '◯' },
      { title: 'المكافأة اتضافت', time: 'لسه', state: 'pending', icon: '◯' },
    ];
  }
  if (status === 'completed') {
    return [
      { title: 'الطلب اتبعت', time: 'دلوقتي', state: 'done', icon: '✓' },
      { title: 'اتحدد جامع المخلفات وفي الطريق', time: 'دلوقتي', state: 'done', icon: '✓' },
      { title: 'استلام ووزن', time: 'دلوقتي', state: 'done', icon: '✓' },
      { title: 'المكافأة اتضافت', time: 'دلوقتي', state: 'done', icon: '✓' },
    ];
  }
  return [
    { title: 'الطلب اتبعت', time: 'دلوقتي', state: 'done', icon: '✓' },
    { title: 'اتحدد جامع المخلفات', time: 'لسه', state: 'pending', icon: '◯' },
    { title: 'استلام ووزن', time: 'لسه', state: 'pending', icon: '◯' },
    { title: 'المكافأة اتضافت', time: 'لسه', state: 'pending', icon: '◯' },
  ];
}

export function RequestsProvider({ children }) {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [inventory, setInventory] = useState([]);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const addNotification = ({ icon, title, desc }) => {
    setNotifications((prev) => [
      { id: `n-${Date.now()}`, icon, title, desc, time: 'دلوقتي', unread: true },
      ...prev,
    ]);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const addRequest = (data) => {
    const nextNumber = 892 + requests.length;
    const newRequest = {
      id: `#REQ-0${nextNumber}`,
      materials: data.materials,
      date: 'النهاردة',
      weight: `${data.weight} كجم`,
      status: 'scheduled',
      reward: 'قيد الانتظار',
      address: data.address || 'عنوان غير محدد',
      lat: data.lat ?? 27.2579,
      lng: data.lng ?? 33.8116,
      photo: data.photo || null,
      timeline: buildTimeline('scheduled'),
    };
    setRequests((prev) => [newRequest, ...prev]);
    return newRequest;
  };

  const acceptRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'in_transit', timeline: buildTimeline('in_transit') } : r))
    );
    addNotification({
      icon: '🚚',
      title: 'جامع مخلفات قبل طلبك',
      desc: `طلب ${id} في الطريق دلوقتي، هيوصل قريب`,
    });
  };

  const verifyAndComplete = (id, { actualWeight, qualityGrade }) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;

    const rewardPoints = Math.round(Number(actualWeight) * 25);
    const pricePerKg = calcAveragePrice(req.materials);
    const totalPrice = pricePerKg * Number(actualWeight);

    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'completed',
              reward: `+${rewardPoints} نقطة`,
              timeline: buildTimeline('completed'),
            }
          : r
      )
    );

    setInventory((prev) => [
      {
        id: `${id}-INV`,
        sourceRequestId: id,
        materials: req.materials,
        verifiedWeightNum: Number(actualWeight),
        verifiedWeight: `${actualWeight} كجم`,
        qualityGrade,
        photo: req.photo,
        dateVerified: 'النهاردة',
        pricePerKg,
        totalPrice,
        status: 'available',
      },
      ...prev,
    ]);

    addNotification({
      icon: '✅',
      title: 'تم استلام طلبك بنجاح',
      desc: `طلب ${id} اتوزن (${actualWeight} كجم) واتضافلك ${rewardPoints} نقطة`,
    });
  };

  const purchaseInventoryItem = (id) => {
    setInventory((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'sold' } : item)));
  };
  // الأدمن بيعدّل بيانات طلب (نوع المواد، الوزن، العنوان، الحالة)
  const updateRequestByAdmin = (id, updates) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  // الأدمن بيحذف طلب بالكامل من النظام
  const deleteRequestByAdmin = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RequestsContext.Provider
      value={{
        requests,
        inventory,
        notifications,
        unreadCount,
        addRequest,
        acceptRequest,
        verifyAndComplete,
        purchaseInventoryItem,
        markAllNotificationsRead,
        updateRequestByAdmin,
        deleteRequestByAdmin,
        STATUS_BADGE,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const ctx = useContext(RequestsContext);
  if (!ctx) {
    throw new Error('useRequests لازم تتستخدم جوه RequestsProvider');
  }
  return ctx;
}