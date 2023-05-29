from rest_framework.authentication import SessionAuthentication
from http.client import HTTPResponse
from django.shortcuts import render
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
from . import get_started_state_machines


class MedView(viewsets.ModelViewSet):
    queryset = medicamentos.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = MedSerializer


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # Ignore CSRF verification


logger = logging.getLogger(__name__)


def run_scenario(request):
    # Create an instance of the StateMachineScenario class
    print("ola")
    scenario = get_started_state_machines.StateMachineScenario(
        get_started_state_machines.Activity(boto3.client('stepfunctions',region_name='us-east-1')),
        get_started_state_machines.StateMachine(boto3.client('stepfunctions',region_name='us-east-1')),
        boto3.client('iam')
    )

    # Prerequisites setup
    scenario.prerequisites('LabRole')

    # Run the scenario and get the execution ARN
    activity_name = 'test_activity'
    state_machine_name = 'RobotWorkFlow'
    print("maybe here")
    activity_arn = scenario.find_or_create_activity(activity_name)
    print("not stuck in here")
    state_machine_arn = scenario.find_or_create_state_machine(
        state_machine_name, activity_arn)
    execution_arn = scenario.run_state_machine(state_machine_arn, activity_arn)
    print("stuck in here")
    print("Execution ARN:", execution_arn)  # Debugging print

    print("ola")
    
    # Return the execution ARN as JSON response
    return JsonResponse({'execution_arn': execution_arn})


def get_tasks(request):
    # Create an instance of the StateMachineScenario class
    scenario = get_started_state_machines.StateMachineScenario(
        None,
        get_started_state_machines.StateMachine(boto3.client('stepfunctions',region_name='us-east-1')),
        None
    )

    # Get the current and executed tasks from the execution
    state_machine_arn = 'arn:aws:states:us-east-1:869937572605:stateMachine:RobotWorkFlow'
    execution_arn = request.GET.get('execution_arn')

    try:
        tasks = scenario.state_machine.get_tasks(state_machine_arn, execution_arn)
        tasks_list = []

        for task in tasks:
            task_dict = {
                'name': task['name'],
                'output': task['output'],
                'timestamp': task['timestamp']
            }
            tasks_list.append(task_dict)
            dynamodb_client = boto3.client('dynamodb', region_name='us-east-1')
            item = {
                'timestamp': {'S':str(task['timestamp'])},   # Convert year to string and wrap in a dictionary
                'name': {'S':task['name']},      # Wrap title in a dictionary
                'output':{'S':task['output']},
            }

            try:
                response = dynamodb_client.put_item(
                    TableName='states',
                    Item=item
                )
                print(response)
            except ClientError as e:
                print("Error:", e.response['Error']['Message'])

        return JsonResponse({'tasks': tasks_list})
    except Exception as e:
        logger.error("Error getting tasks: %s", str(e))
        return JsonResponse({'error': 'Error getting tasks'}, status=500)
