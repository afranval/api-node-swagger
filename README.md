# API with NodeJS

## Requirements
- NPM >= 6.14.15
- NodeJS >= 14.18.3
- [MongoCloud](https://account.mongodb.com/account/login) (Create MongoDB Cluster)

## Dependencies
- NPM install dependencies
```
npm i
```

## Enviroment vars config
- Create .env file and added next vars
```
PORT=port
DB_USER=user_mongocloud
DB_PASS=pass_mongocloud
DB_NAME=db_mongocloud
DB_HOST=host_mongocloud
```

## Commads for run app
- start with babel
```
npm run start
```
- dev
```
npm run dev
```
- dev babel
```
npm run devbabel
```
## SwaggerUI
- [View the default display port 3000 on your localhost](http://localhost:3000/api-docs)
## For use Postman collection
- [Postman collection](public/apiWithNode.postman_collection.json)