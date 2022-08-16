import React, { useState, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './context/index';
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
/* Router */
import AppRouter from './router/AppRouter';
/* Styles */
import './styles/App.css'

function App() {
    const [isAuth, setAuth]= useState(false);
    const [users, setUsers] = useState([
        {id: 1, name: 'Admin', password: '1234'},
        {id: 2, name: 'Kemi', password: '1'},
        {id: 3, name: 'Moses', password: '1'},
        {id: 4, name: 'Dafe', password: '1'},
        {id: 5, name: 'Dele', password: '1'},
        {id: 6, name: 'Tony', password: '1'},
    ]);
    const [activeUser, setActiveUser] = useState({})
    const [chat, setChat] = useState([
        activeUser,
    ])
    const [modal, setModal] = useState(isAuth ? false : true);
    const [placeholder, setPlaceholder] = useState('Write a message...')
    const [search, setSearch] = useState('')

    const friendSearcher = useMemo(() => {
        return users.filter(user => user.name.includes(search))
    }, [search, users])

    const createUser = (newUser) => {
        setUsers([...users, newUser])
    }

    const startChatting = (receiver) => {
        if (chat.length > 1) {
            chat.splice(chat.length - 1, 1)
        }
        setChat([...chat, receiver])
    }

    console.log(chat)
    
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_API_ID,
        
    }
    
    const app = initializeApp(firebaseConfig)
    const firestore = getFirestore(app)

    console.log(`${activeUser.name} chats with ${chat.length === 2 ? chat[1].name : 'nobody :('}`)

    return (
        <AuthContext.Provider value={{
            isAuth,
            setAuth,
            app,
            firestore
        }}>
            <BrowserRouter>
                <div className='App'>
                    <AppRouter
                        isAuth={isAuth}
                        setAuth={setAuth}
                        modal={modal}
                        activeUser={activeUser}
                        setActiveUser={setActiveUser}
                        setModal={setModal}
                        users={friendSearcher}
                        placeholder={placeholder}
                        setPlaceholder={setPlaceholder}
                        createUser={createUser}
                        start={startChatting}
                        chat={chat}
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;