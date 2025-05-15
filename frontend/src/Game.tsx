import { createContext, useState } from "react";
import { GameStatusEnum } from "@enums/";
import { ModalProvider } from "./shared/modal/modal.context";
import Pong from "./Pong";
import { socket, SocketClientInterface } from "@/ws";

interface GameContextInterface {
	status: GameStatusEnum;
	setStatus: React.Dispatch<React.SetStateAction<GameStatusEnum>>;
	socket?: SocketClientInterface;
	socketState: boolean;
	setSocketState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameContext = createContext<GameContextInterface | undefined>(undefined);


export function Game() {
  const [status, setStatus] = useState<GameStatusEnum>(GameStatusEnum.notStarted),
	[socketState, setSocketState] = useState<boolean>(false);

  return (
    <GameContext.Provider value={{status: status, setStatus: setStatus, socket: socket, socketState: socketState, setSocketState: setSocketState}}>
				<ModalProvider>
					<Pong/>
				</ModalProvider>
			</GameContext.Provider>
  )
}