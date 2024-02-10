from django.urls import path
from . import views
urlpatterns = [
    path("",views.index,name="index"),
    path("prb",views.prb,name="prb"),
    path("frnds",views.frnds,name="friends"),
    path("code",views.codespace,name="code")
]
