"use client"; // نضع هذا السطر في الأعلى إذا كنا سنضيف حركات أو قراءة بيانات لاحقاً

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "./register.css"


 export default function Register(){

    
 const router= useRouter()


const [boxFirst, setboxFirst]=useState("")
const [boxLast, setboxLast]=useState("")
const [boxEmail, setboxEmail]=useState("")
const [boxPassword, setboxPassword]=useState("")

const getlogin = async()=>{
    const response = await fetch("http://localhost:5000/login",
        {
            method:"GET",
            credentials:"include"

        }
    )
    if (response){
        router.push("/login")
        
    }
}

const add= async function(e){
    e.preventDefault()

    const response= await fetch ("http://localhost:5000/register",{

        method:"POST",
        credentials:"include",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            First:boxFirst,
            Last:boxLast,
            Email:boxEmail,
            Password:boxPassword
        })
    })
    const data = await response.json()

    if(response.status===400){
        Swal.fire({
            icon: "error",
            title: "Hata!",
            text: data.msg
            });
            return
    }else if( response.status===200){
        const {value: verificationCode}= await  Swal.fire({
            
            input:"text",
            title: data.msg,
            inputPlaceholder: "Enter your Verification Number",
            inputAttributes: { maxlength: "6" }
            });

              if(verificationCode){
        const response2 = await fetch("http://localhost:5000/otp",{
            method:"POST",
            credentials:"include",
            headers: {"Content-Type":"application/json"},

            body: JSON.stringify({
                Email:boxEmail,
                code: verificationCode
            })

        })

        if(response2.status===400){
             Swal.fire({
            icon: "error",
            title: "Hata!",
            text: data.msg
            });
            return


        }else { 
            Swal.fire({ 
        title: "your account was verified successfully",
        text: `${data.msg}`,
        icon: "success"
        });

        router.push("/")

        }
    }
        
    }
  


}


    return(

        <div style={{width:"100%",background:"#943838", height:"100vh",margin:"0px",padding:"0px" ,display:"flex", flexDirection:"column"}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", height:"100%"}}>


                    <div style={{display:"flex", flexDirection:"column", flex:1, background:"#fff2dd",height:"100%", justifyContent:"center", alignItems:"center"}}> 
                       
                       
                                <img style={{width:"300px",padding:"0px"}} src="/tarteel3.png"/>
                        <h1 style={{marginBottom:"10px"}}>Tarteel</h1> 
                        <p style={{textAlign:"center"}}>Share your Quran recitations with the world. <br/> Connect with a global community of reciters <br></br>and listeners.</p>
                        
                        

                        </div>
                        





                    

                    
                    <div style={{display:"flex", flexDirection:"column",flex:1, background:"#ffdf9e",height:"100%", alignItems:"center", justifyContent:"center" , borderLeft:"solid 1px #9e6900"}}> 
                       
                        <div style={{width:"60%",maxWidth: "450px"}}>
                            
                            <div style={{marginBottom:"60px"}}>
                                <h1>Create your account</h1>
                            <p>Start your journey on Tarteel</p>

                            </div>

                            <div >

                                <form onSubmit={add}  style={{display:"flex",flexDirection:"column",gap:"1px"}}>

                                <label style={{display:"block",padding:"15px 0px 5px 0px"}}>  First Name</label  > 
                                        <input style={{padding:"10px"  ,borderRadius:"7px",bordEnter:"none" ,border:"solid 1px"}} type="text" value={boxFirst} onChange={(e)=> setboxFirst(e.target.value)} placeholder="First Name"></input>
                                       
                                 <label style={{display:"block",padding:"15px 0px 5px 0px"}}>  Last Name</label  > 
                                        <input style={{padding:"10px"  ,borderRadius:"7px",border:"none" ,border:"solid 1px"}} type="text" value={boxLast} onChange={(e)=> setboxLast(e.target.value)} placeholder="Last Name"></input>

                                <label style={{display:"block",padding:"15px 0px 5px 0px"}}>  Email Adress</label  > 
                                        <input style={{padding:"10px"  ,borderRadius:"7px",border:"none" ,border:"solid 1px"}} type="text" value={boxEmail} onChange={(e)=> setboxEmail(e.target.value)} placeholder="you@example.com"></input>


                                    <div style={{display:"flex", justifyContent:"space-between" ,alignItems:"end"}}>
                                    <label style={{display:"block",padding:"15px 0px 5px 0px"}} >Password <br></br></label>
                                    
                                    </div>

                                        <input value={boxPassword} onChange={(e)=> setboxPassword(e.target.value)}  style={{padding:"10px" ,borderRadius:"7px", border:"solid 1px"}} type="text" placeholder="Password"></input>
                                        <p id="p2"></p>

                                    

                                    <button onClick={add}    style={{padding:"10px", marginTop:"10px", borderRadius:"7px", border:"solid 1px",background:"#064e3b", color:"#ffdf9e"}} type="submit"> Sign in</button>

                                </form>
                                <div style={{textAlign:"center" ,paddingTop:"20px"}}>
                                    <p>already have an account? <span onClick={getlogin} style={{cursor:"pointer", color:"blue"}} >Sign in</span></p>

                                </div>

                                



                            </div>

                            
                        
                    </div>



                    </div>

                </div>
                

            
             

                        
                    </div>
    )
}