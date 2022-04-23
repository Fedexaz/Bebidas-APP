const app = require('./src/server');

app.listen(process.env.PORT || 3001, () => {
    console.log(`servidor funcionando en puerto ${process.env.PORT || 3001}`)
})