package main

import (
	"bufio"
	"bytes"
	"encoding/binary"
	"encoding/json"
	"log"
	"os"
)

// CGO_ENABLED=0 go build -o chrome-messenger main.go

// start communicating with chrome via stdin/stdout

/*
	Linux (system-wide)
	Google Chrome: /etc/opt/chrome/native-messaging-hosts/com.my_company.my_application.json
	Chromium: /etc/chromium/native-messaging-hosts/com.my_company.my_application.json

	Linux (user-specific, default path)
	Google Chrome: ~/.config/google-chrome/NativeMessagingHosts/com.my_company.my_application.json
	Chromium: ~/.config/chromium/NativeMessagingHosts/com.my_company.my_application.json
*/

var byteOrder binary.ByteOrder = binary.NativeEndian

type Message struct {
	Text string `json:"text"`
}

func main() {
	file, err := os.OpenFile("logfile.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatal(err)
	}
	logger := log.New(file, "", log.Ldate|log.Ltime|log.Lshortfile)

	reader := bufio.NewReader(os.Stdin)

	header := make([]byte, 4)
	for b, err := reader.Read(header); b > 0 && err == nil; b, err = reader.Read(header) {
		msgLength := uint32(0)
		buf := bytes.NewBuffer(header)
		if err := binary.Read(buf, byteOrder, &msgLength); err != nil {
			logger.Fatalf("Failed to read message length: %s\n", err.Error())
		}
		data := make([]byte, msgLength)
		if _, err := reader.Read(data); err != nil {
			logger.Fatalf("Failed to read data: %s\n", err.Error())
		}

		logger.Println("recv:", string(data))

		recv := Message{}
		send := Message{}

		if err := json.Unmarshal(data, &recv); err != nil {
			logger.Fatalf("Failed to unmarshal incoming data: %s\n", err.Error())
		}

		switch recv.Text {
		case "hello":
			send.Text = "world"
		default:
			send.Text = "unknown"
		}

		sendBuf, _ := json.Marshal(send)

		logger.Println("send:", string(sendBuf))

		if err := binary.Write(os.Stdout, byteOrder, uint32(len(sendBuf))); err != nil {
			logger.Fatalf("Failed to write message length: %s\n", err.Error())
		}

		bb := bytes.Buffer{}
		if _, err := bb.Write(sendBuf); err != nil {
			logger.Fatalf("Failed to write message into temporary buffer: %s\n", err.Error())
		}
		if _, err := bb.WriteTo(os.Stdout); err != nil {
			logger.Fatalf("Failed to write message to stdout: %s\n", err.Error())
		}
	}
}
