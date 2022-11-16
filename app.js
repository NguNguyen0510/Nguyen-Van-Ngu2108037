// tat ca cac ham e nhet het vao trong app.js cho de tim a

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { response } = require('express');

const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended : false }));

app.use(bodyParser.json());


app.listen(PORT , () => console.log(`Listen on the port ${PORT}`));

const db_conn = mysql.createPool({
   connectionLimit : 10,
   host : 'localhost',
   user : 'root',
   password : '',
   database : 'testdbapi'
});

//lay tat ca users tu database
app.get('/users', (req, res) => {
    db_conn.getConnection( (err, conn) => {
         if(err) throw err
         console.log(`connected as id ${conn.threadId}`)

         conn.query('SELECT * FROM users' , (err, rows) => {
             conn.release()

             if(!err){
                 res.send(rows);
             } else{
                 console.log(err);
             }
         });
    });
});

//lay theo id

app.get('/users/:id', (req, res) => {
    db_conn.getConnection( (err, conn) => {
         if(err) throw err
         console.log(`connected as id ${conn.threadId}`)

         conn.query('SELECT * FROM users WHERE id = ?' , [req.params.id] , (err, rows) => {
             conn.release()

             if(!err){
                 res.send(rows);
             } else{
                 console.log(err);
             }
         });
    });
});

//xoa theo id
app.delete('/users/:id', (req, res) => {
    db_conn.getConnection( (err, conn) => {
         if(err) throw err
         console.log(`connected as id ${conn.threadId}`)

         conn.query('DELETE  FROM users WHERE id = ?' , [req.params.id] , (err, rows) => {
             conn.release()

             if(!err){
                 res.send(`users co ID ${[req.params.id] } da xoa.`);
             } else{
                 console.log(err);
             }
         });
    });
});

//them moi, id tu tao
app.post('', (req, res) => {
    db_conn.getConnection( (err, conn) => {
         if(err) throw err
         console.log(`connected as id ${conn.threadId}`)

         const params =  req.body

         conn.query('INSERT INTO  users SET ?' , params , (err, rows) => {
             conn.release()

             if(!err){
                 res.send(`users co ten ${params.name } da dc Add.`);
             } else{
                 console.log(err);
             }
         });

         console.log(req.body);
    });
});

//sua thong tin theo id

app.put('/users/:id', (req, res) => {
    db_conn.getConnection( (err, conn) => {
         if(err) throw err
         console.log(`connected as id ${conn.threadId}`)

         const params =  req.body
         const {  name, email, age} = req.body
        const id=req.params.id;

         conn.query("UPDATE  users SET name = ? , email = ?, age = ? WHERE id = ?",
          [name , email ,  age, req.params.id] , (err , rows) => {
             conn.release()

             if(!err){
                 res.send(`thong tin users co ten ${params.name } da dc sua.`);
             } else{
                 console.log(err);
             }
         });

         console.log(req.body);
    });
});
