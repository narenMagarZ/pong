import React, { createContext, ReactNode, useState } from "react";
import { Modal } from "./modal.view";
import { ModalTypeEnum } from "../../enum";

type ModalContextType = {
  openModal: () => void;
  closeModal: () => void;
};

interface ModalProviderProps {
  children: React.ReactNode;
  defaultOptions?: any;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
  const [modal, setModal] = useState<boolean>(true);
  const openModal = () => {
    setModal(true);
  }
  const closeModal = () => {
    setModal(false);
  }
  return (
    <ModalContext value={{ openModal: openModal, closeModal: closeModal }}>
      {children}
      {
        modal && <Modal type={ModalTypeEnum.gameInit}  />
      }
    </ModalContext>
  )
}