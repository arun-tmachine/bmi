from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from app import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'BMIRecord', views.BMI_Record, 'app')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    #path('', TemplateView.as_view(template_name='index.html')),
]