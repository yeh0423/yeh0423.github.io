/*
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(Server running at http://${hostname}:${port}/);
});
*/
//使用npm 初始化專案
//npm init -y
//安裝第三方套件
//npm install 套件名稱
//npm install express

const express=require("express");//載入express模組
const app=express();//建立application物件


//處理靜態檔案 app.use(express.static("靜態檔案資料夾"));
app.use(express.static("public"));


// 透過req.parms 獲取參數 /news/:參數名/:參數名....
//處理路徑 /number/數字 的連線
app.get("/number/:number",function(req,res){
  let number=req.params.number;/* req.parms.name(name自己設定) 對應到網址輸入number/10 */
  res.send("the result is:"+(number*number));
});

//透過req.query 獲取參數
//處理路徑 /calculate?number=數字 的連線
/* /calculate?number=10 */
app.get("/calculate",function(req,res){
  let number=req.query.number; /* req.query.name(name自己設定) 對應到網址輸入calculate?name=10*/
  console.log(number);
  res.send("the result is: "+(number*number));
});

//處理路徑 /landsacpe.jpg 的連線
/*
app.get("/landscape.jpg",function(req,res){
  res.sendFile(__dirname+"/imgs/image.jpg");
});
*/


//啟動伺服器在 http://127.0.0.1:3000/
app.listen(3000,function(){
  console.log("server atarted at http://127.0.0.1:3000/")
});