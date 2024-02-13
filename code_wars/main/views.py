from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render
from django.urls import reverse
from django import forms
import os
from . import admin
from .models import User,session_active,Questions
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
        paginator = Paginator(questions,10)
        page_num = request.GET.get('page')
        page_obj = paginator.get_page(page_num)
        return render(request,"main/index.html",{
            'questions':page_obj
        }) 
    return redirect("login")
def prb(request):
    if request.user.is_authenticated:
        return render(request,"main/problem.html")
    return redirect("login")
def frnds(request):
    if request.user.is_authenticated:
        return render(request,"main/friends_con.html")
    return redirect("login")
def codespace(request):
    if request.user.is_authenticated:
        question = Questions.objects.get(pk = int(request.POST["id"]))
        return render(request,"main/codespace.html",{
            'question':question
        })
    return redirect("login")


def Logout(request):
    ses = session_active.objects.get(user = request.user)
    ses.delete()
    logout(request)
    return redirect('login')