import http from 'node:http';
import cluster from 'node:cluster';
import os from 'os';

console.log('Are you primary', cluster.isPrimary);

if(cluster.isPrimary){
    const totalCores = os.availableParallelism();
    console.log('Cores', totalCores);
    for(let i =1; i<=totalCores; i++){
        cluster.fork();
    }
    
}
else{
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
}