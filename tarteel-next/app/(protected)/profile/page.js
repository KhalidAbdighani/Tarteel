"use client";
import React from 'react';
import { LuUser } from "react-icons/lu";
import { LuBell } from "react-icons/lu";
import { TiMicrophoneOutline } from "react-icons/ti";
import { MdFilePresent, MdLogout } from "react-icons/md";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Link from 'next/link'; // 🌟 هذا هو الصحيح لـ Next.js
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import foto from "./tartel white.png"
import "./profile.css";






import "./profile.css" 
import { useRouter } from "next/navigation";

const countries = [
    { code: "SA", name: "Saudi Arabia" },
    { code: "TR", name: "Turkey" },
    { code: "EG", name: "Egypt" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "JO", name: "Jordan" },
    { code: "KW", name: "Kuwait" },
    { code: "QA", name: "Qatar" },
    { code: "OM", name: "Oman" },
    { code: "BH", name: "Bahrain" },
    { code: "IQ", name: "Iraq" },
    { code: "PS", name: "Palestine" },
    { code: "SY", name: "Syria" },
    { code: "LB", name: "Lebanon" },
    { code: "YE", name: "Yemen" },
    { code: "LY", name: "Libya" },
    { code: "TN", name: "Tunisia" },
    { code: "DZ", name: "Algeria" },
    { code: "MA", name: "Morocco" },
    { code: "SD", name: "Sudan" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "MY", name: "Malaysia" },
    { code: "ID", name: "Indonesia" }
];


 function  Profile() {
        const router= useRouter();

    const [user,setUser]=useState(null)
    const[loading, setloading]=useState(true)
    const [boxavatar, setavatar]=useState("")
    const [file,setfile]=useState("")

    const imgecatcher=(e)=>{
        const file= e.target.files[0]
        setfile(file)

        if(file){
            const reader= new FileReader();
             reader.onloadend = function(){
                let trick= reader.result
                if(trick.includes("data:image/DNG;")||trick.includes("data:image/dng;")){
                    trick = trick.replace("image/DNG", "image/jpeg").replace("image/dng", "image/jpeg");
                }
            setavatar(trick)


        }
        reader.readAsDataURL(file)
       
        }
        

    }

    useEffect(()=>{


        const getprofile = async (res,req)=>{
            const response = await fetch(
                "http://localhost:5000/profile",
                {credentials:"include"}
            )
            if(response.status==401){
                    router.push("/login")
                    return
                }
                const data = await response.json()
                
                setUser(data)
                setloading(false)

        }
        getprofile()
    },[])

   

    const saveProfile = async()=>{
        const formData = new FormData()
    formData.append("First",user.First)
    formData.append("Last",user.Last)

    formData.append("Email",user.Email)
    formData.append("Bio",user.Bio)
    formData.append("Title",user.Title)
    formData.append("Country",user.Country)
    formData.append("Avatar",file)

        const response = await fetch("http://localhost:5000/profile",

            {
                
                method:"PUT",
                credentials:"include",
                
               
               body:formData

            }
            


        )
        const data = await response.json()
        if(response.ok){


              Swal.fire({ // عرض البيانات الي كتبتها في الباك اند
                                title: "Sumitted successfully!",
                                text: `Updated Successfuly!`,
                                icon: "success",
                                timer: 2000, // يغلق تلقائياً بعد ثانيتين
                                showConfirmButton: false
                                })

                                
             
            
        }
        setUser(data)

    }

   if (loading) {
    return (
        <div style={{ padding: "30px" }}>
            <Skeleton circle width={180} height={180} />

            <br />
            <br />

            <Skeleton width={250} height={25} />

            <br />

            <Skeleton width={400} height={80} />

            <br />

            <Skeleton width="100%" height={45} />

            <br />

            <Skeleton width="100%" height={120} />

            <br />

            <Skeleton width={180} height={45} />
        </div>
    );
}

    return (
    <div className='main' style={{height:"100vh"}}>
        <div className='header2' style={{width:"100%",backgroundColor:"#ffd47f", height:"64px"}}>

            <div className='header3' style={{ display:"flex",width:"70%", margin:"auto", height:"64px", alignItems:"center",justifyContent:"space-between"}}>

                <div style={{display:"flex", alignItems:"center"}}>
                    <h2>Tarteel</h2>
                </div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:"20px"}}>
                     <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Link href="/" style={{display:"flex"}}>
                        <HiOutlineChevronLeft style={{fontSize:"20px"}}/>
                        <h4 style={{fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",justifyContent:"center", margin:"0px",padding:"10px",padding:"0px 5px"}}>  Back to Home</h4>
                        </Link>
  
                        

                    </div>
                    
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <MdLogout style={{fontSize:"20px"}}/>
                        <h4 style={{fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",justifyContent:"center", margin:"0px",padding:"10px",padding:"0px 5px"}}>  Sign Out</h4>
                        

                    </div>
                   
                    
                </div>
            </div>
            
            </div> <br/> <br/>
        <div className='page' style={{width:"70%",margin:"auto"}}>
                <h2>Account Settings</h2>
                <p>Manage your personal information and preferences on Tarteel</p><br/> 

                <div className='container' style={{display:"flex",justifyContent:"space-between" , width:"100%", paddingLeft:"0px"}}>
                    <div className='setting-menu' style={{display:"flex", flexDirection:"column", width:"30%", borderRadius:"20px",padding:"0px",gap:"30px"}}>
                        <div style={{display:"flex", alignItems:"center",gap:"5px"}}className='chars'>
                            <div><LuUser /></div>
                            <h4 style={{fontWeight:"500"}}>Profile</h4>
                            
                        </div>
                        <div style={{display:"flex", alignItems:"center",gap:"5px"}}className='chars'>
                            <div><LuBell /></div>
                            <h4 style={{fontWeight:"500"}}>Notifications</h4>
                            
                        </div>
                        <div style={{display:"flex", alignItems:"center",gap:"5px"}} className='chars'>
                            <div><TiMicrophoneOutline /></div>
                            <h4 style={{fontWeight:"500"}}>Recitations</h4>
                            
                        </div>
                        
                       

                        <div className='your-states' style={{display:"flex", flexDirection:"column", width:"100%",gap:"10PX"}}>
                            
                            <p style={{fontSize:"15px"}}>Your States</p>
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <p>Recitations</p>
                                <p style={{color:"#ffb013"}}>0</p>
                            </div>

                             <div style={{display:"flex", justifyContent:"space-between"}}>
                                <p>Listeners</p>
                                <p style={{color:"#ffb013"}}>0</p>
                            </div>

                             <div style={{display:"flex", justifyContent:"space-between"}}>
                                <p>Likes</p>
                                <p style={{color:"#ffb013"}}>0</p>
                            </div>

                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <p>Following</p>
                                <p style={{color:"#ffb013"}}>0</p>
                            </div>

                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <p>Followers</p>
                                <p style={{color:"#ffb013"}}>0</p>
                            </div>

                        </div>



                    </div>





                    
                    <div className='setting-main' style={{display:"flex", flexDirection:"column", width:"67%",borderRadius:"20px",padding:"30px"}}>
                        
                        <div className='profile' style={{display:"flex", gap:"10px", alignItems:"center",paddingBottom:"15px"}}>
                            <div style={{backgroundColor:"#fdd78b",border:"solid 1px #064e3b" , padding:"5px 10PX",borderRadius:"5px", fontSize:"20PX"}}><LuUser/></div>
                            <h4 style={{fontSize:"20PX"}}>Profile</h4>
                            
                        </div>
                        <div style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div style={{position:"relative", width: "200px", height: "200px"}}>
                                 <img style={{
                                height:"200px",
                                width:"200px",
                                backgroundColor:"#fdd78b",
                                border:"solid 2px #064e3b" , 
                                borderRadius:"100px", objectFit: "cover"}}
                                src={user?.Avatar?`http://localhost:5000/Avatars/${user.Avatar}`: foto.src }
                                  
                                  
                                  

                                  
                                  
                                  
                                  
                                  />

                                   <label htmlFor='changefoto'><MdEdit  style={{ cursor:"pointer", position:"absolute",right:"0px",bottom:"15px",fontSize:"40px",backgroundColor:"#064e3b",color:"#fdd78b",borderRadius:"213px",padding:"5px",width:"fitcontent",border:"none"}}/>  </label> 

                            </div>
                           
                            



                        </div>
                        
                       
                        
                        <input  onChange={imgecatcher}  style={{ display:"none"}} id='changefoto'type='file' name='Avatars'></input>
                        <label id="change" htmlFor="changefoto" style={{cursor:"pointer",display:"flex",justifyContent:"center", alignItems:"center",padding:"10px 0px 15px 0px",color:"blue"}}>Change Profile Photo</label>
                        <div style={{display:"flex", gap:"15px", justifyContent:"center", alignItems:"center"}}>


                            <div style={{display:"flex", flexDirection:"column", flex:"1"}}>
                               
                               
                                <label style={{display:"block",padding:"0px 0px 5px 0px"}}>First Name </label>
                            <input value={user? `${user.First}`:""} onChange={(e)=> setUser({...user, First:e.target.value})} type='text' style={{backgroundColor:"#ffdf9e",border:"solid 2px #064e3b",borderRadius:"6px",padding:"10px",border:"solid 1px black",}}></input>
                                 

                            </div>
                            
                                

                              <div style={{display:"flex", flexDirection:"column", flex:"1"}}>
                                            <label style={{display:"block",padding:"0px 0px 5px 0px"}}>Last Name </label>
                            <input value={user? `${user.Last}`:""} onChange={(e)=> setUser({...user, Last:e.target.value})} type='text' style={{backgroundColor:"#ffdf9e",border:"solid 2px #064e3b",borderRadius:"6px",padding:"10px",border:"solid 1px black",}}></input>

                            </div>

                             

                        </div>
                      
                            <label style={{display:"block",padding:"15px 0px 5px 0px"}}>Bio</label>
                           
                            <textarea rows={3} value={user?.Bio || ""} onChange={(e)=> setUser({...user, Bio:e.target.value})} type='text' style={{backgroundColor:"#ffdf9e",border:"solid 2px #064e3b",borderRadius:"6px",padding:"10px",border:"solid 1px black",resize:"vertical"}}></textarea>

                           
                           
                           
                           
                            <div style={{display:"flex",gap:"15px"}}>

                                <div style={{display:"flex", flexDirection:"column",flex:"1"}}>
                                    <label style={{display:"block",padding:"15px 0px 5px 0px"}}>Title</label>
                            <select value={user? `${user.Title}`:""} onChange={(e)=> setUser({...user, Title:e.target.value})}   style={{backgroundColor:"#ffdf9e",border:"solid 2px #064e3b", width:"100%",borderRadius:"6px",padding:"10px",border:"solid 1px black",}}>
                                
                                <option value="">Select Title</option>
                                <option value="user">User</option>
                                <option value="listener">Listener</option>
                                <option value="student">Hafiz</option>
                                <option value="quran_reciter">Quran Reciter</option>
                                <option value="reciter">Learner</option>
                                <option value="maqamat_expert">Maqamat Expert</option>
                                <option value="tajweed_expert">Tajweed Expert</option>
                            </select>
                            
                            

                                </div>
                                 <div style={{display:"flex", flexDirection:"column",flex:"1"}}>
                                    <label style={{display:"block",padding:"15px 0px 5px 0px"}}>Country</label>
                            <select value={user? `${user.Country}`:""} onChange={(e)=> setUser({...user, Country:e.target.value})}   style={{backgroundColor:"#ffdf9e",border:"solid 2px #064e3b", width:"100%",borderRadius:"6px",padding:"10px",border:"solid 1px black",}}>
                                <option value="">Select Country</option>
                                {countries.map((country)=>(
                                    <option key={country.code}value={country.name}>{country.name}</option>
                                ))}
    
                            </select>
                            
                            

                                </div>
                                

                            </div>
                            <div style={{paddingTop:"15px"}}>
                                <button onClick={saveProfile} style={{ cursor:"pointer", width:"30%",padding:"10px",borderRadius:"8px",fontSize:"15px",backgroundColor:"#064e3b",border:"none",color:"#fff2dd"}}>Save Changes</button>

                            </div>
                            

                            

                        



                    </div>

                </div>
            
        </div>
    </div>
    );
}

export default Profile;