import json
import boto3

client = boto3.client("rekognition", region_name="us-east-1")
#session = boto3.Session(profile_name='profile-name')
bucket = "bucket-reko1"
"""
def lambda_handler(event, context):

    file="IMG_0673.jpeg"

    response = client.detect_faces(Image={'S3Object': {'Bucket':bucket, 'Name': file}}, Attributes=['ALL'])

    #Process result
    for face in response [ 'FaceDetails']:
        print(json.dumps(face,indent=2))
"""


def compare_faces(sourceFile, targetFile):
    #imageTarget = open(targetFile, 'rb')
    response = client.compare_faces(
        SimilarityThreshold=80,
        SourceImage={'S3Object': {'Bucket': bucket, 'Name': sourceFile}},
        TargetImage={'Bytes': targetFile.read()}
    )

    for faceMatch in response['FaceMatches']:
        position = faceMatch['Face']['BoundingBox']
        similarity = str(faceMatch['Similarity'])
        print('The face at ' +
              str(position['Left']) + ' ' +
              str(position['Top']) +
              ' matches with ' + similarity + '% confidence')

    return len(response['FaceMatches'])


def rekogntion(source_file,target_file):
    face_matches = compare_faces(source_file, target_file)
    return ("Face matches: " + str(face_matches))

#if __name__ == '__main__':
#   main()

