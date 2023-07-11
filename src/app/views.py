from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BMIRecordSerializer
from .models import BMIRecord

# Create your views here.

class BMI_Record(viewsets.ModelViewSet):
    serializer_class = BMIRecordSerializer
    queryset = BMIRecord.objects.all()














from django.shortcuts import render, redirect, get_object_or_404
from .models import BMIRecord

def bmi(request):
    return render(request, 'bmi.html')

def calculate_bmi(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        age = request.POST.get('age')
        height = float(request.POST.get('height'))
        weight = float(request.POST.get('weight'))
        mobile_number = request.POST.get('mobileNumber')

        # Calculate BMI
        height = height / 100  # Convert height from centimeters to meters
        bmi = weight / (height * height)

        # Categorize BMI
        bmi_category = get_bmi_category(bmi)

        # Save data in the database
        bmi_record = BMIRecord.objects.create(
            name=name,
            age=age,
            height=height,
            weight=weight,
            mobile_number=mobile_number,
            bmi=bmi,
            bmi_category=bmi_category)
        
        bmi_record.save()

        # Redirect to a new page for displaying the result
        return redirect('bmi_result', record_id=bmi_record.id)
    else:
        return render(request, 'bmi.html')

def bmi_result(request, record_id):
    record = get_object_or_404(BMIRecord, id=record_id)

    # Determine the appropriate image URL based on BMI category
    if record.bmi_category == 'Underweight':
        image_url = 'underweight_image.jpg'
    elif record.bmi_category == 'Normal':
        image_url = 'normal_image.jpg'
    elif record.bmi_category == 'Overweight':
        image_url = 'overweight_image.jpg'
    else:  # BMI category is 'Obese'
        image_url = 'obese_image.jpg'

    context = {
        'record': record,
        'image_url': image_url
    }
    return render(request, 'bmi_result.html', context)


def get_bmi_category(bmi):
    if bmi < 18.5:
        return 'Underweight'
    elif bmi < 25:
        return 'Normal'
    elif bmi < 30:
        return 'Overweight'
    else:
        return 'Obese'


