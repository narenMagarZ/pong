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
)

type Message struct {
	Id int `json:"id"`
	Type MessageType `json:"type"`
	Payload interface{} `json:"payload"`
}

type Position struct {
	X int `json:"x"`
	Y int `json:"y"`
}

type Paddle struct {
	X int `json:"x"`
	Y int `json:"y"`
	Width int `json:"width"`
	Height int `json:"height"`
}

type Canvas struct {
	Width int `json:"width"`
	Height int `json:"height"`
}

type Ball struct {
	Radius int `json:"radius"`
	X int `json:"x"`
	Y int `json:"y"`
	Dx int `json:"dx"`
	Dy int `json:"dy"`
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