import React,{useState,useEffect} from 'react'
import'../css/Christmas_card.css'
import { useSearchParams } from 'react-router-dom'
import firebase from "../api/api";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import { useNavigate } from 'react-router-dom';
export default function Christmas_card() {

  const [searchParams,setSearchParams]=useSearchParams();

  const [scrolled,set_scrolled]=useState(0)

  const [data,setData]=useState({})

  const [bell_clicked,set_bell_clicked]=useState(false)
  const [ps_clicked,set_ps_clicked]=useState(false)
  const [lt_clicked,set_lt_clicked]=useState(false)
  const [cd_clicked,set_cd_clicked]=useState(false)
  const navigate=useNavigate()
  function isChrome() {
    return agentHas("CriOS") || agentHas("Chrome") || !!window.chrome;
  }
  function agentHas(keyword) {
    return navigator.userAgent.toLowerCase().search(keyword.toLowerCase()) > -1;
}
  useEffect(()=>{
    if (searchParams.get('id')){
      firebase.firestore().collection('cards').doc(searchParams.get('id')).get().then((data)=>{
        setData(data.data())
        firebase.firestore().collection('cards').doc(searchParams.get('id')).update({...data.data(),views:firebase.firestore.FieldValue.increment(1)})
      })
      
    }
    
  },[])
  function play(){
    if (searchParams.get('mid')){
      var audio = new Audio(require(`../Img/Musics/${searchParams.get('mid')}.mp3`));
    }else if(data.music_type){
      var audio = new Audio(require(`../Img/Musics/${data.music_type.id}.mp3`));
    }
    
    if (searchParams.get('mid')==='3'){
      audio.playbackRate=2.1
    }else if(searchParams.get('mid')==='2'){
      audio.playbackRate=1.2
    }else if(searchParams.get('mid')==='1'){
      audio.playbackRate=1.3
    }else if(searchParams.get('mid')==='4'){
      audio.playbackRate=1.6
    }
    var audio2 = new Audio(require(`../Img/ring_sound.mp3`));
    audio2.playbackRate=0.6
    audio2.play()
    
    audio.play();
  }

  if (!searchParams.get('id')){//cid,lid,mid,to,from,content,title
    return (
      <div className='Christmas_card_Main_div' id='mainn'>
        {/* <iframe src={require(`../Img/Musics/${searchParams.get('mid')}.mp3`)} allow="autoplay" style="display:none" id="iframeAudio">
        </iframe>  */}
        {!bell_clicked&&<img alt='img' className='bell_img' onClick={()=>{set_bell_clicked(true);play()}} src={require('../Img/bell.png')}/>}
        
        {!bell_clicked&&<label className='click_me_text' >點我-叫聖誕老人來</label>}
        
        {!ps_clicked&&bell_clicked&&<img alt='img' className='santa_img' onClick={()=>{set_ps_clicked(true);}} src={require('../Img/santa.gif')}/>}
        {!ps_clicked&&bell_clicked&&<img alt='img' className='ps_img' onClick={()=>{set_ps_clicked(true);}} src={require('../Img/ps.png')}/>}
        {!ps_clicked&&bell_clicked&&<label className='click_ps_me_text' >點我-打開禮物</label>}

        {ps_clicked&&<img alt='img' className='ps_img_ed'  src={require('../Img/ps.png')}/>}
        {ps_clicked&&!lt_clicked&&<img alt='img' className='letter_img' onClick={()=>{set_lt_clicked(true)}}  src={require(`../Img/Letter_img/${parseInt(searchParams.get('lid'))}.png`)}/>}
        {ps_clicked&&!lt_clicked&&<label className='click_lt_me_text' >點我-打開信封</label>}

        {ps_clicked&&lt_clicked&&<img alt='img' className='letter_img_ed'  src={require(`../Img/Letter_img/${parseInt(searchParams.get('lid'))}.png`)}/>}
        {ps_clicked&&lt_clicked&&!cd_clicked&&<img alt='img' className='card_img' onClick={()=>{set_cd_clicked(true)}}  src={require(`../Img/Cards_img/${parseInt(searchParams.get('cid'))}.png`)}/>}
        {ps_clicked&&lt_clicked&&!cd_clicked&&<label className='click_lt_me_text' >點我-閱讀卡片</label>}
        {ps_clicked&&cd_clicked&&lt_clicked&&<img alt='img' className='card_img_ed'  src={require(`../Img/Cards_img/${(parseInt(searchParams.get('cid'))+1)}.png`)}/>}
        
        {ps_clicked&&cd_clicked&&lt_clicked&&<div  className='card' >{/*style={{backgroundImage:`url(${require(`../Img/Cards_img/${(parseInt(searchParams.get('cid'))+1)}.png`)})`}}*/}
          {ps_clicked&&cd_clicked&&lt_clicked&&<label className='to'>Dear {searchParams.get('to')}</label>}
          {ps_clicked&&cd_clicked&&lt_clicked&&<label className='title'>{searchParams.get('title')}</label>}
          {ps_clicked&&cd_clicked&&lt_clicked&&<article className='content'>{searchParams.get('content')}</article>}
          {ps_clicked&&cd_clicked&&lt_clicked&&<label className='from'>{searchParams.get('from')}</label>}
        </div>}
        {ps_clicked&&cd_clicked&&lt_clicked&&<button className='quit_btn' onClick={()=>{window.location.href = 'http://www.google.com';}}>
        關閉
          </button>}
          {ps_clicked&&cd_clicked&&lt_clicked&&<button className='quit_btn2' onClick={()=>{navigate('/')}}>
          創造你的卡片
          </button>}
        

      </div>
    )
  }else{
    return (
      <>
      {data&&data.to&&<div className='Christmas_card_Main_div' id='mainn'>
        {/* <iframe src={require(`../Img/Musics/${searchParams.get('mid')}.mp3`)} allow="autoplay" style="display:none" id="iframeAudio">
        </iframe>  */}
        {!bell_clicked&&<img alt='img' className='bell_img' onClick={()=>{set_bell_clicked(true);play()}} src={require('../Img/bell.png')}/>}
        {!bell_clicked&&<label className='click_me_text' >點我-叫聖誕老人來</label>}
        {!ps_clicked&&bell_clicked&&<img alt='img' className='santa_img' onClick={()=>{set_ps_clicked(true);}} src={require('../Img/santa.gif')}/>}
        {!ps_clicked&&bell_clicked&&<label className='click_ps_me_text' >點我-打開禮物</label>}
        {!ps_clicked&&bell_clicked&&<img alt='img' className='ps_img' onClick={()=>{set_ps_clicked(true);}} src={require('../Img/ps.png')}/>}
        {ps_clicked&&<img alt='img' className='ps_img_ed'  src={require('../Img/ps.png')}/>}
        {ps_clicked&&!lt_clicked&&<img alt='img' className='letter_img' onClick={()=>{set_lt_clicked(true)}}  src={require(`../Img/Letter_img/${data.letter_type.id}.png`)}/>}
        {ps_clicked&&lt_clicked&&<img alt='img' className='letter_img_ed'  src={require(`../Img/Letter_img/${data.letter_type.id}.png`)}/>}
        {ps_clicked&&lt_clicked&&!cd_clicked&&<img alt='img' className='card_img' onClick={()=>{set_cd_clicked(true)}}  src={require(`../Img/Cards_img/${data.card_type.id}.png`)}/>}
        {ps_clicked&&cd_clicked&&lt_clicked&&<img alt='img' className='card_img_ed'  src={require(`../Img/Cards_img/${(parseInt(data.card_type.id)+1)}.png`)}/>}
        {ps_clicked&&!lt_clicked&&<label className='click_lt_me_text' >點我-打開信封</label>}
        {ps_clicked&&lt_clicked&&!cd_clicked&&<label className='click_lt_me_text' >點我-閱讀卡片</label>}
        {ps_clicked&&cd_clicked&&lt_clicked&&<div className='card' >{/*style={{backgroundImage:`url(${require(`../Img/Cards_img/${(parseInt(searchParams.get('cid'))+1)}.png`)})`}}*/}
          {ps_clicked&&cd_clicked&&lt_clicked&&<label className='to'>Dear {data.to}</label>}
          {ps_clicked&&cd_clicked&&lt_clicked&&<label className='title'>{data.title}</label>}
          {ps_clicked&&cd_clicked&&lt_clicked&&<p className='content'>{data.content}</p>}
          {ps_clicked&&cd_clicked&&lt_clicked&&<label className='from'>{data.from}</label>}
        </div>}
        {ps_clicked&&cd_clicked&&lt_clicked&&<button className='quit_btn' onClick={()=>{window.location.href = 'http://www.google.com';}}>
        關閉
          </button>}
          {ps_clicked&&cd_clicked&&lt_clicked&&<button className='quit_btn2' onClick={()=>{navigate('/')}}>
          創造你的卡片
          </button>}
        

      </div>}
      </>
    )
  }
  
}
