import React, { createContext, useContext, useState } from 'react';
import { roles, type Role } from '../constants/roles';

type RoleContextType = {
  role: Role | null;
  setRole: (role: Role | null) => void;
  roles: Role[];
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  return (
    <RoleContext.Provider value={{ role, setRole, roles }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within a RoleProvider');
  return context;
}
