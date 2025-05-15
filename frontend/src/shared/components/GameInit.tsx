import { useContext } from "react";
import { GameContext } from "@/Game";
import { GameStatusEnum } from "@enums/";
import { ModalContext } from "../modal/modal.context";

export function GameInit() {
  const gameContext = useContext(GameContext);
  const modalContext = useContext(ModalContext);

  function startGame() {
    if(gameContext) {
      const { setStatus, setSocketState } = gameContext
      setSocketState(true);
      console.log('done')
      setStatus(GameStatusEnum.inProgress);
      modalContext?.closeModal();
    }
  }

  function pauseGame() {
    if(gameContext) {
      const { setStatus, setSocketState } = gameContext;
      setSocketState(false);
      setStatus(GameStatusEnum.paused)
    }
  }

  function endGame() {
    if(gameContext) {
      const { setStatus, setSocketState } = gameContext;
      setSocketState(false);
      setStatus(GameStatusEnum.end)
      setTimeout(() => setStatus(GameStatusEnum.notStarted), 1000)
    }
  }
  return (
    <div className="fixed inset-0 border items-center flex justify-center">
      <div className="flex flex-col items-center gap-4">
        <button onClick={startGame} className="text-xs bg-[#13a037] text-white cursor-pointer px-4 py-2 rounded hover:bg-[#109232]">Start game</button>
        <button className="text-xs bg-[#1351a0] hover:bg-[#114b95] text-white cursor-pointer px-4 py-2 rounded">How to play game?</button>
      </div>
    </div>
  )
}