colors = ["primary","secondary","success","info","warning","danger","light","dark"]
const data ={"@":"users","#":"Questions","$":"Group"};
document.addEventListener("DOMContentLoaded", function(){
    profile = document.querySelector("#profile_pic");
    if (profile){
    fetch("/get_status")
    .then(result=>result.json())
    .then(response=>{
        profile.src = response.image;
        document.querySelector("#profile_name").innerHTML = response.name;
    })}
    const el = document.querySelector("#add_group");
    if (el){
        el.addEventListener("click",()=>{
            document.querySelector("#msg--for").style.display="flex";
            document.querySelector("#msg-section-for").style.display="none";
        });
    }
    profilee =  document.querySelector(".scrollmenu");
    if (profilee){
        profilee.querySelectorAll("img").forEach((element)=>{
            element.addEventListener("click",()=>{
                id = element.dataset.id;
                window.location.href = "/profile/"+id;
            });

        
        });
    }
    const friends_group = document.querySelector(".friends_group");
    if(friends_group){
        friends_group.querySelectorAll("img").forEach((element)=>{
            element.addEventListener("click",()=>{
                id = element.dataset.id;
                window.location.href = "/group/"+id;
            });
        });
    }
    card = document.querySelector("#carddee");
    //modifications
    function remove_option(){
        document.querySelectorAll("option").forEach((ele)=>{
            ele.parentElement.removeChild(ele);
        })
    }
    const opeen_dis = document.querySelector("#open_discussion")
    if (opeen_dis){
        opeen_dis.addEventListener("click",()=>{
            const div = document.querySelector(".discussion");
            if (div.style.display == "none"){
                document.querySelector("#review_form").style.display = "none";
                div.style.display="flex";
                opeen_dis.innerHTML = "Close Discussion";
            }
            else{
                document.querySelector("#review_form").style.display = "flex";
                div.style.display="none"
                opeen_dis.innerHTML = "Open Discussion";
            }
    
        });
    }
    const form =  document.querySelector("#form_submit") ;
    if (form){
        form.addEventListener("click",(e)=>{
            e.stopPropagation();
            e.preventDefault();
            const Difficulty = document.querySelector("#Difficulty_level");
            const Acceptance =document.querySelector("#Acceptance_level");
            const Tricky = document.querySelector("#Tricky_level");
            const id = document.querySelector("#question_id");
            fetch("/update_stats",{
                method:"POST",
                body:JSON.stringify({"id":id.value,"difficulty":Difficulty.value,"acceptance":Acceptance.value,"tricky":Tricky.value})
            })
            .catch(e=>{
            })
            .then(response=>response.json)
            .then(result=>{
                document.querySelector("#review").style.display = "none";
            })
           
        });
    }
  
    if (card){

        function showcard (element){
            const head = element.textContent.trim();
            another_prewiew  = document.querySelector("#caddee");
            if (another_prewiew){
                another_prewiew.style.display = "none";
            }
            card.querySelector("img").src = element.querySelector("img").src;
            card.querySelector("h5").innerHTML = head;
            card.querySelector("p").innerHTML="i am working ";
            card.style.display = "flex";                
    }

    }
    const search  = document.querySelector("#navsearchbar");
    if (search){
        document.querySelector("#search_submit").addEventListener("click",(eve)=>{
            eve.preventDefault();

            const tpe = data[search.getAttribute("type")];
            // const data ={"@":"users","#":"Questions","$":"Group"};
            if (tpe=="users"){
                const ele  = document.querySelector("#caddee");
                is_in_friends = document.querySelector("#msg-section-for");
                if (is_in_friends){
                    ele.style.bottom ="16px";
                    ele.style.right = "18px";
                    ele.style.zIndex = "10";
                }
                else if(profilee){
                        search.value = "disabled";
                        return false;
                }
                ele.style.display = "flex";
                ele.querySelector('kbd').innerHTML = search.value;
                fetch("/preview",{
                    method:'POST',
                    body:JSON.stringify({"id":search.value,"type":"Friend"})
                })
                .then(reason=>reason.json())
                .then(result=>{
                    document.querySelector("#img_for_preview").src = result.img;
                    document.querySelector("#Connections").innerHTML = result.members;
                    document.querySelector("#alter_connections_button").setAttribute("type","Friend");
                    document.querySelector("#alter_connections_button").setAttribute("d",search.value.charAt(search.value.length-1));
                    search.value = ""
                    if (result.connect){
                        document.querySelector("#alter_connections_button").innerHTML = "Exit";
                    }
                    else{
                        document.querySelector("#alter_connections_button").innerHTML = "Connect:";
                    }
                });            
            }
            else if (tpe == "Questions"){
                window.location.href = "code/"+search.value.charAt(search.value.length-1);
            }
            else if (tpe == "Group"){
                const ele  = document.querySelector("#caddee");
                ele.style.display = "flex";
                ele.querySelector('kbd').innerHTML = search.value;
                fetch("preview",{
                    method:'POST',
                    body:JSON.stringify({"id":search.value,"type":"Group"})
                })
                .then(reason=>reason.json())
                .then(result=>{
                    document.querySelector("#img_for_preview").src = result.img;
                    document.querySelector("#Connections").innerHTML = result.members;
                    document.querySelector("#alter_connections_button").setAttribute("type","group");
                    document.querySelector("#alter_connections_button").setAttribute("d",search.value.charAt(search.value.length-1));
                    search.value = ""
                    if (result.connect){
                        ele.querySelector("#alter_connections_button").innerHTML = "Exit";
                    }
                    else{
                        ele.querySelector("#alter_connections_button").innerHTML = "Join Group:";
                    }
                });
            }
    return true
        }
    
        );
        closer = document.querySelector("#close_preview_buttons");
        if (closer){
            closer.addEventListener("click",()=>{
                document.querySelector("#caddee").style.display="none";
            })
        }
        alter = document.querySelector("#alter_connections_button");
        if (alter){
            alter.addEventListener("click",()=>{
            type = alter.getAttribute("type");
            id = alter.getAttribute("d");
            if (alter.innerHTML=="Exit"){
                state = "u";
            }
            else{
                state = "f";
            }
            fetch("/alter_connections",{
                method:"POST",
                body:JSON.stringify({"type":type,"id":id,"state":state})
            })
            .then(result=>{result.response})
            .then(response=>{
                if(state = "u"){
                    alert.innerHTML="Follow Back";
                }
                else{
                    alert.innerHTML="Exit";
                }
            }
            )
            
        })}
        const datalist = document.querySelector("#AutoSugestionslist");

        search.addEventListener("keypress",(eve)=>{

            const first =  search.value.slice(0,1);
            if(first in data){
                remove_option();
                search.value = "";
                fetch("/data",{
                    method:"POST",
                    body:JSON.stringify({"type":data[first]})
                })
                .then(response =>response.json())
                .then(result=>{
                    search.setAttribute("type",first);
                    for (user of result){
                        const list = document.createElement("option")
                        list.innerHTML=user[1]+" "+user[0];
                        datalist.appendChild(list);
                    }
                });
            }
        });
    }
    //showing card over when hover on a pic

    function remove(class_name){
        document.querySelectorAll(class_name).forEach((element)=>{
            element.parentNode.removeChild(element);
        });
    }
    function msg_manneager(element,group=false){
        const reciver_id =element.dataset.id;
        document.querySelector("#msg--for").style.display="none";
        document.querySelector("#msg-section-for").style.display="flex";
        if (group){
            url = "messages_group";
            localStorage.setItem("type","group");
        }
        else{
             url = "messages"
            localStorage.setItem("type","user");
        }
        fetch(url,{
            method : "POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({"reciver":reciver_id})
            }
            )
            .then(result => result.json())
            .then(response=>{
                
                remove(".raja");
                remove(".gajala");
                for (msg of JSON.parse(response)){
                    document.querySelector("#messageInput").setAttribute('data-id' , element.dataset.id);
                    document.querySelector("#card-title3").innerHTML=element.innerHTML;
                    const tmp = document.createElement("li")
                    const div = document.createElement("div")
                    if (msg.fields.user == reciver_id){
                        div.className = "gajala";
                    }
                    else{
                        div.className = "raja";
                    }
                    const span = document.createElement("span")
                    const span2 = document.createElement("span")
                    span2.className = "time";
                    span.innerHTML =msg.fields.messages;
                    const time =  msg.fields.time.slice(11,16);
                    const div2 = document.createElement("div");
                    div2.className = "time_name";
                    span2.innerHTML= time;
                    
                    tmp.className="list-group-item";
                    if (group & !(msg.fields.user == reciver_id)){
                        const spanee = document.createElement("span");
                        spanee.innerHTML = msg.fields.user;
                        spanee.style.fontSize = "70%";
                        spanee.style.paddingTop = "10px";
                        spanee.style.paddingRight = "10px";
                        div2.appendChild(spanee);
                    }
                    div2.appendChild(span2)
                    tmp.appendChild(span)
                    tmp.appendChild(div2)
                    div.appendChild(tmp)
                    document.querySelector("#ul_friends").appendChild(div);
                }
            });
    }

    const elements = document.getElementsByClassName("friends");
    if (elements){
        for (const element of elements) {
            element.querySelector("img").addEventListener("mouseover" , ()=>{
                showcard(element);
            });
            element.querySelector("img").addEventListener("mouseout" , ()=>{
                card.style.display = "none";
            });
            element.addEventListener("click", (event) => {
                event.stopPropagation();
                msg_manneager(element);
            });
        }
    }
    const groups = document.getElementsByClassName("friends_group")
    if (groups){
        for (const group of groups){
            // to be implemented
            // group.querySelector("img").addEventListener("mouseover" , ()=>{
            //     showcard(group);
            // });
            // group.querySelector("img").addEventListener("mouseout" , ()=>{
            //     card.style.display = "none";
            // });
            group.addEventListener("click", (event) => {
                event.stopPropagation();
                msg_manneager(group,true);
            });
        }
    }
    connect = document.querySelector("#dconnect_button");
    type = 'u'
    if (!connect){
        connect = document.querySelector("#connect_button");
        type ='f'
    }
    if (connect){
        connect.addEventListener('click',(eve)=>{
            eve.preventDefault();
            fetch("/connect",{
                method:"POST",
                body: JSON.stringify({"id":connect.value,"type":type})
            })
            .then(result=>result.json).then(response=>{})
        })
    }
    else{
    }
    const msg_bar = document.querySelector("#messageInput")
    if (msg_bar){

    msg_bar.addEventListener('keypress',(eve)=>{
        if (eve.key==="Enter"){
            eve.preventDefault();
            new_msg = msg_bar.value;
            msg_bar.value = "";
            msg_bar.style.placeholder = "enter your message";
            if(localStorage.getItem("type")=="group"){
                url = "/msg_send_group";
            }
            else{
                url = "/msg_send";
            }
            fetch(url,{
                method:"POST",
                body:JSON.stringify({"msg":new_msg,"id":msg_bar.getAttribute("data-id")})
                }
            )
            .then(result=>result)
            .then(result=>{
            });

        }
    });
   }
   time = document.querySelector("#time");
   if(time){
        function update_time(){
            let now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
        
            // Add a zero in front of numbers<10
            hours = checkTime(hours);
            minutes = checkTime(minutes);
            seconds = checkTime(seconds);
        
            time.textContent = hours + ":" + minutes + ":" + seconds;
            
            // Call the function every second to update the time
            setTimeout(update_time, 1000);   
        }
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        update_time();
   }

});
// Auther: Raja simha
