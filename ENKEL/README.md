# Deployment
Create private/public keys using the following commands
```
ssh-keygen -t rsa -b 4096 -m PEM -f auth
openssl rsa -in auth -pubout -outform PEM -out auth.pub
```
Private key lives in the ENKEL dir, public lives in the project root dir (likely will/should change when i get around it it)

Create `.env` file in ENKEL root with the following variables:
```
STRUDAL_DATABASE_HOST=<host>
STRUDAL_DATABASE_PORT=5432
STRUDAL_DATABASE_USERNAME=<master/iam username>
STRUDAL_DATABASE_PASSWORD=<password>
STRUDAL_DATABASE_NAME=STRUDELDB
```

# API
## Login
All requests to the API must be authentication using JWT-based Bearer Authentication.
To retrieve this token, you simply need to POST the following endpoint with your login information.


Endpoint:
```
POST: /login
```

Request:
```json
{
  "emailAddress": "<emailAddress>",
  "password": "<password>"
}
```

Response:
```json
{
  "success": true|false,
  "errorMessage": "<error message>",
  "token": "<auth token>"
}
```

After fetching this token, simply add it as a Bearer Authentication token to every request to ensure you are authenticated.

## Docs
Access Swagger documentation for the API at /api/docs [(BeatTheBot API Docs)](https://beatthebot.co.uk/api/docs)
