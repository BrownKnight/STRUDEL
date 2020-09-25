# Doc
Coming Soon (Probably)

# Deployment
Create private/public keys using the following commands
```
ssh-keygen -t rsa -b 4096 -m PEM -f auth.private.pem
openssl rsa -in auth.private.pem -pubout -outform PEM -out auth.public.pem
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