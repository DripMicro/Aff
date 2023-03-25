```

cd FocusOption 

FocusOption/FocusOption-main/site/func/func_debug.php
edit to connect to external database

remove mysqlaffiliatets from FocusOption/FocusOption-main/docker-compose.yml 

Add SQL logs in FocusOption/FocusOption-main/site/func/func_debug.php L43
set to true 

docker build -f ./.Dockerfile -t affiliatets .

docker compose -f ./docker-compose.yml up -d
docker compose down

https://affiliatets.vm/admin/

## Add to host file

C:\Windows\System32\drivers\etc\hosts
/etc/hosts

10.0.0.7 affiliatets.vm
# 10.0.0.7 dev

docker exec -it affiliatets /bin/bash
docker exec -it affiliatets cat log.log




# docker exec -it  affiliatetsdb /bin/bash

docker run -it -v /home/muly/FocusOption/db:/db focusoption_mysqlaffiliatets /bin/bash

# mysql ... from railway connect

mysql connection string 
FocusOption/FocusOption-main/site/common/database.php

// $ss->db_hostname 	= 	"affiliatetsdb";
// $ss->db_username	= 	"root";
// $ss->db_password 	= 	"root";
// $ss->db_name 		= 	"affiliatets";
$ss->db_hostname 	= 	"207.246.242.156";
$ss->db_username	= 	"445094_devsite";
$ss->db_password 	= 	"gf638j@hfjY";
$ss->db_name 		= 	"445094_devsite";


 
```