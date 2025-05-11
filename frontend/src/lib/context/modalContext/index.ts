import React, { createContext, useContext, useState } from 'react';
import { ModalMethods, ModalOptions, ModalProps } from '../../../types';

const ModalContext = createContext<ModalMethods | null>(null);

export const useModal = (): ModalMethods => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
  defaultOptions?: ModalOptions;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children, defaultOptions }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    props: Omit<ModalProps, 'isOpen' | 'onClose'>;
  }>({
    isOpen: false,
    props: {
      children: null,
      ...defaultOptions,
    },
  });

  const open = (props: Omit<ModalProps, 'isOpen' | 'onClose'>) => {
    setModalState({
      isOpen: true,
      props: {
        ...defaultOptions,
        ...props,
      },
    });
  };

  const close = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const toggle = () => {
    setModalState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  return (
    <ModalContext.Provider value={{ open, close, toggle }}>
      {children}
      <Modal
        isOpen={modalState.isOpen}
        onClose={close}
        {...modalState.props}
      />
    </ModalContext.Provider>
  );
};