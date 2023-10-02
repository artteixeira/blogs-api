const express = require('express');
const { Login, UserRoutes, CategoryRoutes, PostRoutes } = require('./routes');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...
app.use('/login', Login);
app.use('/user', UserRoutes);
app.use('/categories', CategoryRoutes);
app.use('/post', PostRoutes);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
