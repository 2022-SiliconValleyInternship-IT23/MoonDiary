# Generated by Django 4.0.5 on 2022-07-27 05:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AI', '0003_remove_ai_emocomm'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ai',
            name='comment',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='ai',
            name='emotion',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
