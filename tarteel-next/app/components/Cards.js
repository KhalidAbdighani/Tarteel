import "./Dashboard.css"
import React from 'react';
import { SlHeart } from "react-icons/sl";
import { SlBubble } from "react-icons/sl";
import { SlControlPlay } from "react-icons/sl";



 function Cards ({First, Surah, imgurl, onplay,audiourl,cardPlaying, bodyimg, Last}){
    return(
        <div className="AllCards">
            <div className={`CardDiv ${cardPlaying? "active-border":""} `} >
                
      
            <div className="info">
                <div className="foto">
                    <img src={imgurl}/>
                </div>
                <div className="content">
                <h3>{Surah}</h3>
                <p>{First} {Last}</p>
                </div>
            </div>


            <div className="Vid">
                <button onClick={onplay} style={{cursor:"pointer"}}>
                    <SlControlPlay/>
                </button>
                <img src={bodyimg} className="bigfoto"></img>



            </div>
            <div className="foter">
                 <button>
                    <SlBubble/>
                </button>
            

                 <button>
                    <SlHeart/>
                </button>
                

              


            </div>

            </div>
        
        
    </div>

    )
    

}
export default Cards