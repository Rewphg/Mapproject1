package main

import (
	"context"
	"fmt"
	"log"

	"github.com/Rewphg/Mapproject1/ProtoMap/Proto"
	"google.golang.org/grpc"
)

func main() {
	fmt.Println("Hello Clients")
	cc, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatal("Could Not connect: %v", err)
	}

	defer cc.Close()

	c := Proto.NewMapServiceClient(cc)
	// fmt.Printf("Created client: %f", c)
	doUnary(c)
}

func doUnary(c Proto.MapServiceClient) {
	req := &Proto.MapRequest{
		Greeting: &Proto.Greeting{
			FistName: "Rew",
			LastName: "AAA",
		},
	}

	res, err := c.Map(context.Background(), req)
	if err != nil {
		log.Fatalf("error while calling Map RPC: %v ", err)
	}
	log.Printf("Response From Map %v", res.Result)
}
