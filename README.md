# Strawpoll Clone
This is a work in progress [strawpoll](https://strawpoll.me) clone.  
Built with mongodb, express, react, and node along with WebSockets for real-time poll updates.

## Developing
Make sure you have a local mongodb server running. Currently the express server expects it to be on the default port.  

Clone the repo to your local machine and run `npm install`.  

Then in one terminal run:
```
npm run api
```
to start the backend server and in a seperate one
```
npm start
```
to start up the development server for the react frontend.

## License
[MIT](./LICENSE)