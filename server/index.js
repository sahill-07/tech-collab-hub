const app = require('./app');
require('./wsindex')
require('dotenv').config();

app.listen(process.env.PORT, ()=>{
    console.log(`App listening at http://localhost:${process.env.PORT}`);
})