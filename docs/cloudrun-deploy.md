# Create New Environment

1. Create subnet with /28, do not conflict with other subnets
[https://console.cloud.google.com/networking/networks/details/default?project=api-front-dashbord&pageTab=SUBNETS](https://console.cloud.google.com/networking/networks/details/default?project=api-front-dashbord&pageTab=SUBNETS)
2. Create Serverless VPC Access (use subnet you created before)
[https://console.cloud.google.com/networking/connectors/list?project=api-front-dashbord](https://console.cloud.google.com/networking/connectors/list?project=api-front-dashbord)
3. Create Cloud NAT (if you want restrict for some env)
[https://console.cloud.google.com/net-services/nat/list?project=api-front-dashbord](https://console.cloud.google.com/net-services/nat/list?project=api-front-dashbord)
    1. Select only subnet you created before
    2. Use Static IP for Cloud NAT IP Address
4. Create Artifact Registry Repository 
[https://console.cloud.google.com/artifacts?project=api-front-dashbord](https://console.cloud.google.com/artifacts?project=api-front-dashbord)
    1. select type Docker
5. Setup CI/CD Github Action
    1. Copy existing file cloudrun.yaml, change filename and replace what is needed
6. Add custom domain for new env
    1. Add mapping here → [https://console.cloud.google.com/run/domains?project=api-front-dashbord](https://console.cloud.google.com/run/domains?project=api-front-dashbord)
    2. Verify New Domain
    3. Add record to your DNS with value [`ghs.googlehosted.com`](http://ghs.googlehosted.com/) and record name as your subdomain / domain name