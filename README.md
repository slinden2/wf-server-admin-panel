# wf-server-admin-panel

## Config Environment Variables

- NODE_ENV - development in dev env and production in prod env
- WFAP_PORT - Port number for the web server
- WFAP_DISCORD_CLIENT_ID - From Discord dev portal
- WFAP_DISCORD_CLIENT_SECRET - From Discord dev portal
- WFAP_DISCORD_REDIRECT_URI - From Discord dev portal
- WFAP_JWT_SECRET - Secret string used for JWT auth tokens
- WFAP_ADMIN_DISCORD_ID - Admin users Discord ID
- WFAP_PID_PATH - Path to Wreckfest related files (ie C:\\Wreckfest in production)

## How to start the production build?

1. Install dependencies by running `npm install`
2. Run `npm bundle:build` in `./backend` directory
3. Set all environment variables listed above
4. Run `npm start` in `./backend`
