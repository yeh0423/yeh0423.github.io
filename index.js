const express=require("express");//載入express模組
const session=require("express-session");
const bodyParser=require("body-parser");//載入 body-parser 模組
const app=express();//建立application物件

//設定樣板引擎
app.set("view engine","ejs");

//設定 session 支援使用者狀態的管理
app.use(session({
    secret: "ariehriaur",
    resave: false,
    saveUninitialized: true
  }))

//支援 post 方法的參數處理
app.use(bodyParser.urlencoded({extended:true}));

//補充 app.use(bodyParser.json()) 處理json

//處理靜態檔案 app.use(express.static("靜態檔案資料夾"));
app.use(express.static("public"));

/*
//使用get方法處理路徑 /signin?password=密碼 的要求
app.get("/signin",function(req,res){
    let password=req.query.password;
    if(password==="test"){
        res.send("ok");
    }else{
        res.send("failed");
    }
    })
*/

//使用post方法處理路徑 /signin 以及附帶的內容 password=密碼

app.post("/signin",function(req,res){
    //使用 req.body.參數名稱 抓取使用post方法傳遞的參數
    let password=req.body.password;//
    let name=req.body.name;
    if(password==="test"){
        //利用 req.session 管理當下的使用者狀態
        req.session.isLogin=true;
        req.session.name=name;
        res.redirect("/member");//
    }else{
        req.session.isLogin=false;
        res.send("failed");
    }
});
//使用get方法處理路徑 /signout
app.get("/signout",function(req,res){
    req.session.isLogin=false;
    res.redirect("/");
});

//使用get方法處理路徑 /member
app.get("/member",function(req,res){
    if(req.session.isLogin){
        console.log(req.session.name);
        //res.sendFile(__dirname+"/public/member.html");
        res.render("member",{name:req.session.name});//
    }
    else{
        res.redirect("/");
    }
});


app.listen(3000,function(){
    console.log("server atarted at http://127.0.0.1:3000/")
  });