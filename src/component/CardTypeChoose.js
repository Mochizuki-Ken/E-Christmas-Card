import React,{useState,useEffect} from 'react'
import '../css/CardTypeChoose.css'
import {AiFillCaretDown} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'
export default function CardTypeChoose({type,defult_value,new_card,set_new_card}) {
    const [state,setState]=useState(false)
    // const [current_value,set_current_value]=useState(defult_value)
    useEffect(()=>{
        // document.body.style.overflow='hidden'
        if (type==='aim'){
           
                    if (defult_value==='empty'){
                        set_new_card({...new_card,aim_type:{id:1,name:"Animation Style 1"}})
                    }else{
                        set_new_card({...new_card,aim_type:defult_value})
                    }
        }else{
            
                if (type==='card'){
                    if (defult_value==='empty'){
                        set_new_card({...new_card,card_type:{id:1,name: 'Card Style 1'}})
                    }else{
                        set_new_card({...new_card,card_type:defult_value})
                    
                }}
        }
    },[])
    
    
    //[{name:"A",card_url:'../Img/Cards_img/1.png',card_place_url:'../Img/Cards_img/1.png'}]
    
    const card=()=>{
        let arr=[]
        for (let i=1;i<=38;i+=2){
            let l=arr.length+1
            arr.push({id:i,name:`Card Style ${l}`})
        }
        return(arr)
    }//:('Animation Style')

    let letters=[{id:1,name:"Letter Style 1"},{id:2,name:"Letter Style 2"},{id:3,name:"Letter Style 3"},{id:4,name:"Letter Style 4"}]
    let musics=[{id:1,name:"The Herald Angels Sing"},{id:2,name:"Jingle bells"},{id:3,name:"Joy to World"},{id:4,name:"Silent Night"}]
    return (
    <>
    {state===false&&<div className='CardTypeChoose_mian_div'>
        {type==='card'&&<button onClick={()=>{setState(true)}}>卡片樣式<AiFillCaretDown/></button>}
        {type==='letter'&&<button onClick={()=>{setState(true)}}>信封樣式<AiFillCaretDown/></button>}
        {type==='music'&&<button onClick={()=>{setState(true)}}>背景音樂<AiFillCaretDown/></button>}

        {type==='card'&&new_card.card_type&&<img alt={new_card.card_type.name} src={require(`../Img/Cards_img/${new_card.card_type.id}.png`)} />}
        {/* {type==='card'&&new_card.card_type&&<img alt={new_card.card_type.name} src={require(`../Img/Cards_img/${new_card.card_type.id+1}.png`)} width='100px' height='70px'/>} */}
        {type==='letter'&&new_card.letter_type&&<img alt={new_card.letter_type.name} src={require(`../Img/Letter_img/${new_card.letter_type.id}.png`)} />}
        {type==='music'&&new_card.music_type&&<ReactAudioPlayer className='audioPlayer' controls src={require(`../Img/Musics/${new_card.music_type.id}.mp3`)}/>}
    </div>}
    {type!=='music'&&state===true&&<div className='Card_Choose_show_main_div'>
        {
            type==='card'&&(
                card().map((each,index)=>{
                    return(
                        <div key={index} onClick={()=>{set_new_card({...new_card,card_type:each});setState(false)}}>
                            {/* <label>{each.name}</label> */}
                            <img alt={each.name} src={require(`../Img/Cards_img/${each.id}.png`)} />
                            {/* <img alt={each.name} src={require(`../Img/Cards_img/${each.id+1}.png`)} width='100px' height='70px'/> */}
                        </div>
                    )
                })
            )
            
        }
        {
            type==='letter'&&(
                letters.map((each,index)=>{
                    return(
                        <div key={index} onClick={()=>{set_new_card({...new_card,letter_type:each});setState(false)}}>
                            <img alt={each.name} src={require(`../Img/Letter_img/${each.id}.png`)} />
                        </div>
                    )
                })
            )
        }
    </div>}
    {type==='music'&&state===true&&<div className='Card_Choose_show_main_div2'>
        
        {
            type==='music'&&(
                musics.map((each,index)=>{
                    return(
                        <div className='music_name_div' key={index} onClick={()=>{set_new_card({...new_card,music_type:each});setState(false)}}>
                            <label>{each.name}</label>
                        </div>
                    )
                })
            )
        }
    </div>}
    </>
  )
}
