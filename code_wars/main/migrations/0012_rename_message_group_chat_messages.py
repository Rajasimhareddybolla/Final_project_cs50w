# Generated by Django 5.0.1 on 2024-02-14 19:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_rename_group_group_chat_reciver_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='group_chat',
            old_name='message',
            new_name='messages',
        ),
    ]