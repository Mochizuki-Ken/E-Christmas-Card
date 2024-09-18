import React from 'react'
import '../css/Home.css'
import firebase from "../api/api";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
export default function Home() {
    function google(){
        const google_provider=new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(google_provider)
    }
  return (
    <div className='Home_Main_div'>
        <div className='Home_div'>
            <div className='title_div'>
                <label>CREATE YOUR</label>
                <h1>CHRISTMAS CARD</h1>
            </div>
            <div className='start_div'>
                <button onClick={()=>{google()}}>START</button>
                <label>https://christmas--card.web.app</label>
            </div>
        </div>
    </div>
  )
}
