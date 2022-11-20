import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';

type UserType = {
    id: number
    userName: string
    message: string
    photo: string
}

function App() {
    let [message, setMessage] = useState<string>("")
   let [users, setUsers] = useState<UserType[]>([{
        id: 1,
        userName: "Max",
        message: "Hy guys",
        photo: "https://via.placeholder.com/40"
    }])
    let[ws, setWS] = useState<WebSocket | null>(null)
    useEffect(() => {
       let localWS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
        localWS.onmessage = (messageEvent) => {
           let users = JSON.parse(messageEvent.data)
            setUsers(users)
        }
        setWS(localWS)
    },[])
    const sendMessage = () => {
        if(ws){
            ws.send(message)
        }
    }
    const changeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    return (
        <div className="chat">
            <div className="messages">
                {users.map(user =>
                    <div key={user.id} className="message">
                        <img src={user.photo}/> <b>{user.userName}: </b><span>{user.message}</span>
                    </div>
                )}
            </div>
            <div className="footer">
                <textarea value={message} onChange={changeMessage}/>
                <button onClick={sendMessage}>SEND MESSAGE</button>
            </div>
        </div>
    );
}

export default App;
