from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Notification
from .serializers import NotificationSerializer
class NotificationListView(generics.ListAPIView):
    """GET/api/notifications/—returns current user's notifications"""
    serializer_class=NotificationSerializer
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by("-created_at")
class MarkReadView(APIView):
    """POST/api/notifications/<id>/read/—marks a notification as read"""
    def post(self,request,pk):
        Notification.objects.filter(pk=pk,user=request.user).update(read=True)
        return Response({"status":"marked read"})