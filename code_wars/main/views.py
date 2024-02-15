from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.db.models import Q
import json
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render
from django.urls import reverse
from django.core import serializers # can able to convert a object like django model into json used in apis
from django import forms
import os
from . import admin
from .models import User,session_active,Questions,Chats,Stats,Groups,Group_chat
from django.shortcuts import redirect
from  django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
import random
# Create your views here.
#defining a form 

def Login(request):
    if request.method == "POST":
        name = request.POST["username"]
        password = request.POST["password"]
        user1 = authenticate(request, username=name, password=password) 
        #it check the login creditionals with the User class data which is in our models
        if user1:
            user2 = User.objects.get(username = name)
            if user2.is_superuser:
                admin.active =True #it activate the admin site
            
            login(request,user1) #it attach the user to the current session
            new = session_active(user = request.user)
            new.save()
            return redirect('index')
    return render(request,"main/login.html") #yet to devolp

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "main/register.html", {   #pending direct to the register page 
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "main/register.html", {
                "message": "Username already taken."
            })
        login( request,user)
        return redirect("index")
    else:
        return render(request, "main/login.html")
def index(request):
    if request.user.is_authenticated:
        questions = Questions.objects.all()
        question = questions.order_by('-date')
        question = question[:8]
        # paginator = Paginator(questions,10)
        # page_num = request.GET.get('page')
        # page_obj = paginator.get_page(page_num)
        return render(request,"main/index.html",{
            'questions':question,
        }) 
    return redirect("login")
def prb(request):
    if request.user.is_authenticated:
        return render(request,"main/problem.html",{
            'questions':Questions.objects.all()
        })
    return redirect("login")
def frnds(request):
    if request.user.is_authenticated:
        user =User.objects.get(pk = request.user.pk)
        follwers = user.connections.all()
        groups = user.group_name.all()
        return render(request,"main/friends_con.html",{"followers":follwers,"groups":groups})
    return redirect("login")
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def handle_uploaded_file(f, user, title):
    # Get the file extension
    extension = os.path.splitext(f.name)[1]
    user = "uploads/"+user
    # Create the directory if it doesn't exist
    os.makedirs(os.path.join(BASE_DIR, user), exist_ok=True)

    # Construct the full file path
    file_path = os.path.join(BASE_DIR, user, f"{title}{extension}")

    # Write the file
    with open(file_path, 'wb') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
class Upload_file(forms.Form):
    file = forms.FileField()

def codespace(request,id=1):
    if request.user.is_authenticated:
        question = Questions.objects.get(id = id)
        if request.method == "POST":
            title = request.POST["title"]
            print("i am uploading"+title)
            form = Upload_file(request.POST,request.FILES)
            if form.is_valid():
                handle_uploaded_file(request.FILES["file"],request.user.username,title)  
                return redirect("index")
            else:
                print(form.errors)
        form = Upload_file()
        return render(request,"main/codespace.html",{
            'question':question
            ,"form":form
        })
    return redirect("login")

def Logout(request):

    logout(request)
    return redirect('login')
@csrf_exempt
def messages(request):
    id =json.loads(request.body)
    print(id)
    id = id["reciver"]
    reciver = User.objects.get(id = id)
    messages = Chats.objects.filter(Q(Q(user = request.user) &  Q(reciver=reciver)) | Q(Q(user = reciver) &  Q(reciver=request.user) ))
    print("i am ")
    messages = messages.order_by("time")
    js = serializers.serialize('json',messages)
    
    return JsonResponse(js,safe=False)
