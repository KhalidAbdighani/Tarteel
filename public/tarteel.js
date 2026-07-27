let box1 = document.getElementById("box1")
let box2 = document.getElementById("box2")
let submit = document.getElementById("submit")


let eror= document.createElement("p")
let form =document.querySelector(".form")

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^[a-zA-Z0-9!@#$%^&*]+$/;
Subcolor=()=>{
    if(box1.value !== "" &&box2.value !== "" ){
    submit.style.backgroundColor= "rgb(24, 147, 255)";
    submit.style.cursor="pointer"
    }else{
    submit.style.backgroundColor= "rgb(137, 200, 255)";
    submit.style.cursor="not-allowed"
    }
    }
submit.onmouseenter = () => {
    if(box1.value !== "" &&box2.value !== ""){
    submit.classList.add("active-hover"); // أضف التنسيق
    }
}

submit.onmouseleave = () => {
    submit.classList.remove("active-hover"); // شيل التنسيق
    submit.style.transition = "0.3s";

}
box1.oninput=Subcolor
box2.oninput=Subcolor


eror.innerHTML="email must have at least 8 character"
eror.style.fontSize=("12px")
eror.style.color="rgb(247, 128, 0)"

form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const userinfo={
        Email: box1.value,
        Password: box2.value
    }
    if(!emailRegex.test(box1.value)) {
             Swal.fire({
            icon: "error",
            title: "Hata!",
            text: "You Must Enter Available Email"
            }); 
        }else if(!passRegex.test(box2.value)){
              Swal.fire({
            icon: "error",
            title: "Hata!",
            text: "Only use english letters and numbers"
            });


        }else if(box2.value.length<8 || box2.value.length>20){
            Swal.fire({
            icon: "error",
            title: "Hata!",
            text: "Password should be more than 7 and less than 20 letters"
            });

        }else{


            
            try{
            const {data}= await axios.post("/login",userinfo)

              
                    Swal.fire({ // عرض البيانات الي كتبتها في الباك اند
                    title: "Sumitted successfully!",
                    text: `${data.msg} ${data.username}`,
                    icon: "success",
                    timer: 2000, // يغلق تلقائياً بعد ثانيتين
                    showConfirmButton: false
                    }) .then(()=>{
                        window.location.href="http://localhost:3000"
                    })
                    

                }

            catch(err){

                Swal.fire({
            icon: "error",
            title: "Hata!",
            text: err.response.data
            });
            }


        }
    

})












