// hooks/useModal.ts
import { useModal as useModalContext } from '../context/ModalContext';
import { ModalOptions } from '../types/modal.types';

export const useModal = () => {
  const modal = useModalContext();

  const showModal = (content: React.ReactNode, options?: ModalOptions) => {
    modal.open({
      children: content,
      ...options,
    });
  };

  return {
    showModal,
    closeModal: modal.close,
    toggleModal: modal.toggle,
  };
};