import { createContext, useContext, useState, ReactNode } from 'react';

interface WelcomeContextType {
  showWelcome: boolean;
  userName: string;
  triggerWelcome: (name: string) => void;
  closeWelcome: () => void;
}

const WelcomeContext = createContext<WelcomeContextType | undefined>(undefined);

export const useWelcome = () => {
  const context = useContext(WelcomeContext);
  if (!context) {
    throw new Error('useWelcome must be used within a WelcomeProvider');
  }
  return context;
};

interface WelcomeProviderProps {
  children: ReactNode;
}

export const WelcomeProvider = ({ children }: WelcomeProviderProps) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState('');

  const triggerWelcome = (name: string) => {
    setUserName(name);
    setShowWelcome(true);
  };

  const closeWelcome = () => {
    setShowWelcome(false);
    setUserName('');
  };

  return (
    <WelcomeContext.Provider 
      value={{ 
        showWelcome, 
        userName, 
        triggerWelcome, 
        closeWelcome 
      }}
    >
      {children}
    </WelcomeContext.Provider>
  );
};