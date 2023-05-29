from decimal import Decimal
import boto3
import json
from botocore.exceptions import ClientError

def create_table(table_name,dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb',region_name='us-east-1')

    table = dynamodb.create_table(
        TableName=table_name,
        KeySchema=[
            {'AttributeName': 'year', 'KeyType': 'HASH'},  # Partition key
            {'AttributeName': 'title', 'KeyType': 'RANGE'}  # Sort key
        ],
        AttributeDefinitions=[
            {'AttributeName': 'year', 'AttributeType': 'N'},
            {'AttributeName': 'title', 'AttributeType': 'S'}
        ],
        ProvisionedThroughput={'ReadCapacityUnits': 10, 'WriteCapacityUnits': 10}
    )
    return table

def add_movie(title, year, plot, rating):
    dynamodb_client = boto3.client('dynamodb', region_name='us-east-1')
    item = {
        'year': {'N': str(year)},   # Convert year to string and wrap in a dictionary
        'title': {'S': title},      # Wrap title in a dictionary
        'info': {"M":{
            'plot': {'S': plot},
            'rating': {'N': str(rating)}
        }}
    }

    try:
        response = dynamodb_client.put_item(
            TableName='test',
            Item=item
        )
        print(response)
    except ClientError as e:
        print("Error:", e.response['Error']['Message'])


if __name__ == '__main__':
    #my_table = create_table("test")
    #my_table.meta.client.get_waiter('table_exists').wait(TableName="my-table")
    #print("Table status:", my_table.table_status)
    # print(my_table.item_count)
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    my_table = dynamodb.Table("test")
    add_movie("INCEPTION3", 2033, "WFMJWPEOGFJEPWOFJRQWEPORFMJQE", 9)
    print(my_table.item_count)


