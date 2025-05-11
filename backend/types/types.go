package types


import "github.com/gorilla/websocket"

type Player struct{
	Id int `json:"id"`
	Socket websocket.Conn `json:"socket"`
}

type Match struct {
	Id int `json:"id"`
	Status string `json:"status"`
	Players []Player `json:"players"`
}

type MessageType string;

const (
	GameType MessageType = "gameType"
	CommonType MessageType = "commonType"
	PaddleDisplacement float32 = 10
)

type Message struct {
	Id int `json:"id"`
	Type MessageType `json:"type"`
	Payload interface{} `json:"payload"`
}

type Position struct {
	X float32 `json:"x"`
	Y float32 `json:"y"`
}

type Paddle struct {
	X float32 `json:"x"`
	Y float32 `json:"y"`
	Width float32 `json:"width"`
	Height float32 `json:"height"`
	TargetY float32 `json:"targetY"`
	Speed float32 `json:"speed"`
	LerpFactor float32 `json:"lerpFactor"`
}

type Canvas struct {
	Width float32 `json:"width"`
	Height float32 `json:"height"`
}

type Ball struct {
	Radius float32 `json:"radius"`
	X float32 `json:"x"`
	Y float32 `json:"y"`
	Dx float32 `json:"dx"`
	Dy float32 `json:"dy"`
}

type GamePayload struct {
	Ball Ball `json:"ball"`
	LeftPaddle Paddle `json:"leftPaddle"`
	RightPaddle Paddle `json:"rightPaddle"`
	Canvas Canvas `json:"canvas"`
}

type GameMessage struct {
	Id int `json:"matchId"`
	Type MessageType `json:"type"`
	Payload GamePayload `json:"payload"`
}