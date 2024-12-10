# Generated by Django 5.1 on 2024-09-03 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Partida',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jogador', models.CharField(max_length=100)),
                ('tentativas', models.IntegerField()),
                ('tempo', models.IntegerField()),
                ('data_hora', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]