"""
Django settings for E-Governance Portal
Tech stack: Django, MongoDB (via djongo), OAuth 2.0 (via social-auth-app-django)
"""
from pathlib import Path
import os
from datetime import timedelta
BASE_DIR=Path(__file__).resolve().parent.parent
SECRET_KEY=os.environ.get("DJANGO_SECRET_KEY", "change-me-in-production")
DEBUG=os.environ.get("DEBUG", "True") == "True"
ALLOWED_HOSTS=["*"]
INSTALLED_APPS=["django.contrib.contenttypes","django.contrib.auth","django.contrib.sessions","django.contrib.messages","django.contrib.staticfiles",
                "rest_framework","rest_framework_simplejwt","corsheaders","social_django","users","applications","notifications"]
MIDDLEWARE=["corsheaders.middleware.CorsMiddleware","django.middleware.security.SecurityMiddleware","django.contrib.sessions.middleware.SessionMiddleware",
            "django.middleware.common.CommonMiddleware","django.middleware.csrf.CsrfViewMiddleware","django.contrib.auth.middleware.AuthenticationMiddleware",
            "django.contrib.messages.middleware.MessageMiddleware"]
ROOT_URLCONF="egov.urls"
TEMPLATES=[
    {
        "BACKEND":"django.template.backends.django.DjangoTemplates",
        "DIRS":[],
        "APP_DIRS":True,
        "OPTIONS":{
            "context_processors":["django.template.context_processors.request","django.contrib.auth.context_processors.auth","django.contrib.messages.context_processors.messages"],
        },
    }
]
WSGI_APPLICATION="egov.wsgi.application"
DATABASES={
    "default":{
        "ENGINE":"djongo",
        "NAME":os.environ.get("MONGO_DB_NAME","egovern_db"),
        "CLIENT":{
            "host":os.environ.get("MONGO_URI","mongodb://localhost:27017"),
        },
    }
}
REST_FRAMEWORK={
    "DEFAULT_AUTHENTICATION_CLASSES":["rest_framework_simplejwt.authentication.JWTAuthentication"],
    "DEFAULT_PERMISSION_CLASSES":["rest_framework.permissions.IsAuthenticated"],
    "DEFAULT_PAGINATION_CLASS":"rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
}
SIMPLE_JWT={"ACCESS_TOKEN_LIFETIME":timedelta(hours=8),"REFRESH_TOKEN_LIFETIME":timedelta(days=7),"ROTATE_REFRESH_TOKENS":True}
AUTHENTICATION_BACKENDS=["social_core.backends.google.GoogleOAuth2","django.contrib.auth.backends.ModelBackend"]
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY=os.environ.get("GOOGLE_CLIENT_ID","")
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET=os.environ.get("GOOGLE_CLIENT_SECRET","")
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE=["openid","email","profile"]
LOGIN_REDIRECT_URL="/api/auth/social/done/"
CORS_ALLOW_ALL_ORIGINS=True
STATIC_URL="/static/"
STATIC_ROOT=BASE_DIR/"staticfiles"
MEDIA_URL="/media/"
MEDIA_ROOT=BASE_DIR/"media"
AUTH_USER_MODEL="users.User"
DEFAULT_AUTO_FIELD="django.db.models.BigAutoField"
DEFAULT_FROM_EMAIL=os.environ.get("DEFAULT_FROM_EMAIL","noreply@nationserve.in")
EMAIL_BACKEND="django.core.mail.backends.console.EmailBackend"