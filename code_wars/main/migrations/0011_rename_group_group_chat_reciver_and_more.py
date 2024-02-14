# Generated by Django 5.0.1 on 2024-02-14 19:07

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_groups_group_title'),
    ]

    operations = [
        migrations.RenameField(
            model_name='group_chat',
            old_name='group',
            new_name='reciver',
        ),
        migrations.RenameField(
            model_name='group_chat',
            old_name='sender',
            new_name='user',
        ),
        migrations.AddField(
            model_name='group_chat',
            name='time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
