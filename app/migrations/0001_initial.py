# Generated by Django 4.2.3 on 2023-07-10 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BMIRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('age', models.PositiveIntegerField()),
                ('height', models.FloatField()),
                ('weight', models.FloatField()),
                ('mobile_number', models.CharField(max_length=20)),
                ('bmi', models.FloatField()),
                ('bmi_category', models.CharField(max_length=20)),
            ],
        ),
    ]
