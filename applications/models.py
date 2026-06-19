from django.db import models
from django.conf import settings
class Application(models.Model):
    STATUS_CHOICES=[("pending","Pending"),("approved","Approved"),("rejected","Rejected")]
    citizen=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="applications")
    service=models.CharField(max_length=120)
    description=models.TextField(blank=True)
    document=models.FileField(upload_to="documents/",blank=True,null=True)
    status=models.CharField(max_length=10,choices=STATUS_CHOICES,default="pending")
    remark=models.TextField(blank=True)
    officer= models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True,related_name="reviewed_apps")
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.service}—{self.citizen}[{self.status}]"