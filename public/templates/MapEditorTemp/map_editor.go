package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

//Reference on how to upload file response to our server for our client to interact with.
//https://astaxie.gitbooks.io/build-web-application-with-golang/content/en/04.5.html
//https://tutorialedge.net/golang/go-file-upload-tutorial/

//http.HandleFunc("/upload", upload)
//Create a function to write and read responses to our server.

func upload(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 << 50)
	file, handler, err := r.FormFile("upload")
	if err != nil {
		fmt.Println("Error occur during retriving file.")
		fmt.Println(err)
		return
	}
	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)

	// Create a temporary file to our server.

	tempFile, err := ioutil.TempFile("temp-images", "upload-*.png")
	if err != nil {
		fmt.Println(err)
	}
	defer tempFile.Close()

	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}
	tempFile.Write(fileBytes)
	fmt.Fprintf(w, "Successfully uploaded.\n")
}

func routetoServer() {
	http.HandleFunc("/upload", upload)
	http.ListenAndServe(":8080", nil)
}

func main() {
	routetoServer()
}
