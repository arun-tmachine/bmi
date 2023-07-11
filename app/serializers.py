from .models import BMIRecord
from rest_framework import serializers


class BMIRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = BMIRecord
        fields = '__all__'