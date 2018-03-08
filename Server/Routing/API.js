const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/marsDb', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('marsDb');
        closure(db);
    })
}


// Error handling
const sendError = (err, res, code) => {
    response.status = code;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(code).json(response);
  };

  // Response handling
  let response = {
    status: 200,
    data: [],
    message: null
  };

  /* app.get('/',  (req, res) => {
  res.sendFile(__dirname+'/index.html')
}) */

router.get('/api/marsDb', (req, res)=> {
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

router.get('/api/users/:id',(req,res)=>{
    connection(db=>{
        db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
            res.send(result);
        })
    })
})

// find user todos by id

router.get('/api/todos/:id',(req,res)=>{
    connection(db=>{
        db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
            res.send(result.todos);
        })
    })
})

//get the 0 element of the array todos by id
router.get('/todos/:id/0',(req,res)=>
connection (db =>{
    db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        res.send(result.todos[0]);
    })
})
)

//add a todo task in the list

router.post('/api/todos/:id',(req,res)=>{
    connection (db =>{
        db.collection('users').update({_id:ObjectID(req.params.id)},{$addToSet: {todos: req.body}},(err,result)=>{
            res.send(result.todos);
        })
    })
})







// add a user
router.post('/api/marsDb',(req,res)=>{
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
router.put('/',(req,res)=>{

    res.send("this is put")
})
router.delete('/',(req,res)=>{

    res.send("this is delete")
})

module.exports = router;