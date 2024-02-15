from django.urls import path
from . import views
from . import api
urlpatterns = [
    path("",views.index,name="index"),
    path("prb",views.prb,name="prb"),
    path("frnds",views.frnds,name="friends"),
    path("code/<int:id>",views.codespace,name="code"),
    path("code",views.codespace,name="code"),

    path('',views.register,name="register"),
    path("login",views.Login,name="login"),
    path("logout",views.Logout,name="logout"),
    path("get_questions",api.get_questions,name="get_questions"),
    path('messages',views.messages,name="messages"),
    path('msg_send',views.send,name="send"),
    path('profile',views.profile,name="profile"),
    path("update_stats",views.update_stats,name="update_stats"),
    path('profile/<int:id>',views.profile,name="profile"),
    path("messages_group",views.messages_group,name="messages_group"),
    path("data",views.find_data ,name="data"),
    path('connect',views.connect,name="connect"),
    path("preview",views.preview,name="preview"),
    path("alter_connections",views.alter_connections,name="alter_connections")
]
tmp = [{"model": "main.chats", "pk": 1, "fields": {"user": 1, "reciver": 2, "messages": "hello raja", "time": "2024-02-12T14:25:18.765Z", "Reaction": "love"}}, {"model": "main.chats", "pk": 2, "fields": {"user": 1, "reciver": 2, "messages": "this is second message", "time": "2024-02-13T11:42:47.163Z", "Reaction": "skull"}}, {"model": "main.chats", "pk": 3, "fields": {"user": 1, "reciver": 3, "messages": "this is raja and expecting you are reddy", "time": "2024-02-13T11:48:55.372Z", "Reaction": "bat"}}]