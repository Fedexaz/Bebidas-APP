const app = require('./src/server');
//const save = require('./src/UTILS/saveToDB');

app.listen(process.env.PORT || 3001, () => {
    console.log(`servidor funcionando en puerto ${process.env.PORT || 3001}`);
    //save();
})