@csrf_exempt
def send(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        msg = data["msg"]
        id = int(data["id"])
        reciver = User.objects.get(id = id)
        chat = Chats(user = request.user,reciver = reciver,messages = msg)
        chat.save()
        return JsonResponse({"message":"sucess"})
    return redirect("index")
@csrf_exempt
def update_stats(request):
    if request.method == "POST":
        response = json.loads(request.body)
        id = int(response["id"])
        difficulty = int(response["difficulty"])
        acceptance = int(response["acceptance"])
        tricky = int(response["tricky"])
        question = Questions(id= id )
        try:
            stats = Stats.objects.get(Question= question)
            stats_no = stats.no+1
        except :
            stats = Stats(Question = question,Difficulty=0,Acceptance=0,Tricky=0,no=0)
            stats_no =1
        
        difficulty_up = (stats.Difficulty+difficulty)/(stats_no)
        acceptance_up = (stats.Acceptance+acceptance)/(stats_no)
        tricky_up = (stats.Tricky+tricky)/(stats_no)
        stats.Acceptance = acceptance_up
        stats.Difficulty = difficulty_up
        stats.Tricky = tricky_up
        stats.no = stats_no
        stats.save()
        return JsonResponse({"message":"sucess"},safe=False)
    
def profile(request,id="raja"):
    if (id=="raja"):
        user = User.objects.get(id = request.user.id)   
        data_set = {"username":user.username,"problems_solved":user.ques_solved.all(),"connections":user.connections.all().count(),"q_no":user.ques_solved.all().count(),"root": True}
   
        return render(request,"main/profile.html",{
            'user':data_set,
    })     
    else:
        user = User.objects.get(id = id)
        if request.user in user.connections.all():
            connected = True
        else:
            connected = False
        print(connected)
    data_set = {"username":user.username,"problems_solved":user.ques_solved.all(),"connections":user.connections.all().count(),"q_no":user.ques_solved.all().count(),'is_connected': connected,"id":id}
    return render(request,"main/profile.html",{
        'user':data_set,
        
    })

@csrf_exempt
def messages_group(request):
    id =json.loads(request.body)
    print(id)
    id = id["reciver"]
    group = Groups.objects.get(id = id)
    messages = group.group_chat.all()
    print("i am ")
    messages = messages.order_by("time")
    js = serializers.serialize('json',messages)
    
    return JsonResponse(js,safe=False)
@csrf_exempt
def find_data(request):
    response = json.loads(request.body)
    response = response["type"]
    responde = []
    if response == "users":
        data = User.objects.all().values_list("username","id",flat=False)
    elif response == "Questions":
        data = Questions.objects.all().values_list("Question_title","id",flat=False)
    else:
        data = Groups.objects.all().values_list("group_title","id")
    for chunk in data:
        responde.append((chunk[1], chunk[0]))
    print(responde)
    return JsonResponse(responde,safe=False)
@csrf_exempt
def connect(request):
    if request.method == "POST":
        print("hello")
        response = json.loads(request.body)
        type = response["type"]
        print(response)
        user = User.objects.get(id = request.user.id)
        person = User.objects.get(id = int(response["id"]))
        if type == "u":
            user.connections.remove(person)
        elif type == "f":
            user.connections.add(person)
        return redirect("index")
    print("error")
@csrf_exempt
def preview(request):
    response = json.loads(request.body)
    type = response["type"]
    id = response["id"]
    id = id[-1]
    result={}
    if type == "Group":
        print(response)
        group = Groups.objects.get(id = id)
        result["img"] = group.image
        if request.user in group.group_members.all():
            result["connect"] = True
        else:
            result["connect"]= False
        result["members"] =  group.group_members.all().count()
    if type == "Friend":
        userr = User.objects.get(id = id)
        result["img"]  = userr.image
        if request.user in userr.connections.all():
            result["connect"] = True
        else:
            result["connect"] = False
        result["members"] = userr.connections.all().count()
    if type == "Question":
        ques = Questions.objects.get(id = id)
        ques["discription"] = Questions.objects.get(id = id)
        result['name'] = ques.Question_title
        result["dis"] = ques.Question_discription
        result['solved'] = ques.solved_by.all().count()
    return JsonResponse(result,safe=False)
@csrf_exempt
def alter_connections(request):
     if request.method == "POST":
        response = json.loads(request.body)
        type = response["type"]
        id = response["id"]
        state = response["state"]
        print(response)
        user = User.objects.get(id = request.user.id)
        if type == "Friend":
            person = User.objects.get(id = int(response["id"]))
            if state == "u":
                user.connections.remove(person)
            elif state == "f":
                user.connections.add(person)
        if type == "group":
            group = Groups.objects.get(id = id)
            if state == "u":
                group.group_members.remove(user)
            elif state == "f":
                group.group_members.add(user)
        return JsonResponse("hurray",safe=False)
