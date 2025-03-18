package main

import (
	"fmt"
	// "log"
	"net/http"
	"fly-and-fight-server/ws"
)


func main() {
	http.HandleFunc("/ws", func (w http.ResponseWriter, r *http.Request)  {
		ws.WebsocketServer(w, r);
	})
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})
	Server();
	fmt.Println("Server started successfully");
	http.ListenAndServe(":8088", nil)
}