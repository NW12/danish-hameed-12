## Assumption
I have assumed that query based on continuation parameter will return us unique record. I have analyze records based on validFrom and validUntil parameter there were some records with new-order but one of the validfrom and validUntill param was null. These was no field with key name validTo so we have used validUntil.
I have created two controller files, 

```
nft.controller.js
```

nft.controller.js   (This file contains processing regarding Activity.)


```
Hit this api  (http://localhost:8080/api/nft)
```
 
and this will create activity table listing based on continuation paramter. Code will execute and insert all data in activity table untill it ends. 

```
token.controller.js
```
token.controller.js  (This file contains processing regarding newly added listings and token table.)
I have setup cron job in this file which will hit after 5 min interval and insert records in token table based on required condition. 
We can setup a new config table in which we can keep recods for last inserted record related to activity table when need to run cron job after specific interval.So that next time we can skip already processed data. 
 

## Project setup
```
npm install
```

### Run
```
node server.js
```

I have used this boilerplate for working and updated DB queries and other library as per test need. 
(https://www.bezkoder.com/node-js-express-sequelize-mysql/)
