package ws

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// first players connected to game
// match making by server
// this can be done by specific alogrithm based on the history of user/player

// position of ball is calculate at the server, then broadcast to the both player

// syntax to create map in go
// make(map[key-type]value-type)

type Player struct{
	Id int `json:"id"`
	Socket websocket.Conn `json:"socket"`
}

type Match struct {
	Id int `json:"id"`
	Status string `json:"status"`
	Players []Player `json:"players"`
}

var (
	players = make(map[int]*websocket.Conn)
	clientCounter = 0
	matches = make(map[int]Match)
);


func ReadClientMessage(clientId int) {

}

func BroadcastBallPosition(matchId int) {
	match := matches[matchId]
	fmt.Println(match);
	if match.Status != "end" {
		// iterate over each player
		for _, player := range match.Players {
			data, err := json.Marshal("")
			if err != nil {
				// throw error;
			}
			player.Socket.WriteMessage(websocket.TextMessage, data);
		}
	}
}

func WriteClientMessage(clientId int, message string) {
	client := players[clientId];
	client.WriteMessage(websocket.TextMessage, []byte(message));
}

func WebsocketServer(w http.ResponseWriter, r *http.Request) {
	var upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true;
		},
		ReadBufferSize: 1024,
		WriteBufferSize: 1024,
	}
	conn, err := upgrader.Upgrade(w, r, nil);
	if err != nil {
		log.Fatal("Upgrade error.", err);
		return;
	}

	fmt.Println("client connected", r.RemoteAddr);
	players[clientCounter] = conn;
	clientCounter += 1;
	_, msg, err := conn.ReadMessage();
	if err != nil {
		log.Fatal("Read error.", err);
		return;
	}
	fmt.Println(string(msg), "message received successfully");
}