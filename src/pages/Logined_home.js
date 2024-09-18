import React,{useState,useContext,useEffect} from 'react'
import '../css/Logined_home.css'
import firebase from "../api/api";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import { Auth_state } from '../App';
import {AiFillEdit,AiOutlineQrcode,AiOutlineLink,AiFillDelete} from 'react-icons/ai'
import swal from 'sweetalert';
import CardTypeChoose from '../component/CardTypeChoose';
import { Link } from 'react-router-dom';
export default function Logined_home() {
    const {user,setUser}=useContext(Auth_state)

    const [Data,set_Data]=useState([])
    const [current_card,set_current_card]=useState(false)
    const [new_card,set_new_card]=useState({})
    const [function_state,set_function_state]=useState('list')//list || crteate || edit
    const [qrcode,setQrcode]=useState(false)
    useEffect(()=>{
        if (user.user_state){
            firebase.firestore().collection('cards').where('author_uid','==',firebase.auth().currentUser.uid).orderBy('create_time','desc').onSnapshot((collectionSnapshot)=>{
                const data=collectionSnapshot.docs.map(docSnapshot=>{
                  const id=docSnapshot.id;
                  return{...docSnapshot.data(),id}
                })
                set_Data(data)
        })}
    },[])
    function Create_card(){
        firebase.firestore().collection('cards').add({...new_card,author_uid:firebase.auth().currentUser.uid,create_time:Date.now()})
        set_function_state('list')
    }
    function Update_card(){
        firebase.firestore().collection('cards').doc(current_card).update({...new_card,author_uid:firebase.auth().currentUser.uid,create_time:Date.now()})
        set_function_state('list')
    }
  return (
    <div className='Logined_home_Main_div'>
        
        
        <div className='Logined_home_function_main_div'>
            {function_state==='list'&&<div className='Logined_home_function_div'>
                {<div className='function_bar'>
                    <label>Your Christmas Card</label>
                    {<button onClick={()=>{set_function_state('create');set_new_card({...new_card,music_type:{id:1,name:"The Herald Angels Sing"},letter_type:{id:1,name:"Letter Style 1"},card_type:{id:1,name: 'Card Style 1'}})}}>新增</button>}
                </div>}
                {
                <div className='show_div'>
                    {Data.map((each,index)=>{
                        return(
                            <div key={index} className={'Card_info_main_div'}>
                                <div className='left'onClick={()=>{set_new_card(each);set_current_card(each.id);set_function_state('edit')}}>
                                <label className='title'>{each.title}</label>
                                <label className='to'>To:{each.to}</label>
                                <label className='from'>From:{each.from}</label>
                                </div>
                                <div className='right'>

                                <AiOutlineLink className='icon' onClick={()=>{
                                    try{
                                        navigator.clipboard.writeText(`https://christmas--card.web.app/Christmas_Card/?id=${each.id}`)
                                        .then(()=>{swal({title:'成功複製連接',icon:'success',text:`https://christmas--card.web.app/Christmas_Card/?id=${each.id}`})})
                                
                                    } catch (e) {swal({title:'你的瀏覽器無法複製',icon:'warning',text:`請手動複製  \n https://christmas--card.web.app/Christmas_Card/?id=${each.id}`})}
                                }}
                                />


                                <AiOutlineQrcode className='icon' onClick={()=>{setQrcode({id:`https://christmas--card.web.app/Christmas_Card/?id=${each.id}`})}}/>
                                <AiFillEdit className='icon' onClick={()=>{set_new_card(each);set_current_card(each.id);set_function_state('edit')}}/>
                                <AiFillDelete className='icon'  onClick={()=>{swal({title:'確認刪除?',buttons:true,icon:'info'}).then((v)=>{if(v){firebase.firestore().collection('cards').doc(each.id).delete().then(()=>{swal({title:"成功刪除!",icon:"success"})})}})}}/>
                                </div>
                            </div>
                        )
                    })}
                </div>}

                

            </div>}
            {function_state==='create'&&
                <div className='craete_main_div'>
                    <div className='left_div'>
                        <div className='top'>{/*{id:1,name: 'CARD 1'} {id:1,name:"Animation Style 1"}*/}
                            <CardTypeChoose  type={'card'}  defult_value={'empty'} new_card={new_card} set_new_card={set_new_card}/>
                            <CardTypeChoose  type={'letter'}  defult_value={'empty'} new_card={new_card} set_new_card={set_new_card}/>
                            <CardTypeChoose  type={'music'}  defult_value={'empty'} new_card={new_card} set_new_card={set_new_card}/>
                            {new_card&&new_card.letter_type.id&&new_card.letter_type.id&&new_card.music_type.id&&new_card.to&&
                        new_card.from&&new_card.content&&new_card.title&&<a href={`/Christmas_Card?lid=${new_card.letter_type.id}
                        &cid=${new_card.card_type.id}&mid=${new_card.music_type.id}&to=${new_card.to}
                        &from=${new_card.from}&title=${new_card.title}&content=${new_card.content}`} target='_blank'>效果預覽</a>
                        }
                        </div>
                        <div className='bottom'>
                            <button onClick={()=>{set_function_state('list');set_new_card({})}}>返回</button>
                            {new_card&&new_card.letter_type.id&&new_card.letter_type.id&&new_card.music_type.id&&new_card.to&&
                        new_card.from&&new_card.content&&new_card.title&&<button onClick={()=>{Create_card()}}>確認</button>}
                        </div>
                    </div>
                    <div className='right_div' style={{backgroundImage:`url(${require(`../Img/Cards_img/${new_card.card_type.id+1}.png`)})`}}>
                        <div className='top'>
                            <input type={'text'} style={{backgroundColor:!new_card.to&&'rgba(255, 225, 8, 0.212)'}} placeholder="To:" onChange={(e)=>{set_new_card({...new_card,to:e.target.value})}}/>
                        </div>
                        <div className='middle'>
                            <input type={'text'} style={{backgroundColor:!new_card.title&&'rgba(255, 225, 8, 0.212)'}} placeholder="Title:"  onChange={(e)=>{set_new_card({...new_card,title:e.target.value})}}/>
                            <textarea maxLength={130} style={{backgroundColor:!new_card.content&&'rgba(255, 225, 8, 0.212)'}} placeholder='Content' onChange={(e)=>{set_new_card({...new_card,content:e.target.value})}}/>
                        </div>
                        <div className='bottom'>
                            <input type={'text'} style={{backgroundColor:!new_card.from&&'rgba(255, 225, 8, 0.212)'}} placeholder="From:" onChange={(e)=>{set_new_card({...new_card,from:e.target.value})}}/>
                        </div>
                    </div>
                    
                    
                </div>}

                {function_state==='edit'&&new_card&&new_card.to!==false&&current_card!==false&&
                <div className='craete_main_div'>
                    <div className='left_div'>
                        <div className='top'>{/*{id:1,name: 'CARD 1'} {id:1,name:"Animation Style 1"}*/}
                        <CardTypeChoose  type={'card'}  defult_value={new_card.card_type} new_card={new_card} set_new_card={set_new_card}/>
                        <CardTypeChoose  type={'letter'}  defult_value={new_card.letter_type} new_card={new_card} set_new_card={set_new_card}/>
                        <CardTypeChoose  type={'music'}  defult_value={new_card.music_type} new_card={new_card} set_new_card={set_new_card}/>
                        {new_card&&new_card.letter_type.id&&new_card.letter_type.id&&new_card.music_type.id&&new_card.to&&
                        new_card.from&&new_card.content&&new_card.title&&<a href={`/Christmas_Card?lid=${new_card.letter_type.id}
                        &cid=${new_card.card_type.id}&mid=${new_card.music_type.id}&to=${new_card.to}
                        &from=${new_card.from}&title=${new_card.title}&content=${new_card.content}`} target='_blank'>效果預覽</a>
                        }
                        </div>
                        <div className='bottom'>
                            <button onClick={()=>{set_function_state('list');set_new_card({})}}>返回</button>
                            {new_card&&new_card.letter_type.id&&new_card.letter_type.id&&new_card.music_type.id&&new_card.to&&
                        new_card.from&&new_card.content&&new_card.title&&<button onClick={()=>{Update_card()}}>更新</button>}
                        </div>
                    </div>
                    <div className='right_div' style={{backgroundImage:`url(${require(`../Img/Cards_img/${new_card.card_type.id+1}.png`)})`}}>
                        <div className='top'>
                            <input type={'text'} style={{backgroundColor:!new_card.to&&'rgba(255, 225, 8, 0.212)'}} value={new_card.to} placeholder="To:" onChange={(e)=>{set_new_card({...new_card,to:e.target.value})}}/>
                        </div>
                        <div className='middle'>
                            <input type={'text'} style={{backgroundColor:!new_card.title&&'rgba(255, 225, 8, 0.212)'}} placeholder="Title:" value={new_card.title} onChange={(e)=>{set_new_card({...new_card,title:e.target.value})}}/>
                            <textarea maxLength={130} style={{backgroundColor:!new_card.content&&'rgba(255, 225, 8, 0.212)'}} placeholder='Content'value={new_card.content} onChange={(e)=>{set_new_card({...new_card,content:e.target.value})}}/>
                        </div>
                        <div className='bottom'>
                            <input type={'text'} style={{backgroundColor:!new_card.from&&'rgba(255, 225, 8, 0.212)'}} value={new_card.from} placeholder="From:" onChange={(e)=>{set_new_card({...new_card,from:e.target.value})}}/>
                        </div>
                    </div>

                    
                </div>}
        </div>
        {function_state!=='list'&&<div className='hint'>
            <h1>Christmas Card</h1>
            <h2>請打橫手機以進入編輯畫面</h2>
            <button onClick={()=>{set_function_state('list');set_new_card({})}}>返回</button>
        </div>}
        {qrcode&&<div className='qrcode_main_div'>
            <img alt={qrcode.id} id={'qrcode'}  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrcode.id}`}/>
            <div>
                <button onClick={()=>{setQrcode(false)}}>返回</button>
                <button onClick={()=>{
                    try {
                        
                        fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrcode.id}`)
                        .then(function(response) {
                            return response.blob()
                        })
                        .then(function(blob) {
                            navigator.clipboard.write([
                                new ClipboardItem({
                                    'image/png': blob
                                })
                            ]).then(()=>{swal({title:'成功複製Qrcode',icon:'success'});setQrcode(false)}).catch(()=>{
                                swal({title:'你的瀏覽器無法複製',icon:'warning',text:"請長按Qrcode並選取加至相片,以儲存Qrcode"})
                                setQrcode(false)
                            })
                        }).catch((e)=>{
                            swal({title:'你的瀏覽器無法複製',icon:'warning',text:"請長按Qrcode並選取加至相片,以儲存Qrcode"})
                        })
                    } catch (error) {
                        swal({title:'你的瀏覽器無法複製',icon:'warning',text:"請長按Qrcode並選取加至相片,以儲存Qrcode"})
                        setQrcode(false)
                    }
                }}>複製</button>
            </div>
        </div>}
    </div>
  )
}
