from django.contrib import admin
from .models import User,Questions,group_question,Solved_ques,Stats,Groups,Chats,Group_chat,Tags,session_active
# Register your models here.
admin.site.register(User)
admin.site.register(session_active)
admin.site.register(Questions)
admin.site.register(group_question)
admin.site.register(Group_chat)
admin.site.register(Stats)
admin.site.register(Solved_ques)
admin.site.register(Groups)
admin.site.register(Chats)
admin.site.register(Tags)