let button = document.getElementById("menu");
let list = document.getElementById("hide");

button.onclick = function() {
    // تبديل كلاس الإظهار عند كل ضغطة
    list.removeAttribute("id")
}
list.onclick=function(){
    list.setAttribute("id","hide")
}