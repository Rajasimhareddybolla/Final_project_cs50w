import datetime
from django.db import models
from datetime import date, timedelta
from django.contrib.auth.models import AbstractUser
no = {i*10:i*10 for i in range(0,11)}
reactions = (("love","❤️"),( "smile","😂"),("Robot", "🦾"),( "skull","💀"), ("celebrate","🥳"),("bat" ,"🏏"))
class User(AbstractUser, models.Model):
    # score = models.IntegerField(default=0, choices=no)
    connections = models.ManyToManyField("self", blank=True)
    image = models.TextField(default ="https://images.unsplash.com/photo-1533228876829-65c94e7b5025?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGxpZmV8ZW58MHx8MHx8fDA%3D")
    bio = models.TextField(default = "I am a developer")
class Questions(models.Model):
    Question_title = models.CharField(max_length = 65)
    Question_discription = models.TextField(null=False)
    input1 = models.CharField(null = False,max_length = 64)
    output1 =  models.CharField(null = False,max_length = 64)
    input2 = models.CharField(null = False,max_length = 64)
    output2 =  models.CharField(null = False,max_length = 64)
    User = models.ForeignKey(User, on_delete=models.CASCADE,related_name = "author")
    date = models.DateTimeField(auto_now_add=True)

class Tags(models.Model):
    question = models.ForeignKey(Questions, on_delete=models.CASCADE,related_name = "tags_for_question")
    Choices = {
        "Languages": {"Python":"Python", "Java":"Java", "C":"C", "C++":"C++", "Kotlin":"Kotlin", "R":"R","FRONT-END": "FRONT-END"},
        "frameworks": {"Django":"Django", "Flask":"Flask", "Arrays":"Arrays", "List":"List", "String":"String", "Tupel":"Tupel"}
    }
    tags_tecnology = models.CharField(max_length=255, choices=Choices["Languages"])
    tags_frameworks = models.CharField(max_length=255, choices=Choices["frameworks"])

class Solved_ques(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name = "ques_solved")
    Questions = models.ForeignKey(Questions, on_delete=models.CASCADE,related_name ="solved_by")
    timestamp = models.DateTimeField(auto_now=True)
    note = models.TextField()
    path = models.CharField(default = "uploads/username/filename.format name",max_length = 255)

class Stats(models.Model):
    Question = models.ForeignKey(Questions, on_delete=models.CASCADE,related_name="stats_question")
    Difficulty = models.IntegerField(choices=no)
    Acceptance = models.IntegerField(choices=no)
    Tricky = models.IntegerField(choices=no)
    no = models.IntegerField(null = True)

class Groups(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE,related_name = "group_owned")
    group_members = models.ManyToManyField(User,related_name="group_name")
    group_title =  models.CharField(max_length = 64)
    group_discription = models.TextField()
    rules = models.CharField(max_length=255)
    image = models.TextField()
    Questions = models.ManyToManyField(User,through="group_question",related_name="Group_name")
class group_question(models.Model): #this is for group discussion or answers or likes like that
    Group = models.ForeignKey(Groups,on_delete=models.CASCADE)
    member = models.ForeignKey(User,on_delete=models.CASCADE)
    question = models.ForeignKey(Questions,on_delete=models.CASCADE)
    comment = models.TextField()
    time = models.DateTimeField(auto_now=True)

class Chats(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name="user_chats")
    reciver = models.ForeignKey(User, on_delete=models.CASCADE,related_name = "msg_from")
    messages = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
    Reaction = models.TextField(choices = reactions,blank = True)

class Group_chat(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name = "sender_chat")
    reciver = models.ForeignKey(Groups,on_delete=models.CASCADE,related_name = "group_chat")
    messages = models.CharField(max_length=255)
    time = models.DateTimeField(auto_now_add=True)
    Reaction = models.TextField(choices = reactions)
class session_active(models.Model):
    user = models.ForeignKey(User, related_name="active_sessions",on_delete= models.CASCADE)
    session_started = models.DateTimeField(auto_now=True)

    def session_valid(self):
        if self.session_started + timedelta(days=2) < datetime.now():
            return True
        self.delete()
        return False