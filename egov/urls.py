from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from users.views import oauth_success
urlpatterns=[path("api/auth/token/",TokenObtainPairView.as_view(),name="token_obtain"),path("api/auth/token/refresh/",TokenRefreshView.as_view(),name="token_refresh"),
             path("api/auth/social/",include("social_django.urls",namespace="social")),path("api/auth/social/done/",oauth_success,name="oauth_done"),
             path("api/users/",include("users.urls")),path("api/applications/",include("applications.urls")),path("api/notifications/",include("notifications.urls"))]