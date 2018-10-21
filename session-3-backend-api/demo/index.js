const express = require('express');
const app = express();

app.get('/random', (req, res)=>{
	let myJSON = {};
	myJSON.number = Math.random();
	res.json(myJSON);
});

app.use(express.json());
app.post('/name', (req, res) => {
    const message = req.body;
    if(message["name"] == undefined) {
        res.status(400);
        const wrong = {
            message: "Input JSON does not contain key 'name'"
        };
        res.json(wrong);
        return
    }

    const sayHi = 'Hello ' + message.name;
    console.log(sayHi);
    const resJSON = {
        message: sayHi
    }
	res.json(resJSON);
})

app.listen(8080);
