from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from pharmacyapps.models import medicamentos
from .serializers import MedSerializer
from django.http import JsonResponse
import boto3
from django.conf import settings
import time
import logging
import json
from botocore.exceptions import ClientError

arn_execution = "" 

class MedView(viewsets.ModelViewSet):
    
    queryset = medicamentos.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = MedSerializer

from rest_framework.authentication import SessionAuthentication

class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # Ignorar verificação CSRF


logger = logging.getLogger(__name__)
    

def get_task_outputs(execution_arn):
    client = boto3.client('stepfunctions', region_name='us-east-1')

    response = client.get_execution_history(
        executionArn=execution_arn,
        reverseOrder=True
    )

    events = response['events']
    task_outputs = {}

    for event in events:
        if event['type'] == 'TaskStateExited':
            task_name = event['stateExitedEventDetails']['name']
            task_output = event['stateExitedEventDetails'].get('output', None)

            if task_output:
                if isinstance(task_output, str):
                    task_outputs[task_name] = task_output
                else:
                    try:
                        task_output = json.loads(task_output)
                        task_body = task_output.get('body', None)
                        if task_body:
                            task_outputs[task_name] = task_body
                    except json.JSONDecodeError:
                        task_outputs[task_name] = task_output
            
            # Armazena apenas a saída da última tarefa concluída
            if task_name == 'DeliverItems':
                break
            
    return task_outputs



 
def get_task_outputs_api(request):
    # Lógica para obter os outputs dos eventos da Step Functio
  
    #Arn_execution =  arn_execution # Obtém o arnExecution
    task_outputs = get_task_outputs(arn_execution)
    print(task_outputs)
    return JsonResponse(task_outputs)
    # Retorna os outputs como uma resposta JSON
   



def process_payment(request):
    # Lógica para processar o pagamento

    # Após o pagamento ser efetuado com sucesso, inicie a Step Functions para o robot
    
    step_functions = boto3.client('stepfunctions', region_name='us-east-1')
    response = step_functions.start_execution(
        stateMachineArn='arn:aws:states:us-east-1:048532038912:stateMachine:RobotWorkFlow',
        input='{}'  
    )
    arn_execution = response['executionArn']  # Obtém o arnExecution
    #arn_execution= 'arn:aws:states:us-east-1:048532038912:execution:RobotWorkFlow:5579d7b2-b47b-4af6-93ea-45cd2c5f45d0'
    print(".............................")
    print(arn_execution)
    
    while True:
        response = step_functions.describe_execution(executionArn=arn_execution)
        status = response['status']

        if status == 'SUCCEEDED':
            task_outputs = get_task_outputs(arn_execution)

            if task_outputs:
                for output in task_outputs.values():
                    if isinstance(output, str):
                        body = json.loads(output)
                        if 'body' in body:
                            response_data = body['body'].strip('"').strip()
                            print(response_data)
                            string=response_data
                            #return JsonResponse(response_data, safe=False)

                    elif isinstance(output, dict):
                        if 'body' in output:
                            response_data = output['body'].strip('"').strip()
                            string=response_data
                            print(response_data)
                            #return JsonResponse(response_data, safe=False)

            print('Step Function execution succeeded.')
            break
        elif status == 'FAILED' or status == 'TIMED_OUT' or status == 'ABORTED':
            print('Step Function execution failed.')
            break
        elif status == 'RUNNING':
            print('Step Function is still running...')
            # Optional: You can process the output of each task here
            task_outputs = get_task_outputs(arn_execution)

            for task_name, output in task_outputs.items():
                if isinstance(output, str):
                    body = json.loads(output)
                    if 'body' in body:
                        response_data = body['body'].strip('"').strip()
                        print(response_data)
                        string=response_data
                        #return JsonResponse(response_data, safe=False)
                elif isinstance(output, dict):
                    if 'body' in output:
                        response_data = output['body'].strip('"').strip()
                        print(response_data)
                        string=response_data
                        #return JsonResponse(response_data, safe=False)

        time.sleep(5)

    # Return an appropriate response if the loop exits without returning a JsonResponse
    return JsonResponse({'message': 'Pagamento efetuado com sucesso'})

       
# Create your views here.
