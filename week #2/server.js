const express = require('express')
const app = express()
const port = 3000
const exec  = require('child_process').exec
const osalaunchTerminal = "osascript -e 'tell application \"Terminal\" to activate do script \"ssh ";

var clientNotified = false;
var clientDataNotified = false;
var serverNotified = false;
app.get('/api/notifyme/client',(req,res)=>{
    var buildId = req.query.buildId;
    var clientInterval;
    clientNotified = false;
    clientInterval = setInterval(function(){
        child = exec('curl -X GET -u "harishd:1194865187c221073d7eabe83e1df68ed6" "http://ci.perdix.co:8090/job/Global-Perdix-Client/'+buildId+'/console" | grep "Finished:"',function(err,stdout,stderr){
            if(stdout.includes('Finished') && !clientNotified){
                clientNotified = true;
                clearInterval(clientInterval);
                var [msg,title] = stdout.includes('SUCCESS') ? ['Client Build is Success','SUCCESS :)'] : ['Client Build is Failed','FAILED :('];
                notify(cmd(msg,title));
            }
        })
    },5000)
    res.send('message:Success');
    // if(req.query.data){
    //     const child = exec(osalaunchTerminal+req.query.data+'"'+"'",(err,stdout,stderr)=>{
    //         res.send({'status':'success'});
    //     })
    // }
})
app.get('/api/notifyme/client-data',(req,res)=>{
    var buildId = req.query.buildId;
    var clientDataInterval;
    clientDataNotified = false;
    clientDataInterval = setInterval(function(){
        child = exec('curl -X GET -u "harishd:1194865187c221073d7eabe83e1df68ed6" "http://ci.perdix.co:8090/job/Global-Perdix-DB/'+buildId+'/console" | grep "Finished:"',function(err,stdout,stderr){
            if(stdout.includes('Finished') && !clientDataNotified){
                clientDataNotified = true;
                clearInterval(clientDataInterval);
                var [msg,title] = stdout.includes('SUCCESS') ? ['Client Data Build is Success','SUCCESS :)'] : ['Client Data Build is Failed','FAILED :('];
                notify(cmd(msg,title));
            }
        })
    },5000)
    res.send('message:Success');
})
app.get('/api/notifyme/server',(req,res)=>{
    var buildId = req.query.buildId;
    var serverInterval;
    serverNotified = false;
    serverInterval = setInterval(function(){
        child = exec('curl -X GET -u "harishd:1194865187c221073d7eabe83e1df68ed6" "http://ci.perdix.co:8090/job/Global-Perdix-Server/'+buildId+'/console" | grep "Finished:"',function(err,stdout,stderr){
            if(stdout.includes('Finished') && !serverNotified){
                serverNotified = true;
                clearInterval(serverInterval);
                var [msg,title] = stdout.includes('SUCCESS') ? ['Server Build is Success','SUCCESS :)'] : ['Server Build is Failed','FAILED :('];
                notify(cmd(msg,title));
            }
        })
    },5000)
    res.send('message:Success');
})

var notify = function(script){
    exec(script,function(err,stdout,stderr){
        console.log(err)
    });
}
var cmd = function(msg,title){
    return "osascript -e 'display notification \"" + msg + '" with title "'+title+'"'+"'";
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// launchSSH