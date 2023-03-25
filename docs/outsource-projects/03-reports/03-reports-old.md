# Access legacy systems

#### PHP but with old design for affliate dashbaord, some stuff work only on this version

```
https://go.best-brokers-partners.com/admin/
user: admin
pass: ask
```

once you login to admin, 

select Affiliate->Affiliate List->Search affiliate 500->Login

![login-to-affiliate-dashboard.png](02-screenshots%2Flogin-to-affiliate-dashboard.png)

### Database
to connect to database 

create ./app/.env
ask for the content, include env variable to connect to database

### PHP code

We need to translate all the PHP code under

`https://github.com/affiliatets-com/FocusOption/tree/main/site/affiliate`

Some already converted, see 

`app/src/server/api/routers/affiliates`

### Scope

For now let's look at convert all the reports under PHP code

`FocusOption/site/affiliate/reports`

