import { GameStatusEnum } from "./enum";
import Pong from "./Pong"
import { createContext } from "react";

interface GameContextInterface {
	status: GameStatusEnum;
	setStatus: React.Dispatch<React.SetStateAction<GameStatusEnum>>
}
export const GameContext = createContext<GameContextInterface>({
	status: GameStatusEnum.notStarted,
	setStatus: () => {}
});

export default function App() {
	return(
		<div className="flex flex-col items-center justify-center bg-gray-500">
			<GameContext.Provider value={{status: GameStatusEnum.notStarted, setStatus: () => {}}}>
			<Pong/>
			</GameContext.Provider>
		</div>
	)
}