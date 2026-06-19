from django.urls import path
from .views import RegisterView, UserListView, UserDetailView, MeView
urlpatterns=[path("register/",RegisterView.as_view(),name="register"),path("",UserListView.as_view(),name="user_list"),
             path("me/",MeView.as_view(),name="me"),path("<int:pk>/",UserDetailView.as_view(),name="user_detail")]