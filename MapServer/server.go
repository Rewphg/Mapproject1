package main

import (
	"fmt"
	"log"
	"net"

	"github.com/Rewphg/Mapproject1/ProtoMap/Proto"
	"google.golang.org/grpc"
)

type Server struct{}

func main() {
	fmt.Println("Run")

	lis, err := net.Listen("tcp", "0.0.0.0:50051")
	if err != nil {
		log.Fatal("Failed to listen : %v", err)
	}

	s := grpc.NewServer()
	Proto.RegisterGreetServiceServer(s, &Server{})

	if err := s.Server(lis); err != nil {
		log.Fatal("failed to serve: %v", err)
	}
}
