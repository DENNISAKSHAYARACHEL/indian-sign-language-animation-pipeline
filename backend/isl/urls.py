from django.urls import path
from .views import english_to_isl_api, multilingual_to_isl_api

urlpatterns = [
    path('english-to-isl/', english_to_isl_api),
    path('multilingual-to-isl/', multilingual_to_isl_api),
]
