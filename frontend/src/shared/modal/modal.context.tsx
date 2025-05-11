import React, { createContext, ReactNode } from "react";
import { Modal } from "./modal.view";
import { ModalTypeEnum } from "../../enum";

type ModalContextType = {
  openModal: (content: ReactNode, title?: string) => void;
  closeModal: () => void;
};

interface ModalProviderProps {
  children: React.ReactNode;
  defaultOptions?: any;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
  return (
    <ModalContext value={{openModal: () => {}, closeModal: () => {}}}>
      {children}
      <Modal type={ModalTypeEnum.gameInit} />
    </ModalContext>
  )
}