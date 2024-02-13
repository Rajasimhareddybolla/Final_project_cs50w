from django.urls import path
from . import views
from . import api
urlpatterns = [
    path("",views.index,name="index"),
    path("prb",views.prb,name="prb"),
    path("frnds",views.frnds,name="friends"),
    path("code",views.codespace,name="code"),
    path('  ',views.register,name="register"),
    path("login",views.Login,name="login"),
    path("logout",views.Logout,name="logout"),
    path("test",views.test,name="test"),
    path("get_questions",api.get_questions,name="get_questions"),
]
