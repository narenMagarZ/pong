import { useContext, useEffect, useRef, useState } from "react";
import { ball, paddle, playgroundHeight, playGroundWidth } from "./constants";
import { GameContext } from "@/Game";
import { ModalContext } from "./shared/modal/modal.context";
import { GameStatusEnum } from "./enum";

const leftPaddle = { ...paddle },
rightPaddle = { ...paddle }

function Pong() {
  const gameContext = useContext(GameContext);
  const modalContext = useContext(ModalContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [keys, setKeys] = useState<any>({});
  const requestRef = useRef<number>(null);
  // Handle key press
  useEffect(() => {
		const abortController = new AbortController();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        setKeys((prev: any) => ({ ...prev, [e.key]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        setKeys((prev: any) => ({ ...prev, [e.key]: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown, abortController);
    window.addEventListener("keyup", handleKeyUp, abortController);

    return () => {
			abortController.abort();
    };
  }, []);

  // Update target position only once per key press
  useEffect(() => {
    if (keys["ArrowUp"]) leftPaddle.targetY -= leftPaddle.speed;
    if (keys["ArrowDown"]) leftPaddle.targetY += leftPaddle.speed;

    // Prevent out-of-bounds movement
    leftPaddle.targetY = Math.max(0, Math.min(playgroundHeight - leftPaddle.height, leftPaddle.targetY));
  }, [keys]); // Only runs when keys change

  useEffect(() => {
    if(gameContext?.status === GameStatusEnum.paused  && requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      return;
    };
    const canvas = canvasRef.current;
		if(!canvas) return;
    const ctx = canvas.getContext("2d");

    function update() {
      // Lerp: Smooth movement towards target
      leftPaddle.y += (leftPaddle.targetY - leftPaddle.y) * leftPaddle.lerpFactor;
  	}

		function drawBall(){
			ctx!.beginPath();
			ctx!.arc(
			  ball.x,
				ball.y,
				ball.radius,
				0,
				Math.PI * 2
			);
			ctx!.fillStyle = 'white';
			ctx!.fill();
			ctx!.closePath();
		};

    function draw() {
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height);

			drawBall();
      ctx!.fillStyle = "white";
			ctx?.fill();
      ctx?.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
      ctx?.fillRect(canvas?.width! - rightPaddle.width, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    }
		
    function gameLoop() {
      update();
      draw();
      gameContext?.socket?.send(JSON.stringify({matchId: 1, type: "gameType", payload: {
        ball: ball,
        leftPaddle: leftPaddle,
        rightPaddle: rightPaddle,
        canvas: {
          width: canvas?.width,
          height: canvas?.height
        }
      }}));
      requestRef.current = requestAnimationFrame(gameLoop);
    }

    if(gameContext?.socketState) gameLoop();
    return () => {
    }
  }, [gameContext?.socketState]);


  useEffect(() => {
    if(gameContext) {
      const { socketState, socket } = gameContext;
      if(socket?.isConnected && socketState) {
        socket.receive((message) => {
          const { payload : { ball: newBall, leftPaddle: newLeftPaddle, rightPaddle: newRightPaddle }} = JSON.parse(message.data) as any;
          ball.x = newBall.x
          ball.y = newBall.y
          ball.dx = newBall.dx
          ball.dy = newBall.dy
          leftPaddle.x = newLeftPaddle.x
          leftPaddle.y = newLeftPaddle.y
          rightPaddle.x = newRightPaddle.x
          rightPaddle.y = newRightPaddle.y
        })
      }
    }
  }, [gameContext?.socketState])


  useEffect(() => {
		function handleKeyup(e: KeyboardEvent) {
			if(e.code.toUpperCase() === 'ESCAPE') {
        if(gameContext?.status === GameStatusEnum.inProgress) {
          modalContext?.openModal();
          gameContext.setStatus(GameStatusEnum.paused)
        } else {
          modalContext?.closeModal();
        }
			}
		}
		document.body.addEventListener("keydown", handleKeyup)
		return () => { 
			document.body.removeEventListener("keydown", handleKeyup);
		}
	}, [gameContext?.status])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <canvas ref={canvasRef} width={playGroundWidth} height={playgroundHeight} className="bg-[#1f1b1b] rounded" />;
    </div>
  )
};

export default Pong;