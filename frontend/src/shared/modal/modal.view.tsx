import { JSX } from "react/jsx-runtime";
import { GameInit } from "../components";

enum ModalTypeEnum {
  "gameInit" = "gameInit",
  "gamePause" = "gamePause",
  "gameEnd" = "gameEnd"
}

interface BaseModalStrategyInterface {
  render: () => React.ReactElement;
}

abstract class BaseModalStrategy implements BaseModalStrategyInterface{
  render() { return <></> }
}

class GameInitModalStrategy extends BaseModalStrategy {
  render(): JSX.Element {
    return GameInit();
  }
}

class GameEndModalStrategy extends BaseModalStrategy {

}

class GamePauseModalStrategy extends BaseModalStrategy {

}

class ModalStrategy {
  private strategy: BaseModalStrategyInterface | undefined;

  public constructor(type: ModalTypeEnum) {
    this.setStrategy(type);
  }

  private setStrategy(type: ModalTypeEnum) {
    switch (type) {
      case ModalTypeEnum.gameInit:
        this.strategy = new GameInitModalStrategy()
        break;
      case ModalTypeEnum.gamePause:
        this.strategy = new GamePauseModalStrategy();
        break;
      case ModalTypeEnum.gameEnd:
        this.strategy = new GameEndModalStrategy();
        break;
      default:
        throw new Error("Invalid modal strategy.")
    }
  }

  public render(): React.ReactElement {
    return this.strategy?.render()!;
  }
}

interface modalProps {
  type: ModalTypeEnum;
}
export function Modal({type}: modalProps) {
  const modalStrategy = new ModalStrategy(type);
  return modalStrategy.render();
}