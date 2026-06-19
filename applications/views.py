from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser,FormParser
from .models import Application
from .serializers import ApplicationSerializer,ApplicationUpdateSerializer
class IsOfficerOrAdmin(permissions.BasePermission):
    def has_permission(self,request,view):
        return request.user.is_authenticated and request.user.role in ("officer","admin")
class ApplicationCreateView(generics.CreateAPIView):
    """POST/api/applications/—citizen submits a new application"""
    serializer_class=ApplicationSerializer
    parser_classes=[MultiPartParser,FormParser]
    def perform_create(self, serializer):
        serializer.save(citizen=self.request.user)
class MyApplicationsView(generics.ListAPIView):
    """GET/api/applications/mine/—citizen sees their own applications"""
    serializer_class=ApplicationSerializer
    def get_queryset(self):
        return Application.objects.filter(citizen=self.request.user).order_by("-created_at")
class AllApplicationsView(generics.ListAPIView):
    """GET/api/applications/all/—officer / admin sees all (filterable by status)"""
    serializer_class=ApplicationSerializer
    permission_classes=[IsOfficerOrAdmin]
    def get_queryset(self):
        qs=Application.objects.all().order_by("-created_at")
        status_filter=self.request.query_params.get("status")
        if status_filter:
            qs=qs.filter(status=status_filter)
        return qs
class ApplicationDetailView(generics.RetrieveUpdateAPIView):
    """GET+PATCH/api/applications/<id>/—officer approves/rejects"""
    queryset=Application.objects.all()
    def get_serializer_class(self):
        if self.request.method in ("PATCH","PUT"):
            return ApplicationUpdateSerializer
        return ApplicationSerializer
    def get_permissions(self):
        if self.request.method in ("PATCH","PUT"):
            return [IsOfficerOrAdmin()]
        return [permissions.IsAuthenticated()]
    def perform_update(self,serializer):
        serializer.save(officer=self.request.user)