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

const SovaContext = createContext();

export function SovaProvider({ children }) {
  const [sova, setSova] = useState(['MyBlogs', 0]);

  return (
    <SovaContext.Provider value={{ sova, setSova }}>
      {children}
    </SovaContext.Provider>
  );
}

export function useSova() {
  return useContext(SovaContext);
}

const EditBlogContext = createContext();

export const EditBlogProvider = ({ children }) => {
  const [blogToEdit, setBlogToEdit] = useState(null);

  return (
    <EditBlogContext.Provider value={{ blogToEdit, setBlogToEdit }}>
      {children}
    </EditBlogContext.Provider>
  );
};

export const useEditBlog = () => useContext(EditBlogContext);