import { useContext } from "react";
import { GameContext } from "../../App";
import { GameStatusEnum } from "../../enum";
import { ModalContext } from "../modal/modal.context";

export function GameInit() {
  const {status, setStatus, socketConnected, setSocketState} = useContext(GameContext);
  const modalContext = useContext(ModalContext);

  function startGame() {
    setSocketState(true);
    setStatus(GameStatusEnum.inProgress);
    modalContext?.closeModal();
  }

  function pauseGame() {
    setStatus(GameStatusEnum.paused)
  }

  function endGame() {
    setStatus(GameStatusEnum.end)
    setTimeout(() => setStatus(GameStatusEnum.notStarted), 1000)
  }
  return (
    <div className="fixed inset-0 border items-center flex justify-center">
      <div className="flex flex-col items-center gap-4">
        <button onClick={startGame} className="text-xs bg-[#13a037] text-white cursor-pointer px-4 py-2 rounded">Start game</button>
        <button className="text-xs bg-[#1351a0] text-white cursor-pointer px-4 py-2 rounded">How to play game?</button>
      </div>
    </div>
  )
}