from django.urls import path
from django.contrib.auth.views import LoginView
from . import views  

urlpatterns = [
    path('login/', LoginView.as_view(template_name='index.html'), name='login'), 
    path('register/', views.register_view, name='register'), 
    path('memory_game/', views.jogo_memoria, name='jogo_memoria'),
    path('ranking/', views.ranking, name='ranking'), 
    path('logout/', views.logout_view, name='logout'),
    path('salvar_partida/', views.salvar_partida, name='salvar_partida'),  
]