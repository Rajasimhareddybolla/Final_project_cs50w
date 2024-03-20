colors = ["primary","secondary","success","info","warning","danger","light","dark"]
const data ={"@":"users","#":"Questions","$":"Group"};
document.addEventListener("DOMContentLoaded", function(){
    let intervel = 1;
    let inter = 1;
   
    const code_submission = document.querySelector("#submit_code");
    if (code_submission){
        code_submission.addEventListener("click",(event)=>{
            
            const lang = document.querySelector("#language_selector").value;
            const code = document.querySelector("#text_of_submission").innerText;
            const question = document.querySelector("#heading_title").innerText;
            console.log(question);
            fetch("/submit_question",{
                method:"POST",
                body:JSON.stringify({"question":question,"file_type":lang,"content":code})

            })
            .then(result=>result.json())
            .then(response=>{
                console.log("response");
                console.log(response);
            })
        });
    }

    // let hype = document.querySelector("#hype");
    // if(hype){
    //     let user_name = hype.querySelector("h3").innerText;
    // }
    document.querySelector(".navbar-brand").addEventListener("click", (event) => {
        event.preventDefault();
        fetch("alerts")
            .then(response => response.json())
            .then(result => {
                try {
                    var toast = new bootstrap.Toast(document.getElementById("liveToast"));
                    console.log(result);
                    result = JSON.parse(result);
                    console.log(typeof(result))
    
                    if (result) {
                        console.log(result[0].fields)
                        document.querySelector(".toast-header").innerHTML = result[0].name;
                        document.querySelector(".toast-body").innerHTML = result[0].fields.messages;
                        document.querySelector("#profile_pec").src = result[0].image;
                        toast.show();
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }
            })
            .catch(error => {
                console.error('An error occurred while fetching the alerts:', error);
            });
            /// hear is thata
        fetch("submit_question",{
            method:"POST",
            body:JSON.stringify({"question":"first_test","file_type":"py","content":"import os as o"})}
        )
        .then(response => response.json())
        .then(() => {
            console.log("go and check")
        })
        });
    
    var profile = document.querySelector("#profile_pic");
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
            if(inter){
                console.log("he kdd");
                clearInterval(inter);
            }
            if(intervel){
                clearInterval(intervel);
            }
            document.querySelector("#messeee").style.display="none";

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
    // const opeen_dis = document.querySelector("#open_discussion")
    // if (opeen_dis){
    //     opeen_dis.addEventListener("click",()=>{
    //         const div = document.querySelector(".discussion");
    //         if (div.style.display == "none" ){
    //             document.querySelector("#language_selector").style.display = "none";
    //             document.querySelector("#submit_code").style.display ="none";
    //             document.querySelector("#review").style.display = "none";
    //             document.querySelector("#text_of_submission").style.display = "none";
    //             div.style.display="flex";
    //             opeen_dis.innerHTML = "Close Discussion";
    //         }
    //     });
    // }
    // // text_of_submission .discussion review
    // const open_code_editor = document.querySelector("#open_code_editor")
    // if (open_code_editor){
    //     opeen_dis.addEventListener("click",()=>{
    //         const div = document.querySelector("#text_of_submission");
    //         if (div.style.display == "none" ){
    //             document.querySelector("#language_selector").style.display = "flex";
    //             document.querySelector("#submit_code").style.display ="flex";
    //             document.querySelector("#review").style.display = "none";
    //             document.querySelector(".discussion").style.display = "none";
    //             div.style.display="flex";
            
    //         }

    //     });
    // }
    //     // text_of_submission .discussion review
    //     const review = document.querySelector("#review_form")
    //     if (open_code_editor){
    //         opeen_dis.addEventListener("click",()=>{
    //             const div = document.querySelector("#review");
    //             if (div.style.display == "none" ){
    //                 document.querySelector("#text_of_submission").style.display = "none";
    //                 document.querySelector("#language_selector").style.display = "none";
    //                 document.querySelector("#submit_code").style.display ="none";
    //                 document.querySelector(".discussion").style.display = "none";
    //                 div.style.display="flex";
                
    //             }
    
    //         });
    //     }
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
                let initial = document.querySelector("#Connections");
                initial_f = parseInt(initial.innerHTML);
                    if (alter.innerHTML=="Exit"){
                        console.log(response+"ext");
                        alter.innerHTML = "Connect";
                        c_followrs = initial_f-1;
                    }
                    else{
                        console.log(response+"con");
                        alter.innerHTML = "Exit";
                        c_followrs = initial_f+1;
                    }
                    initial.innerHTML = c_followrs;
                
            }
            
            );

            
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
        console.log("hello world");
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
                document.querySelector("#messeee").style.display="flex";
                if (intervel){
                    clearInterval(intervel);
                }
                event.stopPropagation();
                msg_manneager(element);
                intervel =  setInterval(()=>{
                    msg_manneager(element);
                },5000);
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
                if(inter){
                    clearInterval(inter);
                }
                if(intervel){
                    clearInterval(intervel);
                }
                setInterval(() => {
                  inter=  msg_manneager(group,true)
                }, 5000);
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
            let type =localStorage.getItem("type");
            if(type=="group"){
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
                const tmp = document.createElement("li")
                let div = document.createElement("div");
                div.className = "raja";
                const span = document.createElement("span")
                const span2 = document.createElement("span")
                span2.className = "time";
                span.innerHTML =new_msg;
                let now = new Date();
                const time = now.getHours()+":"+now.getMinutes();
                const div2 = document.createElement("div");
                div2.className = "time_name";
                span2.innerHTML= time;
                
                tmp.className="list-group-item";
                // if (type == "group" & !(msg.fields.user == reciver_id)){
                //     const spanee = document.createElement("span");
                //     spanee.innerHTML = msg.fields.user;
                //     spanee.style.fontSize = "70%";
                //     spanee.style.paddingTop = "10px";
                //     spanee.style.paddingRight = "10px";
                //     div2.appendChild(spanee);
                // }
                div2.appendChild(span2)
                tmp.appendChild(span)
                tmp.appendChild(div2)
                div.appendChild(tmp)
                document.querySelector("#ul_friends").appendChild(div);
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
            setTimeout(update_time, 5000);   
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
