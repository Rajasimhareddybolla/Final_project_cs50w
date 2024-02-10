from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def index(request):
    return render(request,"main/index.html")
def prb(request):
    return render(request,"main/problem.html")
def frnds(request):
    return render(request,"main/friends_con.html")
def codespace(request):
    return render(request,"main/codespace.html")