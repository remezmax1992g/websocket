import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import './App.css';

type UserType = {
    userId: number
    userName: string
    message: string
    photo: string
}

function App() {
    let [message, setMessage] = useState<string>("")
    let [users, setUsers] = useState<UserType[]>([])
    let [ws, setWS] = useState<WebSocket | null>(null)
    let messagesBlockRef = useRef<HTMLDivElement | null>(null)
    if (ws) {
        ws.onmessage = (messageEvent) => {
            let usersData = JSON.parse(messageEvent.data)
            setUsers([...users, ...usersData])
            if(messagesBlockRef.current){
                messagesBlockRef?.current.scrollTo(0, messagesBlockRef.current.scrollHeight)
            }

        }

    }

    useEffect(() => {
        let localWS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
        setWS(localWS)
    }, [])
    const sendMessage = () => {
        if (ws) {
            ws.send(message)
            setMessage("")
        }
    }
    const changeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    return (
        <div className="app">
            <div className="chat">
                <div className="messages" ref={messagesBlockRef}>
                    {users.map((user, index) =>
                        <div key={index} className="message">
                            <img src={user.photo}/> <b>{user.userName}: </b><span>{user.message}</span>
                        </div>
                    )}
                </div>
                <div className="footer">
                    <textarea value={message} onChange={changeMessage}/>
                    <button onClick={sendMessage}>SEND MESSAGE</button>
                </div>
            </div>
        </div>
    );
}

export default App;
