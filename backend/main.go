package main

import (
	"fmt"
	// "log"
	"net/http"
	"fly-and-fight-server/ws"
	"github.com/rs/cors"
)


func main() {

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
	});
	mux := http.NewServeMux();
	mux.HandleFunc("/ws", func (w http.ResponseWriter, r *http.Request)  {
		ws.WebsocketServer(w, r);
	})
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})
	handler := cors.Handler(mux);
	fmt.Println("Server started successfully");
	http.ListenAndServe(":8088", handler);
}