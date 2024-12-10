from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse
from django.utils import timezone
from .models import Partida

def index(request):
     return render(request, 'index.html')
 
def logout_view(request):
    logout(request)
    return redirect('index')
 
@login_required(login_url='login')  
def jogo_memoria(request):
    return render(request, 'jogoMemoria.html')

def ranking(request):
    partidas = Partida.objects.order_by('tentativas', 'tempo', '-data_hora')
    return render(request, 'ranking.html', {'partidas': partidas})

@login_required(login_url='login')  
def salvar_partida(request):
    if request.method == 'POST':
        jogador = request.user
        tentativas = request.POST.get('tentativas')
        tempo = request.POST.get('tempo')
        
        Partida.objects.create(
            jogador=jogador,
            tentativas=int(tentativas),
            tempo=int(tempo),
            data_hora=timezone.now()
        )
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error', 'message': 'Método inválido'})

def register_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        password_confirm = request.POST['password_confirm']

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Usuário já existe.')
        elif password != password_confirm:
            messages.error(request, 'As senhas não coincidem.')
        elif len(password) < 6:
            messages.error(request, 'A senha deve ter pelo menos 6 caracteres.')
        else:
            user = User.objects.create_user(username=username, password=password)
            user.save()
            messages.success(request, 'Cadastro realizado com sucesso! Faça login.')
            return redirect('login')  

    return render(request, 'register.html')
    
    