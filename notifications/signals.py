from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from applications.models import Application
from .models import Notification
@receiver(post_save,sender=Application)
def notify_on_status_change(sender,instance,created,**kwargs):
    """Fires whenever an Application is saved.
    On status change to approved/rejected:
      1. Creates an in-app Notification for the citizen.
      2. Sends an email to the citizen.
    """
    if created:
        return
    if instance.status in ("approved","rejected"):
        msg=(
            f"Your application for '{instance.service}' has been "
             f"{instance.status}. Remark: {instance.remark or 'N/A'}"
        )
        Notification.objects.create(user=instance.citizen, message=msg)
        send_mail(subject=f"[NationServe] Application {instance.status.capitalize()}",message=msg,from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[instance.citizen.email],fail_silently=True,
        )