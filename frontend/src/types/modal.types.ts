// types/modal.types.ts
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  overlayClassName?: string;
  modalClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

export interface ModalMethods {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface ModalOptions extends Omit<ModalProps, 'isOpen' | 'onClose' | 'children'> {
  // Additional options can be added here
}