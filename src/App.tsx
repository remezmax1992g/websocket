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
                        <div key={index} className={user.userId !== 25436 ? "messageSubscriber" : "messageMy"}>
                            <div className={user.userId !== 25436 ? "messageBlockFriend" : "messageBlockMy"}>
                                <img src={user.photo}/>
                                <div className="messageText">
                                    <div className="name">{user.userName}</div>
                                    <pre className={user.userId !== 25436 ? "textFriend" : "textMy"}>{user.message}</pre>
                                </div><span></span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="footer">
                    <textarea className="textArea" value={message} onChange={changeMessage}/>
                    <button onClick={sendMessage}>SEND</button>
                </div>
            </div>
        </div>
    );
}

export default App;
