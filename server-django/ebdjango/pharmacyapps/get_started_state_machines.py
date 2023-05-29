# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0

"""
Purpose

Shows how to use the AWS SDK for Python (Boto3) with AWS Step Functions to
do the following:

1. Create an activity.
2. Create a state machine from an Amazon States Language definition that contains the
previously created activity as a step.
3. Run the state machine and respond to the activity with user input.
4. Get the final status and output after the run completes.
5. Delete resources created by the example.
"""

import json
import logging
import sys

import boto3
from botocore.exceptions import ClientError
from .activities import Activity
from .state_machines import StateMachine



logger = logging.getLogger(__name__)
class StateMachineScenario:
    """Runs an interactive scenario that shows how to get started using Step Functions."""

    def __init__(self, activity, state_machine, iam_client):
        """
        :param activity: An object that wraps activity actions.
        :param state_machine: An object that wraps state machine actions.
        :param iam_client: A Boto3 AWS Identity and Access Management (IAM) client.
        """
        self.activity = activity
        self.state_machine = state_machine
        self.iam_client = iam_client
        self.state_machine_role = None

    def prerequisites(self, state_machine_role_name):
        trust_policy = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "",
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "states.amazonaws.com"
                    },
                    "Action": "sts:AssumeRole"
                }
            ]
        }
        try:
            role = self.iam_client.get_role(RoleName=state_machine_role_name)
        except ClientError as err:
            if err.response['Error']['Code'] == 'NoSuchEntity':
                role = None
            else:
                logger.error(
                    "Couldn't get prerequisite IAM role %s. Here's why: %s: %s",
                    state_machine_role_name,
                    err.response['Error']['Code'], err.response['Error']['Message'])
                raise
        if role is None:
            try:
                role = self.iam_client.create_role(
                    RoleName=state_machine_role_name,
                    AssumeRolePolicyDocument=json.dumps(trust_policy)
                )
            except ClientError as err:
                logger.error(
                    "Couldn't create prerequisite IAM role %s. Here's why: %s: %s",
                    state_machine_role_name,
                    err.response['Error']['Code'], err.response['Error']['Message'])
                raise
        self.state_machine_role = role['Role']

    def find_or_create_activity(self, activity_name):
        print("estou aqui")
        activity_arn = self.activity.find(activity_name)
        if activity_arn is None:
            activity_arn = self.activity.create(activity_name)
        print("estou aqui22")
        return activity_arn

    def find_or_create_state_machine(self, state_machine_name, activity_arn):
        state_machine_arn = self.state_machine.find(state_machine_name)
       
        return state_machine_arn

    def _customize_state_machine_definition(self, state_machine_def):
        # Customize the state machine definition to match your robot project
        # Modify the steps and states as needed
        # For example, add steps for the robot to collect items and wait for confirmation
        customized_def = state_machine_def.replace(
            'CUSTOM_STEP_1', 'CollectItemsStep')  # Replace with your own step name
        customized_def = customized_def.replace(
            'CUSTOM_STEP_2', 'WaitForConfirmationStep')  # Replace with your own step name
        return customized_def

    def run_state_machine(self, state_machine_arn, activity_arn):
        print(1111111111)
        user_name = "User"  # Set the user name as needed
        print(11111)
        run_input = {'name': user_name}
        print(11111)
        run_arn = self.state_machine.start(state_machine_arn, json.dumps(run_input))
        print(111111)
        action = None
        """while action != 'done':
            print(1)
            activity_task = self.activity.get_task(activity_arn)
            print(11111)
            task_input = json.loads(activity_task['input'])
            print(11111)
            action = task_input['actions'][0]  # Replace with appropriate logic to determine the action
            print(1111)
            task_response = {'action': action}
            print(1111)
            self.activity.send_task_success(activity_task['taskToken'], json.dumps(task_response))
            print(11)"""
        return run_arn

    def finish_state_machine_run(self, run_arn):
        status = 'RUNNING'
        while status == 'RUNNING':
            run_status = self.state_machine.describe_execution(run_arn)
            status = run_status['status']
            time.sleep(1)
        return run_status['output']

    def cleanup(self, state_machine_name, state_machine_arn, activity_name, activity_arn, state_machine_role_name):
        self.state_machine.delete(state_machine_arn)
        self.activity.delete(activity_arn)
        self.state_machine.delete_role(state_machine_role_name)
