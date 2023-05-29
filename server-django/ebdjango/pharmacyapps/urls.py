from .views import MedView, process_payment
from rest_framework import routers
from django.urls import path
from .views import MedView, process_payment, get_task_outputs_api
from django.views.decorators.csrf import csrf_exempt
from django.urls import re_path

from django.urls import re_path




urlpatterns = [
    path('medicamentos/', MedView.as_view({'get': 'list', 'post': 'create'}), name='medicamentos-list'),
    path('medicamentos/<int:pk>/', MedView.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='medicamentos-detail'),
    #path('process-payment/', process_payment, name='process-payment'),
    path('process-payment2/', csrf_exempt(process_payment), name='process-payment2'),
    path('process-payment/', csrf_exempt(get_task_outputs_api),name='process-payment'),
    #path('ws/step_function/', StepFunctionConsumer.as_asgi()),
   
]

