from rest_framework import serializers
from .models import Application
class ApplicationSerializer(serializers.ModelSerializer):
    citizen_name=serializers.CharField(source="citizen.get_full_name",read_only=True)
    officer_name=serializers.CharField(source="officer.get_full_name", read_only=True)
    class Meta:
        model=Application
        fields=["id","citizen","citizen_name","service","description","document","status","remark","officer","officer_name","created_at","updated_at"]
        read_only_fields=["id","citizen","status","officer","created_at","updated_at"]
class ApplicationUpdateSerializer(serializers.ModelSerializer):
    """Used by officers to approve / reject an application."""
    class Meta:
        model=Application
        fields=["status","remark"]