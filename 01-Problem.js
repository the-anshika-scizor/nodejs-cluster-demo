import http from 'node:http';
const server = http.createServer((request, response)=>{
    if(request.url === '/heavy'){
        for(let i =1; i<= 5_000_000_000; i++){}
            return response.end("<h1>Heavy Task Done ... </h1>");
        
        
    }
    if(request.url === '/fast'){
            return response.end("<h1> Fast Task Done ... </h1>");
    }
});

server.listen(4000,(err)=>{
    if(err){
        console.log('Server Crash' , err);
    }
    else{
        console.log('Server is running');
        
    }
});