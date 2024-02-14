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
from .models import User,session_active,Questions,Chats,Stats
from django.shortcuts import redirect
from  django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
#defining a form 
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
def test(request):
    if request.method == "POST":
        form = Upload_file(request.POST,request.FILES)
        if form.is_valid():
            title = request.POST["title"]
            handle_uploaded_file(request.FILES["file"],request.user.username,title)  
            return redirect("index")
    else:
        form = Upload_file()
    return render(request,"main/test.html",{"form":form})
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
        new = session_active(user = request.user)
        new.save()
        return redirect("index")
    else:
        return render(request, "main/login.html")
def index(request):
    if request.user.is_authenticated:
        questions = Questions.objects.all()
        # paginator = Paginator(questions,10)
        # page_num = request.GET.get('page')
        # page_obj = paginator.get_page(page_num)
        return render(request,"main/index.html",{
            'questions':questions
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
        follwers = user.follwers.all()
        return render(request,"main/friends_con.html",{"followers":follwers})
    return redirect("login")
def codespace(request,id):
    if request.user.is_authenticated:
        question = Questions.objects.get(id = id)
        return render(request,"main/codespace.html",{
            'question':question
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
        stats = Stats.objects.get(Question= question)
        stats_no = stats.no+1
        difficulty_up = (stats.Difficulty+difficulty)/(stats_no)
        acceptance_up = (stats.Acceptance+acceptance)/(stats_no)
        tricky_up = (stats.Tricky+tricky)/(stats_no)
        stats.Acceptance = acceptance_up
        stats.Difficulty = difficulty_up
        stats.Tricky = tricky_up
        stats.no = stats_no
        stats.save()
        return JsonResponse({"message":"sucess"},safe=False)
    
        