import boto3
import json

stepfunctions_client = boto3.client('stepfunctions')

# Define your input data (if required)
input_data = {
    "IsHelloWorldExample": True
}

# Start the Step Functions execution
response = stepfunctions_client.start_execution(
    stateMachineArn='arn:aws:states:us-east-1:364193402281:stateMachine:HelloWorld',
    name='your_execution_name',
    input=json.dumps(input_data)
)

# Handle the response
execution_arn = response['executionArn']
print("Execution started with ARN:", execution_arn)
