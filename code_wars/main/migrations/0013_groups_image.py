# Generated by Django 5.0.1 on 2024-02-15 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_rename_message_group_chat_messages'),
    ]

    operations = [
        migrations.AddField(
            model_name='groups',
            name='image',
            field=models.TextField(default='https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?cs=srgb&dl=pexels-pixabay-206359.jpg&fm=jpg'),
            preserve_default=False,
        ),
    ]
