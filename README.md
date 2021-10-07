# Quiz App

this web applications is built using NodeJs and Angular. 

## Guide

### prerequisite
 * NodeJs
 * MongoDB


### Installation

* Clone the repository  
    `$ git clone https://github.com/ShashiSrinath/ng-quiz-app.git`


 
* Create a new file named `.env` in `project_root/server` folder


* Enter your credentials in the `.env` file    
    DATABASE_URL=mongodb+srv://[username]:[password]@[host]/quiz-app?retryWrites=true&w=majority  
    SESSION_SECRET=secretkey  
    SESSION_MAX_AGE=86400000


* Navigate to the project root and type  
   `$ npm install`
* run below command to build the application  
  `$ npm run build`
* start the application with following command  
  `$ npm run start`
