var MongoClient = require('mongodb').MongoClient; 
var url = "mongodb://localhost:27017/nishkarsh";
let express=require('express');
let server=express();
let path=require('path');
let bodyparser=require('body-parser');
var urlencodedParser=bodyparser.urlencoded({extended:true});
server.set('view engine','ejs');
server.use(express.static(__dirname));
var formidable = require('formidable');

server.get('/',function(req,res)
{
//THE HOME PAGE
	
  res.sendFile(__dirname+'/evp_index.html');

console.log("home page request satisfied...");
} );

	function caller(elect,res)
	{
	MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    
	var dbo2 = db.db("mydb");
	dbo2.collection('Candidate').find({ electionID:elect}).toArray(function(err, result)
		{
	res.render('evp_result',{cand:result});
	console.log(result);
	console.log("evm result page request satisfied..");
	
		});
	});
	}	 
server.get('/result_*',function(req,res)
{
	var elect=req.url.substring(8);
	MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('mydb');
	dbo.collection('Voter').find({ electionID:elect},{projection: { _id: 0, voted: 1 } }).toArray(function(err, data)
	{
		
	var index=0;
	//vote counting script
	//console.log(data.length);
	//console.log(data);
	//console.log(data[0]);
	//console.log(data[0].voted);
	var da="";
	var funcs={};
	for(index=0;index<data.length;index++)
	{
	funcs[index]=function(i)
	{	
		da=data[i].voted;
		console.log(da+' in loop, iteration: '+i);
		if(data[i]=="null")return;
		else if(data[i]==null)return;
		else if(data[i]===null)return;
		else
		
			dbo.collection('Candidate').findOne({candidateID:da}, function(err, data2) 
			{
				
				if(data2==null)console.log(da+' nothing to show');
				else{
					console.log(data2);
					console.log('in else now');
					var value=data2.no_of_votes+1;
				var newvalues = { $set: {no_of_votes: value }};
				dbo.collection("Candidate").updateOne({candidateID:data2.candidateID}, newvalues,function(err,res)
					{
						if(err) throw err;else
						console.log(res.result.nModified+res.result.n+res.result.ok + " document(s) updated");
				
				});
				}
				
			});	
		return;
	}.bind(this,index);
	}
	var ex=new Date();
	for(let j=0;j<=data.length;j++)
		if(j<data.length)funcs[j]();
	
		else if(j==data.length)
		{
		setTimeout(function(){caller(elect,res)},7000);
		}
	});
	});
	
});		
server.get('/submit_*',function(req,res)
{
console.log(req.url);
var polled=req.url.substring(8,11);

var voter=req.url.substring(11,14);
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('mydb');
dbo.collection('Voter').findOne({ voterID:voter}, function(err, data) 
{

				if(data==null);
				else{
				var newvalues = { $set: {voted: polled} };
				dbo.collection("Voter").updateOne({ voterID:voter}, newvalues);
				console.log("update success");
				res.render('evm_thanks',{ans:polled});
				console.log("evm vote submit page request satisfied..");
					
				}
		
});
});
});	





server.get('/poll_*',function(req,res)
{
//THE Poll PAGE, firstly we get the username from page, then query it on candidate collection
console.log(req.url);
var voter=req.url.substring(6);
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('mydb');
dbo.collection('Voter').findOne({ voterID:voter}, function(err, data) 
{
if(err)throw err;
dbo.collection('Candidate').find({electionID:data.electionID}).toArray(function(err2, result)
	{
		if(err2) throw err2;
		dbo.collection('Election').findOne({electionID:data.electionID},function(err3,decider)
			{
			if(err3) throw err3;
			var cur=new Date();
			var ele=new Date(decider.start_date);
			var ele2=new Date(decider.end_date);
			/*
			console.log(ele);
			console.log(ele2);
			console.log(cur);
			if(ele<cur||ele2>cur)
			{
			res.sendFile(__dirname+'/delay.html');
			console.log("delay page request satisfied..");
			}
			else*/
			{
			res.render('evm',{cand:result,vot:voter});
			console.log("evm page request satisfied..");
			}
			});
	});
});
});
});
	
		
		




server.get('/profile',function(req,res)
{
res.render('updateprofile',{profileData:user});
console.log("profile page request satisfied..");
} ); 




server.get('/login',function(req,res)
{
//THE LOGIN PAGE
	
  res.sendFile(__dirname+'/evp_login.html');

console.log("login page request satisfied..");
} ); 



server.post('/portal',urlencodedParser,function(req,res)
{
	//the profile portal page
    var n=req.body.username;
    //connecting with database and confirming whether usename or password matches
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('mydb');
dbo.collection('Voter').findOne({ username:req.body.username}, function(err, user) 
{
	if(err)throw err;
    if (user!=null&&user.username === req.body.username && user.pass === req.body.password)
        {
            res.render('evp_profile',{profile:user});
			console.log("Voter portal request satisfied..");
		} 
    else 
        {
		dbo.collection('Supervisor').findOne({ username:req.body.username}, function(err2, user) 
		{
			if(err2)throw err2;
			
	
	if (user!=null&&user.username === req.body.username && user.pass === req.body.password)
			{
            res.render('evp_sprofile',{profile:user});
			
			console.log("Supervisor portal request satisfied..");
			}
else
{res.end("Login invalid");
			console.log('a new user '+req.body.username+' tried  entering...');
}  	
    
		});
            
        }
   });
 });
 });
server.listen(3000);
console.log('server created, we are online!!!');
