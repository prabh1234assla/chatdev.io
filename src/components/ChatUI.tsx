"use client";

import { FC, useEffect, useState } from "react";
import { io } from "socket.io-client";

const ChatUI: FC<{}> = ({ }) => {
    
    const socket = io(`http://localhost:${process.env.PORT_NO}`);
    console.log(process.env.NEXT_PUBLIC_PORT_NO);

    const [messages, setMessages] = useState<string[]>([]);
    const [Message, setMessage] = useState<string>("");

    useEffect(() => {

        socket.on("chat message", (message) => {

            setMessages(
                (prevMessages) =>
                    [...prevMessages, message]
            );

        });

    }, []);

    const sendMessage = () => {
        socket.emit("chat message", Message);
        setMessage("");
    }

    return (<>
        <div>
            <h1>Chatdev.io</h1>

            <div>
                {messages.map(
                    (msg, i) => (
                        <div key={i}>{msg}</div>
                    ))}
            </div>

            <input
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={sendMessage}>Send</button>
        </div>
    </>)
};

export default ChatUI;