package ws

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"github.com/gorilla/websocket"
	"fly-and-fight-server/types"
)



var (
	players = make(map[int]*websocket.Conn)
	clientCounter = 0
	matches = make(map[int]types.Match)
);

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



func WebsocketServer(w http.ResponseWriter, r *http.Request) {
	var upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			allowedOrigins := map[string]bool{
				"http://localhost:5173": true,
				"http://localhost:8088": true,
			}
			return allowedOrigins[r.Header.Get("Origin")]
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
	// players[clientCounter] = conn;
	// clientCounter += 1;
	for {
		// differentiate msg
		// whether it is player movement msg or any other
		_, msg, err := conn.ReadMessage();
		if err != nil {
			if websocket.IsCloseError(err, websocket.CloseNormalClosure, websocket.CloseGoingAway) {
				fmt.Println("Client disconnected gracefully")
			} else {
				fmt.Println("Read error:", err)
			}
		}
		var gameMessage types.GameMessage;
		err = json.Unmarshal(msg, &gameMessage);
		if err != nil {
			log.Println("Unmarshal error:", err);
			continue;
		}

		switch(gameMessage.Type) {
			case types.GameType:
				gameMessage = Game(gameMessage, players);
			case types.CommonType:
				return;
			default:
				return;
		}

		// Marshal the response into a JSON string
		responseBytes, err := json.Marshal(gameMessage)
		if err != nil {
			log.Println("Marshal error:", err)
			continue
		}

		// Send the JSON string back to the client
		err = conn.WriteMessage(websocket.TextMessage, responseBytes)
		if err != nil {
			log.Println("Write error:", err)
			break
		}
	}
}