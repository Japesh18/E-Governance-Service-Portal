from django.urls import path
from .views import (ApplicationCreateView,AllApplicationsView,MyApplicationsView,ApplicationDetailView)
urlpatterns=[
    path("",ApplicationCreateView.as_view(),name="app_create"),
    path("all/",AllApplicationsView.as_view(),name="app_all"),
    path("mine/",MyApplicationsView.as_view(),name="app_mine"),
    path("<int:pk>/",ApplicationDetailView.as_view(),name="app_detail")
]