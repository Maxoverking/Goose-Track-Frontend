import { useState } from 'react';
export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const toggle = () => setIsOpen(isOpen => !isOpen);

  return { isOpen, onOpen, onClose, toggle };
};
  

