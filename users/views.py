from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import redirect
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer,UserCreateSerializer
class IsAdmin(permissions.BasePermission):
    def has_permission(self,request,view):
        return request.user.is_authenticated and request.user.role=="admin"
class RegisterView(generics.CreateAPIView):
    """POST/api/users/register/—public, creates citizen account"""
    queryset=User.objects.all()
    serializer_class=UserCreateSerializer
    permission_classes=[permissions.AllowAny]
class UserListView(generics.ListAPIView):
    """GET/api/users/—admin only"""
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAdmin]
class UserDetailView(generics.RetrieveUpdateAPIView):
    """GET/PATCH/api/users/<id>/—admin can change roles"""
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAdmin]
class MeView(APIView):
    """GET/api/users/me/—returns current user profile"""
    def get(self,request):
        return Response(UserSerializer(request.user).data)
def oauth_success(request):
    """Called after social-auth completes. Issues JWT and redirects to frontend."""
    if request.user.is_authenticated:
        refresh=RefreshToken.for_user(request.user)
        access=str(refresh.access_token)
        return redirect(f"http://localhost:5173/?token={access}")
    return redirect("http://localhost:5173/?error=auth_failed")