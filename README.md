# NewTownDogs

to run in docker:
Frontend
|
|\_\_package.json

Change line 5 from:
"proxy": "http://localhost:3001/",
to:
"proxy": "http://backend:3001/",

    This keeps the app from continuously calling itself and getting stuck in the container.
    This now sends a request to the container called backend running on port 3001.
    Mostly an issue because of the proxy setup.

cd backend:
docker-compose up

cd frontend in separate bash terminal:
docker-compose up
