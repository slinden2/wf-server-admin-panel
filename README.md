# wf-server-admin-panel

## Config Environment Variables

- NODE_ENV - development in dev env and production in prod env
- WFAP_HTTP_PORT - Port number for the http web server
- WFAP_HTTPS_PORT - Port number for the https web server
- WFAP_DISCORD_CLIENT_ID - From Discord dev portal
- WFAP_DISCORD_CLIENT_SECRET - From Discord dev portal
- WFAP_DISCORD_REDIRECT_URI - From Discord dev portal
- WFAP_DISCORD_WEBHOOK_URI - Webhook URI where the new user notifications are sent
- WFAP_JWT_SECRET - Secret string used for JWT auth tokens
- WFAP_ADMIN_DISCORD_ID - Admin users Discord ID
- WFAP_PID_PATH - Path to Wreckfest related files (ie C:\\Wreckfest in production)
- WFAP_STEAM_API_KEY - Needed for updating player count.
- WFAP_DOMAIN - Domain of the server where the WF servers are running

## How to start the production build?

1. Install dependencies by running `npm install` in `./backend` and `./frontend` directories.
2. Run `npm run bundle:build` in `./backend` directory
3. Set all environment variables listed above
4. Run `npm start` in `./backend`
