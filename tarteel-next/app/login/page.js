"use client"; // نضع هذا السطر في الأعلى إذا كنا سنضيف حركات أو قراءة بيانات لاحقاً
 import "./login.css";

import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";





export default function Login(){
  

    const [boxEmail,setboxEmail]=useState("")
    const [boxPassword, setboxPassword]=useState("")
    const router= useRouter();



    //functions 

    const add= async (event)=>{
        event.preventDefault();

        const response = await fetch("http://localhost:5000/login", {

            method:"POST", 
            headers:{ "Content-Type":"application/json",},
            credentials: "include",

            body:JSON.stringify({

                Email:boxEmail,
                Password:boxPassword
            }),
        });

        const data= await response.json();
        
            try{
                if(response.ok){
                       Swal.fire({ // عرض البيانات الي كتبتها في الباك اند
                    title: "Sumitted successfully!",
                    text: `${data.msg} ${data.username}`,
                    icon: "success",
                    timer: 2000, // يغلق تلقائياً بعد ثانيتين
                    showConfirmButton: false
                    }) .then(()=>{
                        router.push("/")
                        
                    })
                    return
            
        } else if( response.status===401){   
            Swal.fire({
            icon: "error",
            title: "Hata!",
            text: data.msg
            });return} 

            else if(response.status===404){
            Swal.fire({
            icon: "error",
            title: "Hata!",
            text: data.msg
            });return

            }

            } catch(err) {
                console.log(err)
              
                
            }
        }

        const getregister= async()=>{
            const response = await fetch("http://localhost:5000/register",

                {
                    credentials:"include",
                    method:"GET"
                   
                    
                }
                
            )
            if(response){
                router.push("/register")
            }

        }

        

    
    
    

    return(
            <div style={{width:"100%",background:"#943838", height:"100vh",margin:"0px",padding:"0px" ,display:"flex", flexDirection:"column"}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", height:"100%"}}>


                    <div style={{display:"flex", flexDirection:"column", flex:2, background:"#fff2dd",height:"100%", justifyContent:"center", alignItems:"center"}}> 
                       
                       
                                <img style={{width:"300px",padding:"0px"}} src="/tarteel3.png"/>
                        <h1 style={{marginBottom:"10px"}}>Tarteel</h1> 
                        <p style={{textAlign:"center"}}>Share your Quran recitations with the world. <br/> Connect with a global community of reciters <br></br>and listeners.</p>
                        
                        

                        </div>
                        





                    

                    
                    <div style={{display:"flex", flexDirection:"column",flex:1, background:"#ffdf9e",height:"100%", alignItems:"center", justifyContent:"center" , borderLeft:"solid 1px #9e6900"}}> 
                       
                        <div style={{width:"60%",maxWidth: "450px"}}>
                            
                            <div style={{marginBottom:"60px"}}>
                                <h1>Welcome to Tarteel</h1>
                            <p>Sign in to your Tarteel account</p>

                            </div>

                            <div >

                                <form onSubmit={add} style={{display:"flex",flexDirection:"column",gap:"1px"}}>

                                    <label style={{display:"block",padding:"15px 0px 5px 0px"}}>  Email Adress</label  > 
                                        <input style={{padding:"10px"  ,borderRadius:"7px",border:"none" ,border:"solid 1px"}} type="text" value={boxEmail} onChange={(e)=> setboxEmail(e.target.value)} placeholder="you@example.com"></input>
                                        <p id="p1"></p>
                               
                                    <div style={{display:"flex", justifyContent:"space-between" ,alignItems:"end"}}>
                                    <label style={{display:"block",padding:"15px 0px 5px 0px"}} >Password <br></br></label>
                                    <p style={{fontSize:"12px"}}>Forgot Password?</p>
                                    </div>

                                        <input value={boxPassword} onChange={(e)=> setboxPassword(e.target.value)}  style={{padding:"10px" ,borderRadius:"7px", border:"solid 1px"}} type="password" placeholder="Password"></input>
                                        <p id="p2"></p>

                                    

                                    <button    style={{padding:"10px", marginTop:"10px", borderRadius:"7px", border:"solid 1px",background:"#064e3b", color:"#ffdf9e"}} type="submit"> Sign in</button>

                                </form>
                                <div style={{textAlign:"center" ,paddingTop:"20px"}}>
                                    <p>Dont have an account? <span style={{cursor:"pointer", color:"blue"}} onClick={getregister}>Create one</span></p>

                                </div>

                                



                            </div>

                            
                        
                    </div>



                    </div>

                </div>
                

            
             

                        
                    </div>
    )
}