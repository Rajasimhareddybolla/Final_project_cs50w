document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("#dot").onclick = function(){
        document.querySelector("#nav").style.transition = "filter 1.0s";
        document.querySelector(".section-1").style.transition = "filter 1.5s";
        document.querySelector("#main").style.transition = "filter 2s";
        document.querySelector("#nav").style.filter = "blur(5px)";
        document.querySelector(".section-1").style.filter = "blur(5px)";
        document.querySelector("#main").style.filter = "blur(5px)";
        document.querySelector("#sidebar").style.display="flex";
        document.querySelector("#sidebar").style.position="fixed";
        document.querySelector("#sidebar").style.zIndex=1;
    };

});