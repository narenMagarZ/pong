import { useContext } from "react"
import { GameStatusEnum } from "../enum"
import { Button } from "./Button"
import { GameContext } from "../App";

export function GameStateComponent() {
  const {status, setStatus} = useContext(GameContext)
  function startGame() {
    setStatus(GameStatusEnum.inProgress)
  }

  function pauseGame() {
    setStatus(GameStatusEnum.paused)
  }

  function endGame() {
    setStatus(GameStatusEnum.end)
    setTimeout(() => setStatus(GameStatusEnum.notStarted), 1000)
  }

  return (
    <div className="flex  flex-col gap-2">
      <Button handler={startGame} title="Start a Game" cls="bg-green-700 text-white p-2 rounded-xl cursor-pointer text-sm" />
      <Button handler={pauseGame} title="Pause Game" cls="bg-blue-700 text-white p-2 rounded-xl cursor-pointer text-sm" /> 
      <Button handler={endGame} title="End Game" cls="bg-red-700 text-white p-2 rounded-xl cursor-pointer text-sm" />
    </div>
  )
}