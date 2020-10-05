package main

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/Rewphg/Mapproject1/ProtoMap/Proto"
	"google.golang.org/grpc"
)

type server struct{}

func (*server) Map(ctx context.Context, req *Proto.MapRequest) (*Proto.MapResponse, error) {
	fmt.Printf("Greet function was invoked with %v:", req)
	firstname := req.GetGreeting().GetFistName()
	result := "Hello " + firstname
	res := &Proto.MapResponse{
		Result: result,
	}
	return res, nil
}

// func (*server) Sum(ctx context.Context, req *Proto.SumRequest) (*Proto.SumResponse, error) {
// 	fmt.Printf("Sum Function is created with %v", req)
// 	Num1 := req.GetNum1()
// 	Num2 := req.GetNum2()
// 	Result := Num1 + Num2
// 	res := &Proto.SumResponse{
// 		Sum_Result: Result,
// 	}
// 	return res, nil
// }

func main() {
	fmt.Println("Run")

	lis, err := net.Listen("tcp", "0.0.0.0:50051")
	if err != nil {
		log.Fatal("Failed to listen : %v", err)
	}

	s := grpc.NewServer()
	Proto.RegisterMapServiceServer(s, &server{})

	if err := s.Serve(lis); err != nil {
		log.Fatal("failed to serve: %v", err)
	}

	// Proto.RegisterSumServiceServer(s, &server{})
	// if err := s.Serve(lis); err != nil {
	// 	log.Fatal("failed to serve: %v", err)
	// }
}
