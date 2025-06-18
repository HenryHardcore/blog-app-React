import { createContext, useContext, useState } from 'react';

const VijestContext = createContext();

export function VijestProvider({ children }) {
  const [vijest, setVijest] = useState('General');

  return (
    <VijestContext.Provider value={{ vijest, setVijest }}>
      {children}
    </VijestContext.Provider>
  );
}

export function useVijest() {
  return useContext(VijestContext);
}