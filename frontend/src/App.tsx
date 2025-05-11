import { createContext, useEffect, useState } from "react";
import { GameStatusEnum } from "./enum";
import Pong from "./Pong"
import { GameStateComponent } from "./components";
// import { WebsocketEnum, WebsocketFactory } from "./ws";
import { ModalProvider } from "./shared/modal/modal.context";

interface GameContextInterface {
	status: GameStatusEnum;
	setStatus: React.Dispatch<React.SetStateAction<GameStatusEnum>>;
	socket?: WebSocket;
	socketConnected: boolean;
	setSocketState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameContext = createContext<GameContextInterface>({
	status: GameStatusEnum.notStarted,
	setStatus: () => {},
	socketConnected: false,
	setSocketState: () => {}
});

const socket = new WebSocket("ws://localhost:8088/ws")
export default function App() {
	const [status, setStatus] = useState<GameStatusEnum>(GameStatusEnum.notStarted),
	[socketConnected, setSocketConnected] = useState<boolean>(false);
	useEffect(() => {
		if(!socket) return;
		socket.onopen = () => {
			console.log("connection open successfully")
		}
		socket.onclose = () => {
			console.log("connection closed")
		}
		socket.onerror = (error) => {
			console.error(error, 'error')
		}

		return () => {
			// socket.close();
		}
	}, [])

	return(
		<div className="flex flex-colsetSocketConnected items-center justify-center bg-[#404040]">
			<ModalProvider>
				<GameContext.Provider value={{status: status, setStatus: setStatus, socket: socket, socketConnected: socketConnected, setSocketState: setSocketConnected}}>
					<Pong/>
				</GameContext.Provider>
			</ModalProvider>
			{/* <PongTutorial/> */}
		</div>
	)
}