import React,{useState,createContext,useEffect} from 'react';

import firebase from "./api/api";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'


import Christmas_card from './pages/Christmas_card';
import Home from './pages/Home';
import Logined_home from './pages/Logined_home';


import { BrowserRouter,Routes,Route } from 'react-router-dom';

export const Auth_state=createContext(null)
function App() {
  const [user,setUser]=useState({user_state:false,page:window.location.pathname})
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((currentUser)=>{
      if(currentUser){
        setUser({...currentUser,page:window.location.pathname,user_state:true})
        
      }
    })
  },[])
  return (
    <BrowserRouter>
      <Auth_state.Provider value={{user,setUser}}>
        <Routes>
          {!user.user_state&&<Route path='/' element={<Home/>} />}
          {user.user_state&&<Route path='/' element={<Logined_home/>} />}
          {<Route path='Christmas_Card' element={<Christmas_card/>}/>}
        </Routes>
      </Auth_state.Provider>
    </BrowserRouter>
  );
}

export default App;