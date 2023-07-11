

from django.db import models

class BMIRecord(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    height = models.FloatField()
    weight = models.FloatField()
    mobile_number = models.CharField(max_length=20)
    bmi = models.FloatField()
    bmi_category = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.name} - BMI: {self.bmi}"
