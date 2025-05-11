package ws

import (
	"github.com/gorilla/websocket"
	"fly-and-fight-server/utils"
	"fly-and-fight-server/types"
)

func Game(message types.GameMessage, connections map[int]*websocket.Conn) types.GameMessage {
	ball, leftPaddle, rightPaddle, canvas := message.Payload.Ball, message.Payload.LeftPaddle, message.Payload.RightPaddle, message.Payload.Canvas;

	if ball.X + ball.Dx > canvas.Width - ball.Radius - rightPaddle.Width {
		ball.Dx = -ball.Dx;
	}

	rightPaddle.Y = ball.Y - types.PaddleDisplacement;

	ranges := []float32{leftPaddle.Y, leftPaddle.Y + leftPaddle.Height}

	if utils.WithinRange(ranges, ball.Y + ball.Dy) && ball.X + ball.Dx < leftPaddle.Width + ball.Radius {
		ball.Dy = -ball.Dy
		ball.Dx = -ball.Dx
	}

	if ball.Y + ball.Dy < ball.Radius || ball.Y + ball.Dy > canvas.Height - ball.Radius {
		ball.Dy = -ball.Dy;
	} 

	if ball.X + ball.Dx > canvas.Width - ball.Radius || ball.X + ball.Dx < ball.Radius {
		ball.Dx = -ball.Dx;
	}

	ball.X += ball.Dx
	ball.Y += ball.Dy

	var (
		gameBall types.Ball = types.Ball{ Radius: ball.Radius, X: ball.X, Y: ball.Y, Dx: ball.Dx, Dy: ball.Dy }
		gameLeftPaddle types.Paddle = types.Paddle{ X: leftPaddle.X, Y: leftPaddle.Y, Width: leftPaddle.Width, Height: leftPaddle.Height }
		gameRightPaddle types.Paddle = types.Paddle{ X: rightPaddle.X, Y: rightPaddle.Y, Width: rightPaddle.Width, Height: rightPaddle.Height }
		gameCanvas types.Canvas = types.Canvas{ Width: canvas.Width, Height: canvas.Height }
		gamePayload types.GamePayload = types.GamePayload{ Ball: gameBall, LeftPaddle: gameLeftPaddle, RightPaddle: gameRightPaddle, Canvas: gameCanvas }
		gameMessage types.GameMessage = types.GameMessage{ Payload: gamePayload, Id: 1, Type: types.GameType }
	);
	return gameMessage;
}