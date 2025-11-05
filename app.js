// app.js
   const express = require('express');
   const swaggerUi = require('swagger-ui-express');
   const swaggerJSDoc = require('swagger-jsdoc');
   const cors = require('cors');

   const app = express();
   const port = 3000;

   // Swagger definition
   const swaggerOptions = {
       swaggerDefinition: {
           openapi: '3.0.0',
           info: {
               title: 'My API',
               version: '1.0.0',
               description: 'API documentation using Swagger',
           },
           servers: [
               {
                   url: `https://friendly-space-giggle-x5r5977xv7q426wqr-3000.app.github.dev/api`,
               },
           ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', 
            },
        },
    },
       },
       apis: ['./routes/*.js'], // Path to your API docs
   };
   // Middleware per il parsing JSON
   app.use(express.json());

   // Mantieni cors() ma aggiungi anche un middleware che imposta sempre le header CORS
   app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true,
}));

   // Middleware esplicito per le header CORS e gestione preflight
   app.use((req, res, next) => {
       const origin = req.headers.origin || '*';
       res.setHeader('Access-Control-Allow-Origin', origin);
       res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
       res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
       res.setHeader('Access-Control-Allow-Credentials', 'true');
       if (req.method === 'OPTIONS') return res.sendStatus(204);
       next();
   });

   const swaggerDocs = swaggerJSDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    const userRoutes = require('./routes/user');
    app.use('/api', userRoutes);

    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running at http://0.0.0.0:${port}`);
    });