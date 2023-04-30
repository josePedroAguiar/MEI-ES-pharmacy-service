docker run -p 8000:8000 -d amazon/dynamodb-local
docker run --name pharmacyDB -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -d -p 5432:5432 postgres:latest