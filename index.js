const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const port=3000;


const mysql = require('mysql');
const connect = require('http2');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:'3306',
    password:'password',
    database:'student',
    insecureAuth : true
});
connection.connect(function(error){
    if(error) console.log(error);
    else console.log('Database Connected!');
});
 
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM student";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('index', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            student : rows
        });
    });
});

app.get('/add',(req, res) => {
        res.render('add', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
         
        });
    });

app.post('/save',(req,res) =>  {
   let data={name:req.body.name, email:req.body.email, phn_no:req.body.phn_no};
   let sql="INSERT INTO student SET ?";
   let query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
});
});

app.get('/edit/:id',(req, res) => {
    const id = req.params.id;
    let sql = "SELECT * FROM student WHERE id= '"+ id +"' ";
    let query = connection.query(sql, (err, result) => {
        if(err) throw err;
        res.render('edit', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            student : result[0]
        });
    });
});


app.post('/update',(req,res) =>  {
    const id = req.body.id;
    let sql="update student SET name='"+req.body.name+"',email='"+req.body.email+"',phn_no='"+req.body.phn_no+"' where id="+id;
    let query = connection.query(sql,(err, results) => {
     if(err) throw err;
     res.redirect('/');
 });
 });


 app.get('/delete/:id',(req, res) => {
    const id = req.params.id;
    let sql = "DELETE FROM student WHERE id= '"+ id +"' ";
    let query = connection.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect('/');
        });
    });


app.listen(3000, () => {
    console.log('Server is running at port 3000');
});




 