# Generated by Django 4.0.5 on 2022-07-19 07:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('diary', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AI',
            fields=[
                ('diaryId', models.ForeignKey(db_column='diaryId', on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='diary', serialize=False, to='diary.diary', unique=True)),
                ('image', models.TextField()),
                ('emocomm', models.CharField(max_length=100)),
                ('comment', models.CharField(max_length=200)),
                ('emotion', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'AI',
            },
        ),
    ]