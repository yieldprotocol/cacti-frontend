import { ReactNode, createContext, useContext, useState } from 'react';
import { Modal } from '@/components/Modal';

export type ModalContextType = {
  modalContent: ReactNode;
  setModal: (modalContent: ReactNode) => void;
};

const initialContext = {
  modalContent: <></>,
  setModal: () => {},
};

const ModalContext = createContext<ModalContextType>(initialContext);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode>(initialContext.modalContent);
  const [isOpen, setIsOpen] = useState(false);

  const setModal = (modalContent: ReactNode) => {
    setModalContent(modalContent);
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        modalContent,
        setModal,
      }}
    >
      <Modal handleClose={() => setIsOpen(false)} openState={isOpen} modalContent={modalContent} />
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
