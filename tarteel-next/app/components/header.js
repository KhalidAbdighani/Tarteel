import "./Dashboard.css"
import React, { useState , useEffect, useRef } from 'react';
import User from "./users.js";
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { MdFilePresent, MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";









function Headerr(){
    const [isopen, setisopen]=useState(false)
    const [Users,SetUsers]=useState(null)
    const listRef=useRef(null)

    const click = function(e){
        e.stopPropagation(); // منع انتشار الضغطة لكي لا تفتح وتغلق في نفس اللحظة
        setisopen(!isopen);
    }


     const getusers = async ()=>{
        if (Users && Users.length > 0) {
        console.log("البيانات موجودة مسبقاً، لن يتم جلبها من السيرفر مرة أخرى.");
        console.log("هذه البيانات", Users)
        return; 
    }
            const response= await fetch("http://localhost:5000/showusers",
                {
                    method:"GET",
                    credentials:"include"
                }
            )
            const data = await response.json()
            if(response.ok){
                SetUsers(data)

            }
            console.log(Users)
    
 }

    useEffect(()=>{

          function handleClick(e) {

        if (listRef.current && !listRef.current.contains(e.target)) {

            setisopen(false);

        }

    }

    document.addEventListener("click", handleClick);

    return () => {

        document.removeEventListener("click", handleClick);

    };




    },[isopen])

    const router=useRouter();
 const logout = async ()=>{

    const response = await fetch("http://localhost:5000/logout",
        {
            method:"POST",
            credentials:"include"
        }
    )
    const data = await response.json()
    if(response.ok){
        router.push("/login")
        return data
    }
   
}


     
    return (

    <div className='Header'>
              
       
            <div className='Logo'>

                 <Menu as="div" className="Menu-Wrapper">

        <Menu.Button className="Menu">
            <div></div>
            <div></div>
            <div></div>
        </Menu.Button>
        
        <Menu.Items className="side">
            <ul>
                    <Link href="/profile" > 
                <Menu.Item as="li" >
                    👤 Profileb 
                    
                    </Menu.Item>
                    </Link>
                
                <Menu.Item as="li">settings</Menu.Item>
                <Menu.Item as="li">Playlist</Menu.Item>
            </ul>

        </Menu.Items>
        </Menu>

                <h1>Tarteel</h1>

            </div>

            <div className='content'>
                <nav>
                    
                    
                    <div id="library" style={{gap:"1px",display:"flex",flexDirection:"column"}}>
                        <p style={{padding:"0px 15px" , cursor:"pointer"}} onClick={(e)=>{click(e); getusers(e);}} >Users</p>
                        <div id="line"  ></div>
                    </div>
                    
                    
                    <div id="library" style={{gap:"1px",display:"flex",flexDirection:"column"}}>
                        <a href='#'>Library</a>
                        <div id="line"  ></div>
                    </div>
                    
                     <div id="library" style={{gap:"1px",display:"flex",flexDirection:"column"}}>
                        <a href='#'>Upload</a>
                        <div id="line"  ></div>
                    </div>
                </nav>

            </div>

            <div className='Logout'>

                  <div onClick={logout} style={{cursor:"pointer", display:"flex",alignItems:"center",justifyContent:"center"}}>
                                         <MdLogout style={{fontSize:"20px"}}/>
                                         <h4 style={{fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",justifyContent:"center", margin:"0px",padding:"10px",padding:"0px 5px"}}>  Sign Out</h4>
                                         
                 
                                     </div>

            </div>

            {isopen && ( 
                <div id="userbox" ref={listRef}>
                    {Users && Users.map((user,index)=>(
                        
                        <User
                        
                        key={user._id}
                        user_id={user._id}
                        userFirst={user.First}
                        userLast={user.Last}
                        userAvatar={`http://localhost:5000/Avatars/${user.Avatar}`}/>

                    ))}
                    

                    
                                
                    


                </div>
            )}

      



    </div>

)

}
export default Headerr;