import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const ROLE_LABELS = {
  individual: 'مستخدم عادي',
  collector: 'جامع مخلفات',
  factory: 'مصنع',
  admin: 'أدمن',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const login = ({ firstName, lastName, email, phone, role }) => {
    setUser({
      firstName: firstName || 'مستخدم',
      lastName: lastName || '',
      email: email || '',
      phone: phone || '',
      role: role || 'individual',
      roleLabel: ROLE_LABELS[role] || 'مستخدم عادي',
    });
  };

  const registerUser = (data) => {
    const newUser = {
      id: `user-${Date.now()}`,
      firstName: data.firstName || 'مستخدم',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      role: data.role || 'individual',
      roleLabel: ROLE_LABELS[data.role] || 'مستخدم عادي',
      joinedDate: 'النهاردة',
    };
    setAllUsers((prev) => [newUser, ...prev]);
    setUser(newUser);
    return newUser;
  };

  const addUserByAdmin = (data) => {
    const newUser = {
      id: `user-${Date.now()}`,
      firstName: data.firstName || 'مستخدم',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      role: data.role || 'individual',
      roleLabel: ROLE_LABELS[data.role] || 'مستخدم عادي',
      joinedDate: 'النهاردة',
    };
    setAllUsers((prev) => [newUser, ...prev]);
    return newUser;
  };

  const updateUserByAdmin = (id, updates) => {
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, ...updates, roleLabel: ROLE_LABELS[updates.role || u.role] || u.roleLabel }
          : u
      )
    );
  };

  const deleteUserByAdmin = (id) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const updateProfile = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        allUsers,
        isLoggedIn,
        login,
        registerUser,
        addUserByAdmin,
        updateUserByAdmin,
        deleteUserByAdmin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth لازم تتستخدم جوه AuthProvider');
  }
  return ctx;
}