import express from 'express';
import { api } from './config/Config.js';
import swaggerDocs from './config/swagger.config.js';
// import { Signale } from 'signale';

// import login from './routes/login.routes.js';
// import local from './routes/local.routes.js';
import user from './routes/users.routes.js';
import post from './routes/post.routes.js'
import reaction from './routes/reaction.routes.js'
import comment from './routes/comment.routes.js'

const app = express();
// const signale = new Signale();

app.use(express.json());


app.use('/api/user', user);
app.use('/api/post',post)
app.use('/api/reaction', reaction)
app.use('/api/comment', comment)

app.listen(api.port,()=>{
    console.log(`Servidor corriento en el puerto => ${api.port}`);
    swaggerDocs(app, api.port);
});