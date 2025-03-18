import { useEffect, useRef, useState } from 'react';
import './App.css';

const ball = {
		x: 250,
		y: 250,
		radius: 10,
    dx: 2,
    dy: -2
	},
	paddleWidth = 10,
	paddleHeight = 200;

function App() {
	const [ballPosition, setBallPosition] = useState({ x: 250, y: 250 });
	const [leftPaddlePosition, setLeftPaddlePosition] = useState({
		x: 0,
		y: 0,
	});
	const [rightPaddlePosition, setRightPaddlePosition] = useState({
		x: 0,
		y: 0,
	});
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d')!;
		const leftPaddle = {
				x: 0,
				y: canvas.height / 2 - paddleHeight / 2,
				width: paddleWidth,
				height: paddleHeight,
			},
			rightPaddle = {
				x: canvas.width - paddleWidth,
				y: canvas.height / 2 - paddleHeight / 2,
				width: paddleWidth,
				height: paddleHeight,
			};
		const drawBall = () => {
			ctx.beginPath();
			ctx.arc(
        ball.x,
				ball.y,
				ball.radius,
				0,
				Math.PI * 2
			);
			ctx.fillStyle = 'white';
			ctx.fill();
			ctx.closePath();
		};

		// Draw paddles
		const drawPaddles = () => {
			ctx.fillStyle = 'white';
			ctx.fillRect(
				leftPaddlePosition.x,
				leftPaddlePosition.y,
				leftPaddle.width,
				leftPaddle.height
			);
			ctx.fillRect(
				rightPaddle.x,
				rightPaddle.y,
				rightPaddle.width,
				rightPaddle.height
			);
		};
    function withinRange(range: [number, number], target: number) {
      return target >= range[0] && target <= range[1];
    }
    function drawPlayground() {
      ctx.clearRect(0, 0, canvas?.width!, canvas?.height!);
      drawBall();
      drawPaddles();
      // now also check the position of paddles
      // calculate the left paddle range 

      // also need to calculate projectile to make bouncing more realistic
      if (withinRange([leftPaddlePosition.y, leftPaddlePosition.y + leftPaddle.height], ball.y + ball.dy) && ball.x + ball.dx <= leftPaddle.x + 10) {
        ball.dy = -ball.dy
      } else {
      }
      
      if(ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas?.height! - ball.radius) {
        ball.dy = -ball.dy;
      } 
      if(ball.x + ball.dx > canvas?.width! - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
      }
      ball.x += ball.dx
      ball.y += ball.dy
    }
    const interval = setInterval(drawPlayground, 10);

		function handleKeyDown(event: KeyboardEvent) {
			const key = event.key;
			if (key === 'ArrowUp') {
				setLeftPaddlePosition(({ x, y }) => {
          if (y === 20) return { x: x, y: 0 }
          if (y - 20 <= 0) {
            return { x: x, y: y}
          } else return { x: x, y: y - 30 }
				});
			} else if (key === 'ArrowDown') {
				setLeftPaddlePosition(({ x, y }) => {
          if( y + 20 >= canvas?.height!) {
            return { x: x, y: y}
          } else return { x: x, y: y + 30}
				});
			} else {
			}
		}
		window.addEventListener('keydown', handleKeyDown);
		return () => {
      clearInterval(interval);
			window.removeEventListener(
				'keydown',
				handleKeyDown
			);
		};
	}, [leftPaddlePosition, ballPosition]);
	return (
		<div className="App">
			<canvas
				ref={canvasRef}
				width={800}
				height={600}
				style={{
					border: '1px solid black',
					backgroundColor: 'black',
				}}
			></canvas>
		</div>
	);
}

export default App;
