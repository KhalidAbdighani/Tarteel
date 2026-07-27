import React from 'react';
import Link from 'next/link';
import "./Dashboard.css";


export default function User({userAvatar,userFirst, userLast, user_id}){
    
    
    return (

       <Link href={`/profile/${user_id}`}>
        <div id='outBox' style={{ margin:"3px",padding:"5px 10px",display:"flex", borderBottom:"solid 1px black", alignItems:"center"}}>

            <div id='imgBox' >
                <img style={{ height:"40px",width:"40px",borderRadius:"100px", objectFit: "cover"}} src={userAvatar}/>
            </div>
            <div id='usersName' style={{display:"flex", alignItems:"flex-start", justifyContent:"center"}}>
                <div style={{padding:"10px"}}>
                    <p>{userFirst} {userLast}</p>
                    <p></p>

                </div>
            </div>


        </div>

       </Link> 


    )
}