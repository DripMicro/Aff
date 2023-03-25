# Deploy NodeJS/NextJS to Google Cloud Run

We have NextJS application that we want to deploy as cloud run using GitHub action for CI/CD

Note: we cannot use Vercel/Netlify because MySQL allow access only from static IP

- Docker file example
https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
- Set Static IP on cloud run (So can white list on MySQL)
https://cloud.google.com/run/docs/configuring/static-outbound-ip
- GitHub for our nextjs app, (App is in app folder) 
https://github.com/affiliatets-com/aff/app

## Requirements
- We want automatically to be able to deploy on GitHub push to branch
  - main -> production
  - dev -> staging
- Right now each customer get different URL and 
have different MySQL connection string (DATABASE_URL)
and other env variables
  - Production/main
    - affiliate.gamingaffiliates.co
    - affiliate.best-brokers-partners.com
    - can be many more, say around 50...
  - Staging/dev
    - gamingaffiliates.staging.affiliatets.com
    - best-brokers-partners.staging.affiliatets.com
- Deploy should start automatically and success 
only `next build` finished successfully
- on any PR (GitHub pull request) run `yarn confirm` 
and don't let to merge unless it end without errors
- Configure logging so all server logs goes to GCP logs viewer
- Configure secrets, for now only MySQL connection string, 
so they are not stored with code 

## Project Scope
- Create docker file and any other needed configuration file
- Configure CI/CD flow in GitHub
- Connect flow to Google Cloud Run
- Support us with issues like 
  - how auto-scaling work,
  - how to access build logs
  - how to access server logs 
  - other devops issues related to this project  

