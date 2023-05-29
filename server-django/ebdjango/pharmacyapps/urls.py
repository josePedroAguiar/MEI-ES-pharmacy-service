from .views import MedView, run_scenario, get_tasks
from rest_framework import routers
from django.urls import path
from django.views.decorators.csrf import csrf_exempt






urlpatterns = [
    path('medicamentos/', MedView.as_view({'get': 'list', 'post': 'create'}), name='medicamentos-list'),
    path('medicamentos/<int:pk>/', MedView.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='medicamentos-detail'),
   path('run-scenario/', run_scenario, name='run_scenario'),
    path('get-tasks/', get_tasks, name='get_tasks'),
]

