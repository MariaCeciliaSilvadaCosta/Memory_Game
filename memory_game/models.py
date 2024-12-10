from django.db import models
from django.contrib.auth.models import User

class Partida(models.Model):
    jogador = models.ForeignKey(User, on_delete=models.CASCADE)
    tentativas = models.IntegerField()
    tempo = models.IntegerField()
    data_hora = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Jogador: {self.jogador.username} - Tentativas: {self.tentativas} - Tempo: {self.tempo} s - Data/Hora: {self.data_hora}"
