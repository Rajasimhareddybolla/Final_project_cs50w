// colors = ["primary","secondary","success","info","warning","danger","light","dark"]

// document.addEventListener("DOMContentLoaded", function(){
        
//     function remove(class_name){
//         document.querySelectorAll(class_name).forEach((element)=>{
//             element.parentNode.removeChild(element);
//         });
//     }
//     const card = document.querySelector("#carddee");
//     function showcard (element){
//             const head = element.textContent.trim()
//             card.querySelector("h5").innerHTML = head;
//             card.querySelector("p").innerHTML="i am working ";
//             card.style.display = "flex";                
//     }
//     function msg_manneager(element){

//     }
//     const elements = document.querySelectorAll(".friends");
//     console.log(elements);
//     for (const element of elements) {
//         element.addEventListener("click", () => {
//                     element.querySelector("img").addEventListener("click",()=>{
//             showcard(element);
//         });
//         let reciver = element.dataset.id; 
//         fetch('messages',{
//             method : "POST",
//             headers:{
//                 'Content-type':'application/json'
//             },
//             body:JSON.stringify({"reciver":reciver})
//             }
//             )
//             .then(result => result.json())
//             .then(response=>{
//                 remove(".raja");
//                 remove(".gajala");
//                 for (msg of JSON.parse(response)){
//                     document.querySelector("#messageInput").setAttribute('data-id' , element.dataset.id);
//                     document.querySelector("#card-title3").innerHTML=element.innerHTML;
//                     const tmp = document.createElement("li")
//                     const div = document.createElement("div")
//                     if (msg.fields.user == reciver){
//                         div.className = "gajala"   // for the recived msg
//                     }
//                     else{
//                         div.className = "raja";    // for the sent msg
//                     }
//                     const span = document.createElement("span")
//                     const span2 = document.createElement("span")
//                     span.innerHTML =msg.fields.messages;
//                     const time =  msg.fields.time.slice(11,16);
//                     span2.innerHTML= time;
//                     span2.className = "time";
//                     tmp.className="list-group-item";
//                     tmp.appendChild(span)
//                     tmp.appendChild(span2)
//                     div.appendChild(tmp)
//                     document.querySelector("#ul_friends").appendChild(div);
//                 }
//             });
//         });
    // const form =  document.querySelector("#form_submit") ;
    // form.addEventListener("click",(e)=>{
    //     e.preventDefault();
    //     const Difficulty = document.querySelector("#Difficulty_level");
    //     const Acceptance =document.querySelector("#Acceptance_level");
    //     const Tricky = document.querySelector("#Tricky_level");
    //     const id = document.querySelector("#question_id");

    //     console.log(Difficulty);
    //     console.log(Acceptance);
    //     console.log(Tricky);
    //     console.log(id);
    //     fetch("/update_stats",{
    //         method:"POST",
    //         body:JSON.stringify({"id":id.value,"difficulty":Difficulty.value,"acceptance":Acceptance.value,"tricky":Tricky.value})
    //     })
    //     .catch(e=>{
    //         console.log(e);
    //     })
    //     .then(response=>response.json)
    //     .then(result=>{
    //         console.log(result);
    //         document.querySelector("#review").style.display = "none";
    //     })
       
    // });
        // element.querySelector("img").addEventListener("mouseover" , ()=>{
        //     showcard(element);
        // });
        // element.querySelector("img").addEventListener("mouseout" , ()=>{
        //     card.style.display = "none";
        // });


//     }
//     const msg_bar = document.querySelector("#messageInput")
//     msg_bar.addEventListener('keypress',(eve)=>{
//         if (eve.key==="Enter"){
//             eve.preventDefault();
//             new_msg = msg_bar.value;
//             msg_bar.value = "";
//             msg_bar.style.placeholder = "enter your message";
//             fetch('msg_send',{
//                 method:"POST",
//                 body:JSON.stringify({"msg":new_msg,"id":msg_bar.getAttribute("data-id")})
//                 }
//             )
//             .then(result=>result)
//             .then(result=>{

//             });

//         }
//     });
       

//     document.querySelector("#dot").onclick = function(){
//         document.querySelector("#nav").style.transition = "filter 1.0s";
//         document.querySelector(".section-1").style.transition = "filter 1.5s";
//         document.querySelector("#main").style.transition = "filter 2s";
//         document.querySelector("#nav").style.filter = "blur(5px)";
//         document.querySelector(".section-1").style.filter = "blur(5px)";
//         document.querySelector("#main").style.filter = "blur(5px)";
//         document.querySelector("#sidebar").style.display="flex";
//         document.querySelector("#sidebar").style.position="fixed";
//         document.querySelector("#sidebar").style.zIndex=1;
//     };

// });

colors = ["primary","secondary","success","info","warning","danger","light","dark"]
const data ={"@":"users","#":"Questions","$":"Group"};
document.addEventListener("DOMContentLoaded", function(){
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
                div.style.display="flex";
            }
            else{
                div.style.display="none"
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
    
            console.log(Difficulty);
            console.log(Acceptance);
            console.log(Tricky);
            console.log(id);
            fetch("/update_stats",{
                method:"POST",
                body:JSON.stringify({"id":id.value,"difficulty":Difficulty.value,"acceptance":Acceptance.value,"tricky":Tricky.value})
            })
            .catch(e=>{
                console.log(e);
            })
            .then(response=>response.json)
            .then(result=>{
                console.log(result);
                document.querySelector("#review").style.display = "none";
            })
           
        });
    }
  
    if (card){

        function showcard (element){
            const head = element.textContent.trim()
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
                ele.style.display = "flex";
                ele.querySelector('kbd').innerHTML = search.value;
                
                fetch("/preview",{
                    method:'POST',
                    body:JSON.stringify({"id":search.value,"type":"Friend"})
                })
                .then(reason=>reason.json())
                .then(result=>{
                    console.log(result);
                    document.querySelector("#img_for_preview").src = result.img;
                    document.querySelector("#Connections").innerHTML = result.members;
                    document.querySelector("#alter_connections_button").setAttribute("type","Friend");
                    document.querySelector("#alter_connections_button").setAttribute("d",search.value.charAt(search.value.length-1));
                    search.value = ""
                    if (result.connect){
                        document.querySelector("#alter_connections_button").innerHTML = "Un Follow";
                    }
                    else{
                        document.querySelector("#alter_connections_button").innerHTML = "Connect:";
                    }
                });            }
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
                    console.log(result);
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
        });
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
            }else{
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
                        console.log(user);
                        const list = document.createElement("option")
                        list.innerHTML=user[1]+" "+user[0];
                        datalist.appendChild(list);
                    }
                    console.log(search.getAttribute("type"));
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
        if (group){
            url = "messages_group"
        }
        else{
             url = "messages"
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
                console.log(typeof(JSON.parse(response)));
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
                    
                    console.log(msg);
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
    console.log(connect);
    if (!connect){
        connect = document.querySelector("#connect_button");
        type ='f'
    }
    if (connect){
        console.log(connect.value);
        connect.addEventListener('click',(eve)=>{
            eve.preventDefault();
            fetch("/connect",{
                method:"POST",
                body: JSON.stringify({"id":connect.value,"type":type})
            })
            .then(result=>result.json).then(response=>{console.log(response)})
        })
    }
    else{
        console.log("ehdkd");
    }
    const msg_bar = document.querySelector("#messageInput")
    if (msg_bar){

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
                console.log(result);
            });

        }
    });
   }

});