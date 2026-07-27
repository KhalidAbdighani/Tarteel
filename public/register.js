let inputss= document.querySelectorAll(".container input")
console.log(inputss)
let namebox = document.getElementById("namebox");
let lastbox = document.getElementById("lastbox");
let emailbox = document.getElementById("emailbox");
let pssbox = document.getElementById("pssbox");
let s=submit = document.getElementById("Submit")
let form =document.querySelector(".formm")
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^[a-zA-Z0-9!@#$%^&*]+$/;


form.addEventListener(`submit`, async(e)=>{ 
    
    
    e.preventDefault(); 
   
    const userinfo ={ 
        First: namebox.value,
        Last: lastbox.value,
        Email: emailbox.value,
        Password: pssbox.value
    }
        if(userinfo.First=="" || userinfo.Last=="" || userinfo.Email==""|| userinfo.Password==""){
            Swal.fire({
            icon: "error",
            title: "Hata!",
            text: "You Must FilL Up All Data"
            
            });
            
        }else if(!emailRegex.test(emailbox.value)) {
             Swal.fire({
            icon: "error",
            title: "Hata!",
            text: "You Must Enter Available Email"
            });
            
        }else if(!passRegex.test(pssbox.value)){
              Swal.fire({
            icon: "error",
            title: "Hata!",
            text: "Only use english letters and numbers"
            });


        }else if(pssbox.value.length<8 || pssbox.value.length>20){
            Swal.fire({
            icon: "error",
            title: "Hata!",
            text: "Password should be more than 7 and less than 20 letters"
            });

        }else  {
                try{

        
       
        const {data,status}= await axios.post("/register", userinfo)
        if(status===200){
        const { value: verificationCode } = await Swal.fire({
        title: data.msg,
        input: "text",
        inputPlaceholder: "Enter your Verification Number",
        inputAttributes: { maxlength: "6" }
    });
    
     if(verificationCode){
        try{
               const codeResponse= await axios.post("/otp" ,{code: verificationCode,Email: emailbox.value })
        
        if(codeResponse.status===200){
        Swal.fire({ 
        title: "your account was verified successfully",
        text: `${codeResponse.data}`,
        icon: "success"
        });
        } 
        } catch(err){
             Swal.fire({
            icon: "error",
            title: "Hata!",
            text:  typeof err.response.data === "object" ? err.response.data.msg : err.response.data
            });

        }
         
        }
}
     
    } catch(err){
         Swal.fire({
            icon: "error",
            title: "Hata!",
            text:  err.response.data
            });
 
        
    }

            }

   

   
if(namebox.value == "" &&lastbox.value == "" &&emailbox.value == "" &&pssbox.value == "" ){
        submit.style.backgroundColor= "rgb(137, 200, 255)";
        submit.style.cursor="not-allowed"
    }})



function boxover(){
    this.style.outline="1px solid rgb(0, 179, 255) "
}

function boxleave(){
    if(this!== document.activeElement){
         this.style.outline=""; 

    }
    }


    function boxover2(){
    this.style.outline="1px solid rgb(0, 179, 255) "
}

    function boxleave2(){
                this.style.outline=""; 
    }
        



window.onload=function(){
    namebox.focus();

}
Subcolor=()=>{
    if(namebox.value !== "" &&lastbox.value !== "" &&emailbox.value !== "" &&pssbox.value !== "" ){
        submit.style.backgroundColor= "rgb(24, 147, 255)";
        submit.style.cursor="pointer"
    }else{
        submit.style.backgroundColor= "rgb(137, 200, 255)";
        submit.style.cursor="not-allowed"
    }
}
submit.onmouseenter = () => {
       if(namebox.value !== "" &&lastbox.value !== "" &&emailbox.value !== "" &&pssbox.value !== "" ){
            submit.classList.add("active-hover"); 

    }


}

submit.onmouseleave = () => {
    submit.classList.remove("active-hover"); 
    submit.style.transition = "0.3s";

}
namebox.onmouseenter=boxover
lastbox.onmouseenter=boxover
emailbox.onmouseenter=boxover
pssbox.onmouseenter=boxover

namebox.onmouseleave=boxleave
lastbox.onmouseleave=boxleave
emailbox.onmouseleave=boxleave
pssbox.onmouseleave=boxleave

namebox.onfocus=boxover2
lastbox.onfocus=boxover2
emailbox.onfocus=boxover2
pssbox.onfocus=boxover2


namebox.onblur=boxleave2
lastbox.onblur=boxleave2
emailbox.onblur=boxleave2
pssbox.onblur=boxleave2

namebox.oninput = Subcolor;
lastbox.oninput = Subcolor;
emailbox.oninput = Subcolor;
pssbox.oninput = Subcolor;


