from django.urls import path
from . import views
from . import api
urlpatterns = [
    path("",views.index,name="index"),
    path("prb",views.prb,name="prb"),
    path("frnds",views.frnds,name="friends"),
    path("code/<int:id>",views.codespace,name="code"),
    path("code",views.codespace,name="code"),
    path("register",views.register,name="register"),
    path('',views.index,name="index"),
    path("login",views.Login,name="login"),
    path("logout",views.Logout,name="logout"),
    path("get_questions",api.get_questions,name="get_questions"),
    path('messages',views.messages,name="messages"),
    path('msg_send_group',views.send_msg_group,name="msg_send_group"),
    path('msg_send',views.send_msg,name="msg_send"),
    path('profile',views.profile,name="profile"),
   path('get_status',views.get_status,name="get_status"),
    path("update_stats",views.update_stats,name="update_stats"),
    path('profile/<int:id>',views.profile,name="profile"),
    path("messages_group",views.messages_group,name="messages_group"),
    path("data",views.find_data ,name="data"),
    path('connect',views.connect,name="connect"),
    path("preview",views.preview,name="preview"),
    path("new_prb",views.new_prb,name="new_prb"),
    path("alter_connections",views.alter_connections,name="alter_connections"),
    path("solved_ques",views.solved_ques,name="solved_ques"),
    path('group/<int:id>',views.group,name="group"),
    path('submit_group',views.submit_group,name="submit_group"),
    path("update_profile",views.update_profile,name="update_profile"),
    path('alerts',views.alerts , name ="alerts"),
    path('submit_question',views.submit_question , name="submit_question")
    
]
