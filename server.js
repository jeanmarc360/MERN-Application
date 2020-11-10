import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/database.config';
import apiRoutes from './api-routes';

class Server{
    constructor(){
        this.app = express();
        this.init();
    }

    init(){
        this.app.use(bodyParser.urlencoded({
            extended: true
         }));
        this.app.use(bodyParser.json());

        this.app.use('/api', apiRoutes);
               
        mongoose.connect(config.url, {
            useNewUrlParser: true
        }).then(() => {
            console.log("Successfully connected to the database");    
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            //process.exit();
        });
        mongoose.set('useCreateIndex', true);
        this.app.listen(config.apiPort, config.host, () => {
            console.log(`Running RestApp on ==>  http://${config.host}/${config.apiPort}`);
       });
    }
}
export default new Server();
