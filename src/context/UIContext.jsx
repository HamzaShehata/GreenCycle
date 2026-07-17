import { createContext, useContext, useState } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => setMobileSidebarOpen((v) => !v);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  return (
    <UIContext.Provider value={{ mobileSidebarOpen, toggleMobileSidebar, closeMobileSidebar }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error('useUI لازم تتستخدم جوه UIProvider');
  }
  return ctx;
}