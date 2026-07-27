"use client";
import {  useRef } from 'react';
import Cards from "../components/Cards.js";
import Headerr from "../components/header.js";
import React, { useState } from 'react';
import { AiOutlineCaretRight } from "react-icons/ai";
import { MdBarChart } from "react-icons/md";
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { FaPause } from "react-icons/fa6";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useEffect } from 'react';
import { useRouter } from "next/navigation";







/* eslint-disable @next/next/no-img-element */



function Body(){

    // تعريفات
const[recitationlist, setrecitationlist]=useState([])
const[boxName,SetName]=useState("")
const[boxSurah,SetSurah]=useState("")
const[boxIMG,SetIMG]=useState("")
const[isopen,setisopen]=useState(false)
const[curentcard,setcurentcard]=useState(null)
const [curentpage, setcurentpage]=useState(1)
const[isPlaying, setisPlaying]=useState(false)
const [boxaudio,setaudio]=useState("")
const[nowTime,setNowTime]=useState(0)
const [duration, setDuration]=useState(0)
const[used,setused]=useState(false)
const[image,setimage]=useState(false)
const[audio,setaudioforbackend]=useState(false)
const[user, setuser]=useState(null)
const[loading, setloading]=useState(true)


        const routerr= useRouter();


var msg1="please enter your name"
var msg2="please select surah"
var audcontroller=useRef(null)


//function

    const imgecatcher=(e)=>{
        const file= e.target.files[0]
        setimage(file)
        

        if(file){
            const reader= new FileReader();
             reader.onloadend = function(){
                let trick= reader.result
                if(trick.includes("data:image/DNG;")||trick.includes("data:image/dng;")){
                    trick = trick.replace("image/DNG", "image/jpeg").replace("image/dng", "image/jpeg");
                }
            SetIMG(trick)


        }
        reader.readAsDataURL(file)
       
        }
        

    }
    const audiocatcher=(e)=>{
        const file= e.target.files[0]
        setaudioforbackend(file)
        if(file){
            // if (!file.type.startsWith('audio/')){
            //     return
            // }
            const reader= new FileReader()
            reader.onloadend=function(){
                setaudio(reader.result)

            }
            reader.readAsDataURL(file)
        }

    }
    const play= function(){
        if(audcontroller.current){
            if(!audcontroller.current.paused)
            {
                audcontroller.current.pause();
                setisPlaying(false)
                setused(true)
            }else{
        audcontroller.current.play()
                setisPlaying(true)
                setused(true)
                
            }
        }
    }
     const timer = function(){
    if(audcontroller.current){
        setNowTime(audcontroller.current.currentTime)
        console.log(
    "current:",
    audcontroller.current.currentTime,
    "duration:",
    audcontroller.current.duration
);
       
    }
    }
    const durationHandler= function(){
        if(audcontroller.current){
            setDuration(audcontroller.current.duration)
        }
    }

    const add= async function(event){
        event.preventDefault();
        if (boxName.trim() === "" && boxSurah.trim() === "" ) {
           
            document.getElementById("boxname").innerHTML=msg1;
            document.getElementById("boxsurah").innerHTML=msg2;


            return;
        }else if(boxSurah.trim() === ""){
            document.getElementById("boxsurah").innerHTML=msg2;
            return


        }else if(boxName.trim() === ""){document.getElementById("boxname").innerHTML=msg1; return} else if(boxIMG===""){return}else{
             document.getElementById("boxname").innerHTML="";
            document.getElementById("boxsurah").innerHTML="";

        }

//         const newcard= {
//     id:Date.now(),
//     opSurah:boxSurah,
//     opfirst:user.First,
//     oplast:user.Last,
//     opimage:`http://localhost:5000/Avatars/${user.Avatar}`,
//     opaudio:boxaudio,
//     opbody:boxIMG,

// }



SetName("")
SetSurah("")
SetIMG("")
setaudio("")
const formdata= new FormData()
formdata.append("Surah", boxSurah)
formdata.append("Audio", audio)
formdata.append("Image", image)
const response = await fetch ("http://localhost:5000/recitations",{
  method:"POST",
  credentials:"include",
  body:formdata
})

    if (response.ok) {
        await getRecitations();  

        SetName("");
        SetSurah("");
        SetIMG("");
        setaudio("");
    }


// console.log(data)



    }
    const changePage =(direction)=>{
    const nextpage= curentpage+direction;
    
    if(nextpage>=1 && nextpage<= totalpages){
        setcurentpage(nextpage)
    }
}

useEffect(()=>{
const gethome= async ()=>{
  const response = await fetch("http://localhost:5000/dashboard",
    {
      method:"GET",
      credentials:"include",
    }
  )
  const data = await response.json()
  // console.log("data coming form back end is ",data)
  if(response.status===401){
    routerr.push("/login")
  } else{ 
    setuser(data)
    setloading(false)

  }
}
gethome()
 },[])


  const getRecitations = async () => {

        const response = await fetch("http://localhost:5000/recitations");

        const data = await response.json();

        setrecitationlist(data);
        console.log(data)

    }

 useEffect(() => {

   

    getRecitations();

}, []);



// pages
var postsperpage=4;
var totalpages=Math.ceil(recitationlist.length/postsperpage)

var start=(curentpage-1)*postsperpage;
var end= start +postsperpage;
var paginatedcards = recitationlist.slice(start,end)




    return(
<div className="Body">
    
    
<Headerr/>
     
        
            
        {/* menu */}
    
{/* end of menu */}





                        

    {/* Home */}
                <div style={{display:"flex", paddingTop:"100px", flexDirection:"column", justifyContent:"center", gap:"14px" , width:"90%", margin:"auto"}}> 

                    <h2>Home</h2>
                    <p>Here you can listen to everyones recitation</p>
                    {!isopen &&(
                    <button id="plus" onClick={()=>setisopen(!isopen)}>➕</button>)}
                </div> 
    {/*end  Home */}




            {/* add card */}



                        
{isopen&&(
<div className="AddCardForm">
    <h5>Add new recitation</h5>

    {/* form */}
    <form onSubmit={add}>
        <input placeholder="Enter your name" type="text" value={boxName} onChange={(e)=>SetName(e.target.value)}/> <br></br>



        <select onChange={(e)=>SetSurah(e.target.value)} value={boxSurah}>
        <option value="">==Surah==</option>
        <option value="Al-Fatihah">Al-Fatihah</option>
        <option value="Al-Baqarah">Al-Baqarah</option>
        <option value="Ali 'Imran">Ali 'Imran</option>
        <option value="An-Nisa'">An-Nisa'</option>
        <option value="Al-Ma'idah">Al-Ma'idah</option>
        <option value="Al-An'am">Al-An'am</option>
        <option value="Al-A'raf">Al-A'raf</option>
        <option value="Al-Anfal">Al-Anfal</option>
        <option value="At-Tawbah">At-Tawbah</option>
        <option value="Yunus">Yunus</option>
        <option value="Hud">Hud</option>
        <option value="Yusuf">Yusuf</option>
        <option value="Ar-Ra'd">Ar-Ra'd</option>
        <option value="Ibrahim">Ibrahim</option>
        <option value="Al-Hijr">Al-Hijr</option>
        <option value="An-Nahl">An-Nahl</option>
        <option value="Al-Isra'">Al-Isra'</option>
        <option value="Al-Kahf">Al-Kahf</option>
        <option value="Maryam">Maryam</option>
        <option value="Taha">Taha</option>
        <option value="Al-Anbiya'">Al-Anbiya'</option>
        <option value="Al-Hajj">Al-Hajj</option>
        <option value="Al-Mu'minun">Al-Mu'minun</option>
        <option value="An-Nur">An-Nur</option>
        <option value="Al-Furqan">Al-Furqan</option>
        <option value="Ash-Shu'ara'">Ash-Shu'ara'</option>
        <option value="An-Naml">An-Naml</option>
        <option value="Al-Qasas">Al-Qasas</option>
        <option value="Al-'Ankabut">Al-'Ankabut</option>
        <option value="Ar-Rum">Ar-Rum</option>
        <option value="Luqman">Luqman</option>
        <option value="As-Sajdah">As-Sajdah</option>
        <option value="Al-Ahzab">Al-Ahzab</option>
        <option value="Saba'">Saba'</option>
        <option value="Fatir">Fatir</option>
        <option value="Ya-Sin">Ya-Sin</option>
        <option value="As-Saffat">As-Saffat</option>
        <option value="Sad">Sad</option>
        <option value="Az-Zumar">Az-Zumar</option>
        <option value="Ghafir">Ghafir</option>
        <option value="Fussilat">Fussilat</option>
        <option value="Ash-Shura">Ash-Shura</option>
        <option value="Az-Zukhruf">Az-Zukhruf</option>
        <option value="Ad-Dukhan">Ad-Dukhan</option>
        <option value="Al-Jathiyah">Al-Jathiyah</option>
        <option value="Al-Ahqaf">Al-Ahqaf</option>
        <option value="Muhammad">Muhammad</option>
        <option value="Al-Fath">Al-Fath</option>
        <option value="Al-Hujurat">Al-Hujurat</option>
        <option value="Qaf">Qaf</option>
        <option value="Adh-Dhariyat">Adh-Dhariyat</option>
        <option value="At-Tur">At-Tur</option>
        <option value="An-Najm">An-Najm</option>
        <option value="Al-Qamar">Al-Qamar</option>
        <option value="Ar-Rahman">Ar-Rahman</option>
        <option value="Al-Waqi'ah">Al-Waqi'ah</option>
        <option value="Al-Hadid">Al-Hadid</option>
        <option value="Al-Mujadilah">Al-Mujadilah</option>
        <option value="Al-Hashr">Al-Hashr</option>
        <option value="Al-Mumtahanah">Al-Mumtahanah</option>
        <option value="As-Saff">As-Saff</option>
        <option value="Al-Jumu'ah">Al-Jumu'ah</option>
        <option value="Al-Munafiqun">Al-Munafiqun</option>
        <option value="At-Taghabun">At-Taghabun</option>
        <option value="At-Talaq">At-Talaq</option>
        <option value="At-Tahrim">At-Tahrim</option>
        <option value="Al-Mulk">Al-Mulk</option>
        <option value="Al-Qalam">Al-Qalam</option>
        <option value="Al-Haqqah">Al-Haqqah</option>
        <option value="Al-Ma'arij">Al-Ma'arij</option>
        <option value="Nuh">Nuh</option>
        <option value="Al-Jinn">Al-Jinn</option>
        <option value="Al-Muzzammil">Al-Muzzammil</option>
        <option value="Al-Muddaththir">Al-Muddaththir</option>
        <option value="Al-Qiyamah">Al-Qiyamah</option>
        <option value="Al-Insan">Al-Insan</option>
        <option value="Al-Mursalat">Al-Mursalat</option>
        <option value="An-Naba'">An-Naba'</option>
        <option value="An-Nazi'at">An-Nazi'at</option>
        <option value="'Abasa">'Abasa</option>
        <option value="At-Takwir">At-Takwir</option>
        <option value="Al-Infitar">Al-Infitar</option>
        <option value="Al-Mutaffifin">Al-Mutaffifin</option>
        <option value="Al-Inshiqaq">Al-Inshiqaq</option>
        <option value="Al-Buruj">Al-Buruj</option>
        <option value="At-Tariq">At-Tariq</option>
        <option value="Al-A'la">Al-A'la</option>
        <option value="Al-Ghashiyah">Al-Ghashiyah</option>
        <option value="Al-Fajr">Al-Fajr</option>
        <option value="Al-Balad">Al-Balad</option>
        <option value="Ash-Shams">Ash-Shams</option>
        <option value="Al-Layl">Al-Layl</option>
        <option value="Ad-Duha">Ad-Duha</option>
        <option value="Ash-Sharh">Ash-Sharh</option>
        <option value="At-Tin">At-Tin</option>
        <option value="Al-'Alaq">Al-'Alaq</option>
        <option value="Al-Qadr">Al-Qadr</option>
        <option value="Al-Bayyinah">Al-Bayyinah</option>
        <option value="Az-Zalzalah">Az-Zalzalah</option>
        <option value="Al-'Adiyat">Al-'Adiyat</option>
        <option value="Al-Qari'ah">Al-Qari'ah</option>
        <option value="At-Takathur">At-Takathur</option>
        <option value="Al-'Asr">Al-'Asr</option>
        <option value="Al-Humazah">Al-Humazah</option>
        <option value="Al-Fil">Al-Fil</option>
        <option value="Quraysh">Quraysh</option>
        <option value="Al-Ma'un">Al-Ma'un</option>
        <option value="Al-Kawthar">Al-Kawthar</option>
        <option value="Al-Kafirun">Al-Kafirun</option>
        <option value="An-Nasr">An-Nasr</option>
        <option value="Al-Masad">Al-Masad</option>
        <option value="Al-Ikhlas">Al-Ikhlas</option>
        <option value="Al-Falaq">Al-Falaq</option>
        <option value="An-Nas">An-Nas</option>

        </select> 

        <input style={{display:"none"}} id="pic"  type="file" onChange={imgecatcher} /> 
        <label id="Myimg" htmlFor="pic"> Upload foto</label> 

        <input style={{display:"none"}} id="Aud"  type="file" onChange={audiocatcher} accept="audio/*" /> 
        <label  id="Myaud" htmlFor="Aud"> Upload Audio</label> 




        <button id="add">Add</button>

    </form> 
    {/* form */}

    {/* alert */}
    <div className="alert" style={{display:"inline-block"}}> 
        <p id="boxname" style={{fontSize:"12px",color:"red",display:"inline-block", width:"155px"}}></p>
        <p id="boxsurah" style={{fontSize:"12px",color:"red",display:"inline-block", marginLeft:"25px"}}>        </p>
    </div>
</div>

)}

                           

<div className="Cards">
  {/* add values to a card */}
  <div className="Card"> 
    {paginatedcards.map (function(item){ return( 
      
      
      <Cards 
        key={item._id}
        
        First={item.userId.First}
        Last={item.userId.Last}
        imgurl={`http://localhost:5000/Avatars/${item.userId.Avatar}`}
        Surah={item.Surah}
        audiourl={`http://localhost:5000/Recitations/Audio/${item.Audio}`}
        bodyimg={`http://localhost:5000/Recitations/Image/${item.Image}`}
        

        cardPlaying={curentcard?._id=== item._id }
        
        onplay={()=>{
          if(curentcard?._id !== item._id ){
            if(audcontroller.current) { audcontroller.current.pause(); }
            setisPlaying(false);
            setcurentcard(item)
            setused(false)
            setNowTime(0)
            setDuration(0)
             
          } 
        }}
      />
      
      
    )} )}
    {recitationlist.length>0 &&( <div id="pagination-container" className="fixed-pagination">
      <button onClick={()=>changePage(-1)}>Prev</button>
      <span id="page-number">page {curentpage} of {totalpages}</span>
      <button onClick={()=>changePage(1)}>Next</button>
    </div>)}
  </div>

  <div className="MainCard">

    <div className='firstbox'>
       <div className="foto2">
      {curentcard &&(
        <img src={`http://localhost:5000/Avatars/${curentcard.userId.Avatar}`} alt="Reciter Image"></img>
      )}
    </div>

    <div className="content2">
      
      {curentcard &&(
        <div>
        <h3>{curentcard.Surah}</h3>
        <div className="Des"><p>{curentcard.userId.First} {curentcard.userId.Last}</p></div>
        </div>
        
      )}
      
      
    </div>

    </div>
    

   


    
    <div className={`MainCardBox ${curentcard? "active":""}`}>
      <div className="manager1">
        <div className="MainCardBoxContent">Quraan</div>
        <button> <MdBarChart/></button>
      </div>

      <div className="manager2">
        <div className={`MainCardSmallBox ${curentcard? "active":""}`} style={{display:"flex", flexDirection:"column" }}>
          {isPlaying&&(
            <div style={{width:"100%",display:"flex",flexDirection:"column", justifyContent:"center" , alignItems:"center" }}>
              <div className={`playaudio`}  style={{display:"flex", padding:"0px", alignItems:"center", gap:"30px", width:"50%", justifyContent:"center"}}>
                <button style={{cursor:"pointer"}}> <TbPlayerTrackPrevFilled/></button>
                <button onClick={play} style={{cursor:"pointer"}}> <FaPause/></button>
                <button style={{cursor:"pointer"}}> <TbPlayerTrackNextFilled/></button>
              </div>

              <div style={{display:"flex", alignItems:"center", gap:"10px", width:"80%",justifyContent:"center" ,paddingTop:"10px"}}>
                <p style={{fontSize:"12px"}}>{String(Math.floor(nowTime/60)).padStart(2,"0")}:{String(Math.floor(nowTime % 60)  ).padStart(2,"0")}</p>
                <input style={{ '--value': `${(nowTime / (duration || 1)) * 100}%` }} id='range1' type='range' max={duration||0} value={nowTime||0}
                

                onChange={(e)=>{
                  const newtime=Number(e.target.value)
                  setNowTime(newtime)
                  if(audcontroller.current){
                    audcontroller.current.currentTime=newtime;
                  }
                }} >
              </input>
              <p style={{fontSize:"12px",width:"fit-content", padding:"0px"}}>{String(Math.floor(duration/60)).padStart(2,"0")}:{String(Math.floor(duration % 60) ).padStart(2,"0")}</p>

              </div>
              
            </div>
          )}

          {!isPlaying&&(
            
              <div style={{width:"100%", display:"flex", alignItems:"center" ,justifyContent:"center" ,flexDirection:"column"}}>
                {!used &&(
                  <div className={`playaudio ${curentcard? "active":""}`} onClick={play} style={{display:"flex", alignItems:"center", gap:"6px", padding:"10px"}}>
                    <button style={{pointerEvents:"none",padding:"0px",margin:"0px"}}> <TbPlayerPlayFilled/></button>
                    <h3 style={{pointerEvents:"none"}}>Play The Audio</h3>
                  </div>
                )}
                {used&&(
                  <div style={{width:"100%", display:"flex", alignItems:"center" ,justifyContent:"center" ,flexDirection:"column"}}  >
                    
                    <div className="playaudio"  style={{display:"flex", padding:"0px", alignItems:"center", gap:"30px", width:"50%", justifyContent:"center"}}>
                      <button style={{cursor:"pointer"}}> <TbPlayerTrackPrevFilled/></button>
                      <button onClick={play} style={{cursor:"pointer"}}> <TbPlayerPlayFilled/></button>
                      <button style={{cursor:"pointer"}}> <TbPlayerTrackNextFilled/></button>
                    </div>
                    
                    
                    <div style={{display:"flex", alignItems:"center", gap:"10px", width:"80%",justifyContent:"center" ,paddingTop:"10px"}} >
                         <p  style={{fontSize:"12px",width:"fit-content", padding:"0px"}}>{String(Math.floor(nowTime/60)).padStart(2,"0")}:{String(Math.floor(nowTime % 60) ).padStart(2,"0")}</p>
                        
                        <input style={{ '--value': `${(nowTime / (duration || 1)) * 100}%` }} id='range1' type='range' max={duration||0} value={nowTime||0}
                        
                      onChange={(e)=>{
                        const newtime=Number(e.target.value)
                        setNowTime(newtime)
                        
                        if(audcontroller.current){
                          audcontroller.current.currentTime=newtime;
                        }
                      }} >
                    </input>
                    <p style={{fontSize:"12px"}}>{String(Math.floor(duration/60)).padStart(2,"0")}:{String(Math.floor(duration % 60) ).padStart(2,"0")}</p>

                    </div>
                    
                  </div>
                )}
              
            </div>
          )}

          {curentcard &&(
            <audio
              ref={audcontroller}
              src={`http://localhost:5000/Recitations/Audio/${curentcard.Audio}`}
              style={{display:"none"}}
              onTimeUpdate={timer}
              onLoadedData={durationHandler}
            />
          )}
        </div>
      </div>
    </div>
  </div>
</div>

                    

       
        
</div>

        
    )
    
}
export default function HomePage() {
    return <Body />;
}

