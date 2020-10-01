package main

import (
	"fmt"
	"net/http"
	"text/template"
	"time"
)

type Page struct {
	Name string
	Time string
}

func main() {
	welcome := Page{"User 1", time.Now().Format(time.Stamp)}

	templates := template.Must(template.ParseFiles("Template/template.html"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if name := r.FormValue("name"); name != "" {
			welcome.Name = name
		}

		if err := templates.ExecuteTemplate(w, "template.html", welcome); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})
	fmt.Println("Sever Is runing at port 8080")
	fmt.Println(http.ListenAndServe(":8080", nil))
}
