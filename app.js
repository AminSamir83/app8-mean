var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/marsDb', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('marsDb');
        closure(db);
    })
}

/* app.get('/',  (req, res) => {
  res.sendFile(__dirname+'/index.html')
}) */

app.get('/api/marsDb', (req, res)=> {
    connection( db => {
        db.collection('users').find().toArray().then(result=>{
            res.send(result);
        })
    })
})

//get user by id

/*    
app.get('/api/users/:id',(req,res)=>{
    res.send(req.params.id);
})
*/


// find one user by id

app.get('/api/users/:id',(req,res)=>{
    connection(db=>{
        db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
            res.send(result);
        })
    })
})

// find user todos by id

app.get('/api/todos/:id',(req,res)=>{
    connection(db=>{
        db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
            res.send(result.todos);
        })
    })
})

//add a todo task in the list

app.post('/api/todos/:id',(req,res)=>{
    connection (db =>{
        db.collection('users').update({_id:ObjectID(req.params.id)},{$addToSet: {todos: req.body}},(err,result)=>{
            res.send(result.todos);
        })
    })
})

//get the 0 element of the array todos by id
app.get('/api/todos/:id/0',(req,res)=>
connection (db =>{
    db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        res.send(result.todos[0]);
    })
})
)





// add a user
app.post('/api/marsDb',(req,res)=>{
    connection (db =>{
        db.collection('users').insert(req.body,(err,result)=>{
            res.send(result);
        })
    })
})

/*  app.post('/',(req,res)=>{
    console.log(req.body);
    res.send({body:req.body})
})*/
app.put('/',(req,res)=>{

    res.send("this is put")
})
app.delete('/',(req,res)=>{

    res.send("this is delete")
})

console.log('hani nesma3 fik 3al 3000');
 
app.listen(3000)