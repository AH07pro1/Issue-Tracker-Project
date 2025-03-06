'use client';
import { createContext, useContext, useState } from 'react';

interface IssueCounts {
  open: number;
  closed: number;
  inProgress: number;
}

interface AppContextType {
  issueCounts: IssueCounts;
  setIssueCounts: (counts: IssueCounts) => void;
}

const applicationContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [issueCounts, setIssueCounts] = useState<IssueCounts>({
    open: 0,
    closed: 0,
    inProgress: 0,
  });

  return (
    <applicationContext.Provider value={{ issueCounts, setIssueCounts }}>
      {children}
    </applicationContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(applicationContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
}
