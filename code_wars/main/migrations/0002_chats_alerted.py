# Generated by Django 5.0.2 on 2024-02-29 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chats',
            name='alerted',
            field=models.BooleanField(default=True),
        ),
    ]
