from django.contrib import admin
from .models import BMIRecord

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'age' , 'height' , 'weight' , 'mobile_number' , 'bmi' , 'bmi_category')

admin.site.register(BMIRecord, UserProfileAdmin)