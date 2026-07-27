import "../profile.css";











 async function getuser (user_id){
        const response = await fetch(`http://localhost:5000/showusers2/${user_id}`,
            {
                cache:"no-store"
            }
        ) 
        if(!response.ok){
            return null
        }
            return await response.json()
        



}







export default async function userprofile({params}) {
    const {user_id}= await params;
    const Userdata = await getuser(user_id)

    if(!Userdata){
        console.log("NO USER DATA")
        return (
            
            <div style={{ width:"100%", height:"100VH", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center"}}>
            <div> <h4>Sorry, this page isn't available.</h4></div>
            <div><p>The link you followed may be broken, or the page may have been removed. Go back to Tarteel.</p></div>
            </div>

        )
    }
   

    
return(
    <div className="main">


        <div className="bigbox">

            <div className="avatar">
                <div className="boxAv">
                    <img style={{height:"100%", width:"100%", borderRadius:"200px", objectFit:"cover", objectPosition:"center"}} src={`http://localhost:5000/Avatars/${Userdata.Avatar}`}/>

                </div>

                <div >
                    <button id="btn">Follow</button>


                </div>


            </div>
            
                <div className="info">
                    <h3>{Userdata.First} {Userdata.Last}</h3>
                    <p>{Userdata.Bio && Userdata.Bio !== "undefined" ? Userdata.Bio : ""}</p>
                    <p>{Userdata.Country}</p>
                </div>

                <div className="states">
                    <p> 0 Posts</p>
                    <p> 0 Following</p>
                    <p> 0 Followers</p>

                </div>

















        </div>



    </div>
)

  
    
}