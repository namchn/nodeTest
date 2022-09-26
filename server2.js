const express = require("express");
const router  = express.Router();
const app = express();
const fs = require("fs");



/* */
//////////////////////////////////////////////////////////////
const mysql =require("mysql");
let answer ="";
let connection  =mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'username',
	password:'12345678',
	database: 'test'
	
	//user: 'root',
	//password:'12345678',
	//database: 'test'
});

connection.connect();
connection.query('SELECT 1 + 1 AS solution', 
function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


connection.query('SELECT writer_nm AS solution from jwarticle ', 
function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
  answer = results[0].solution;
});

connection.end();
//////////////////////////////////////////////////////////////


//
let message1 = `<h1>코드짜는 남천우지롱 메롱!!!</h1>`;
let message2 = `
    <h1>Hello World</h1>
    <p>This is main page</p>
    `;
let message3 = `<div>404</div><h1>Sorry, page not found :(</h1>` 
//



  let list = "";
  fs.readdir("./data", (err, files) => {
       console.log(files);
	   
	   files.forEach((file) => {
		list += `<li>${file}</li>`;
		console.log(list);
      });
  });


/* localhost:3000/ 접속시 나올 메시지 */
app.get("/", (request, response) => { 
  
  
	fs.readFile("./data/test.txt", "utf8", (err, data) => {
      //response.writeHead(200);
      //response.end(data);
	  response.send(data);
    });
  
	//message1 += `<ul>${list}</ul>`;
	//response.send(message1);
  
});

/* localhost:3000/main 접속시 나올 메시지 */
app.get("/main", (request, response) => {  
  
    const test = fs.readFileSync("./data/test.txt", "utf8");
    response.send(test);
  
	//response.send(message2);
  
});



/* localhost:3000/test 접속시 나올 메시지 */
app.get("/test", (request, response) => {  
  
    //alert('!!!!');
	response.redirect('/');
  
});




/* localhost:3000/ 혹은 localhost:3000/main 외의
get하지 않은 페이지 접속시 나올 메시지. */
app.use((request, response) => {
	
  message3 = message3 + '<div>db 로 나온값</div>'+ answer;
	
  response.send(message3);
});

/* 3000포트에서 서버 구동 */
app.listen(3000, () => {
  console.log("localhost:3000 에서 서버가 시작됩니다.");
});





