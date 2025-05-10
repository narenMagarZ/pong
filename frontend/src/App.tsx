import { createContext, useEffect, useState } from "react";
import { GameStatusEnum } from "./enum";
import Pong from "./Pong"
import { GameStateComponent } from "./components";
// import { WebsocketEnum, WebsocketFactory } from "./ws";

interface GameContextInterface {
	status: GameStatusEnum;
	setStatus: React.Dispatch<React.SetStateAction<GameStatusEnum>>;
	socket?: WebSocket;
	socketConnected: boolean;
}

export const GameContext = createContext<GameContextInterface>({
	status: GameStatusEnum.notStarted,
	setStatus: () => {},
	socketConnected: false
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
		<div className="flex flex-col items-center justify-center bg-gray-500">
			<button onClick={()=>setSocketConnected(true)}>lets start</button>
			<GameContext.Provider value={{status: status, setStatus: setStatus, socket: socket, socketConnected: socketConnected}}>
				<GameStateComponent />
				<Pong/>
			</GameContext.Provider>
		</div>
	)
}