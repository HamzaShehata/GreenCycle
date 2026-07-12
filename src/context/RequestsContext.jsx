import { createContext, useContext, useState } from 'react';

const RequestsContext = createContext(null);

const STATUS_BADGE = {
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

export function RequestsProvider({ children }) {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  // دلوقتي بنضيف الطلب محلي (في الذاكرة بس). بعد الباك اند، هنا بالظبط
  // هنحط استدعاء API (fetch/axios) يبعت الطلب للسيرفر ويرجع بالـ id الحقيقي.
  const addRequest = (data) => {
    const nextNumber = 892 + requests.length; // ترقيم تلقائي بسيط للطلبات الجديدة
    const newRequest = {
      id: `#REQ-0${nextNumber}`,
      materials: data.materials,
      date: 'النهاردة',
      weight: `${data.weight} كجم`,
      status: 'scheduled',
      reward: 'قيد الانتظار',
      timeline: [
        { title: 'الطلب اتبعت', time: 'دلوقتي', state: 'done', icon: '✓' },
        { title: 'اتحدد جامع المخلفات', time: 'لسه', state: 'pending', icon: '◯' },
        { title: 'استلام ووزن', time: 'لسه', state: 'pending', icon: '◯' },
        { title: 'وصل للمصنع', time: 'لسه', state: 'pending', icon: '◯' },
        { title: 'المكافأة اتضافت', time: 'لسه', state: 'pending', icon: '◯' },
      ],
    };
    setRequests((prev) => [newRequest, ...prev]);
    return newRequest;
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest, STATUS_BADGE }}>
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