package main

import (
	"encoding/json"
	"fly-and-fight-server/utils"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

type User struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Email string `json:"email"`
	PhoneNumber string `json:"phoneNumber"`
}

type Response struct {
	Message string `json:"message"`
	Success bool `json:"success"`
	Data interface{} `json:"data"`
}

var (
		users []User; 
		idCounter = 0
	);

func handler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html");
}

func CreateUser(w http.ResponseWriter, r *http.Request){
	var user User
	err := json.NewDecoder(r.Body).Decode(&user);
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest);
		return ;
	}
	idCounter += 1;
	user.Id = idCounter;
	users = append(users, user)
	w.WriteHeader(http.StatusCreated);
	json.NewEncoder(w).Encode(user);
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query();
	userId := queryParams.Get("id");
	for _, value := range users {
		if string(value.Id) == userId {
			w.WriteHeader(http.StatusAccepted);
			json.NewEncoder(w).Encode(value);
		}
	}
	w.WriteHeader(http.StatusNoContent);
	json.NewEncoder(w).Encode(User{});
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query();
	id, err := strconv.Atoi(queryParams.Get("id"))
	if err != nil {
		http.Error(w, "Invalid id", http.StatusBadRequest);
		return;
	}
	compareFunc := func (a User, b int) bool {
		return a.Id == b
	}
	index := utils.FindIndex(users, id, compareFunc);
	if index == -1 {
		w.WriteHeader(http.StatusNotFound);
		json.NewEncoder(w).Encode(Response{ Message: "User not found", Success: false, Data: nil });
	} else {
		users = append(users[:index], users[index+1:]...)
		w.WriteHeader(http.StatusOK);
		json.NewEncoder(w).Encode(Response{ Message: "User deleted successfully", Success: true, Data: users[index]})
	}
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query();
	id, err := strconv.Atoi(queryParams.Get("id"));
	if err != nil {
		http.Error(w, "Invalid id", http.StatusBadRequest);
		return;
	}
	var user User;
	err = json.NewDecoder(r.Body).Decode(&user);
	if err != nil {
		http.Error(w, "Failed to process", http.StatusInternalServerError);
		return;
	}
	compareFunc := func (a User, b int) bool {
		return a.Id == b
	}
	index := utils.FindIndex(users, id, compareFunc);
	if index == -1 {
		w.WriteHeader(http.StatusNotFound);
		json.NewEncoder(w).Encode(Response{Message: "User not found", Success: false, Data: nil});
	} else {
		users[index] = User{ Id: users[index].Id, Name: user.Name, Email: user.Email, PhoneNumber: user.PhoneNumber }
		w.WriteHeader(http.StatusOK);
		json.NewEncoder(w).Encode(Response{Message: "User updated successfully", Success: true, Data: user})
	}
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		GetUser(w, r);
	case http.MethodPost:
		CreateUser(w, r);
	case http.MethodDelete:
		DeleteUser(w, r);
	case http.MethodPut:
		UpdateUser(w, r);
	default:
		log.Fatal("invalid request uri");
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed);
	}
}

func Server() {
	http.HandleFunc("/api/v1/user", UserHandler);
	http.HandleFunc("/api/v1/users", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusAccepted);
		json.NewEncoder(w).Encode(users);
	});
	fmt.Println("Server is running on http://localhost:8088")
}

// func PlayWithTime() {
// 	currentTime := time.Now();
// 	fmt.Println(currentTime);
// 	fmt.Println(currentTime.Year());
// 	fmt.Println(currentTime.Month());
// 	fmt.Println(currentTime.Date());
// 	fmt.Println(currentTime.Day());
// 	fmt.Println(currentTime.Hour());
// 	fmt.Println(currentTime.Minute());
// 	fmt.Println(currentTime.Second());



// 	fmt.Println(currentTime.Format("Mon Jan 2 15:04:05 2006 MST"))
// 	fmt.Println(currentTime.Format("Mon Jan 2 15:04:05"))
// 	fmt.Println(currentTime.Format("2006/01/02"))
// 	fmt.Println(currentTime.Format("3:04PM"))
// 	fmt.Println(currentTime.Format("15:04PM"))

// 	fmt.Println(currentTime.Local());
// 	fmt.Println(currentTime.UTC())
// }

