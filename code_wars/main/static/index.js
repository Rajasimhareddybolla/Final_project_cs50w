colors = ["primary","secondary","success","info","warning","danger","light","dark"]

document.addEventListener("DOMContentLoaded", function(){
    function remove(class_name){
        document.querySelectorAll(class_name).forEach((element)=>{
            element.parentNode.removeChild(element);
        });
    }
    function msg_manneager(element){
        console.log(element.innerHTML);
        console.log(element.dataset.id);
       
        fetch('messages',{
            method : "POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({"reciver":element.dataset.id})
            }
            )
            .then(result => result.json())
            .then(response=>{
                console.log(typeof(JSON.parse(response)));
                remove(".raja");
                for (msg of JSON.parse(response)){
                    document.querySelector("#messageInput").setAttribute('data-id' , element.dataset.id);
                    document.querySelector("#card-title3").innerHTML=element.innerHTML;
                    const tmp = document.createElement("li")
                    const div = document.createElement("div")
                    div.className="raja";
                    const span = document.createElement("span")
                    const span2 = document.createElement("span")
                    span.innerHTML =msg.fields.messages;
                    const time =  msg.fields.time.slice(11,16);
                    span2.innerHTML= time;
                    console.log(msg);
                    tmp.className="list-group-item";
                    tmp.appendChild(span)
                    tmp.appendChild(span2)
                    div.appendChild(tmp)
                    document.querySelector("#ul_friends").appendChild(div);
                }
            });
    }

    const elements = document.getElementsByClassName("friends");
    for (const element of elements) {

        element.addEventListener("click", () => {
           msg_manneager(element);
        });
    }
    const msg_bar = document.querySelector("#messageInput")
    msg_bar.addEventListener('keypress',(eve)=>{
        if (eve.key==="Enter"){
            eve.preventDefault();
            console.log(msg_bar.value);
            new_msg = msg_bar.value;
            msg_bar.value = "";
            msg_bar.style.placeholder = "enter your message";
            fetch('msg_send',{
                method:"POST",
                body:JSON.stringify({"msg":new_msg,"id":msg_bar.getAttribute("data-id")})
                }
            )
            .then(result=>result)
            .then(result=>{
            });

        }
    });
       

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
