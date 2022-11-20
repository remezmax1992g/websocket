import React, {ChangeEvent, useState} from 'react';
import './App.css';

type UserType = {
    id: number
    name: string
    message: string
    photo: string
}

function App() {
    const [message, setMessage] = useState<string>("")
    const [users, setUsers] = useState<UserType[]>([{
        id: 1,
        name: "Max",
        message: "Hy guys",
        photo: "https://via.placeholder.com/40"
    }])
    const sendMessage = () => {
        alert(message)
    }
    const changeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    return (
        <div className="chat">
            <div className="messages">
                {users.map(user =>
                    <div key={user.id} className="message">
                        <img src={user.photo}/> <b>{user.name}</b><span>{user.message}</span>
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
