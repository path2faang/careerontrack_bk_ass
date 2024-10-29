## Overview
This project is a two-way voice-based conversational AI system built as a web application. It allows users to engage in real-time spoken conversations with an AI character, such as a career advisor or chatbot, capable of responding via synthesized voice. The application captures the user’s speech, transcribes it, and generates a spoken AI response, creating a fluid and engaging interaction.

### To help you understand the system, I highly recommend you view the UI/UX designer of the system [here](https://www.figma.com/design/3dSzQgEKr93tvYTxuI3AoE/CareerTrack-Assessment?node-id=0-1&t=DUfo0ZhH6a36o5bT-1) 


## Usage:
Use `git pull <url_copy>` or download the file and navigate to the root project directory. Run `yarn install` to install project's required packages.
After installation, proceed with the required below.

## REQUIREMENTS:
create etc/secrets folder in the project root directory to handle dynamic variable secrets. You'll have to create dev.env and prod.env for development and production on the fly. Please consider using the one in the example.env to `TEST` only. Please edit where necessary.


## ENV VARIABLES KEYS:
`COOKIE_SECRET`, `DB_URL`(must be mongo), `GOOGLE_CLIENT_ID`, `GOOGLE_SECRET`, `GOOGLE_CALLBACK_URL`, `CLIENT_DOMAIN_URL`, `ACCESS_TOKEN_SECRET`, and `REFRESH_TOKEN_SECRET`


finally run `yarn run dev` for starting the application in dev mode or `yarn run start` to deploy.


## HOW TO DEPLOY IN CLOUD DEPLOYMENT PLATFORM LIKE RENDER.
### Pre-requisite:
Must have a github account, and a working copy of this project's repository in your git.

Then Create account with [Render](https://dashboard.render.com/login) and head to `Web Service` deployment to create new project deployment. Then you'll be asked to connect your github account to seamlessly deploy. After connecting, Please choose the project, it'll be authorized and redirected to the deployment section for continuous deployment. Then you have to scroll to the down to add your secret env file. Finally, deploy freely.

# WARNING:
You may experience server delayed spinning since render free package sets that as an advantage to limit users to testing purpose only