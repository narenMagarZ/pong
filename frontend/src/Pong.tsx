import { useEffect, useRef, useState } from "react";
import { Utils } from "./utils";
import { ball, paddle } from "./constants";

const leftPaddle = { ...paddle },
rightPaddle = { ...paddle }


function Pong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [keys, setKeys] = useState<any>({}); // Track key states

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
    leftPaddle.targetY = Math.max(0, Math.min(400 - leftPaddle.height, leftPaddle.targetY));
  }, [keys]); // Only runs when keys change

  useEffect(() => {
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
			if(ball.x + ball.dx > canvas?.width! - ball.radius - rightPaddle.width) {
				ball.dx = -ball.dx;
			}

			rightPaddle.y = ball.y - 10;

			if (Utils.withinRange([leftPaddle.y, leftPaddle.y + leftPaddle.height], ball.y + ball.dy) && ball.x + ball.dx < leftPaddle.width + ball.radius ) {
				ball.dy = -ball.dy
				ball.dx = -ball.dx
			}

			if(ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas?.height! - ball.radius) {
				ball.dy = -ball.dy;
			} 

			if(ball.x + ball.dx > canvas?.width! - ball.radius || ball.x + ball.dx < ball.radius) {
				ball.dx = -ball.dx;
			}

			ball.x += ball.dx
			ball.y += ball.dy
      ctx!.fillStyle = "white";
			ctx?.fill();
      ctx?.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
      ctx?.fillRect(canvas?.width! - rightPaddle.width, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    }
		
    function gameLoop() {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    }

    gameLoop();
  }, []);

  return <canvas ref={canvasRef} width={800} height={400} style={{ background: "black" }} />;
};

export default Pong;