from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('isl.urls')),
    path('auth/', include('accounts.urls')),  # 👈 THIS LINE MUST EXIST
]