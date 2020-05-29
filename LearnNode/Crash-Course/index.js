const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req,res) => {
    // Static Build Paths
    // if(req.url === '/'){
    //     fs.readFile(path.join(__dirname,'public','index.html'),(err,content)=>{
    //         if(err) throw err
    //         res.writeHead(200,{'Content-Type': 'text/html'})
    //         res.end(content)
    //     })
    // }
    // if(req.url === '/about'){
    //     fs.readFile(path.join(__dirname,'public','about.html'),(err,content)=>{
    //         if(err) throw err
    //         res.writeHead(200,{'Content-Type': 'text/html'})
    //         res.end(content)
    //     })
    // }

    // if(req.url === '/api/users'){
    //     const users = [
    //         {'name': 'Bob', age: 10},
    //         {'name': 'Murt', age:23}
    //     ]

    //     res.writeHead(200,{'Content-Type': 'application/json'})
    //     res.end(JSON.stringify(users))
    // }

    // Dynamic Build Paths
    let fileName = path.join(__dirname,'public',req.url === '/' ? 'index.html':req.url)
    console.log(fileName)

    // Setting Content Type
    let extname = path.extname(fileName)
    // initial Default
    let contenType = 'text/html'

    // Check file type and set content
    switch(extname){
        case '.js':
            contenType = 'text/javascript'
            break
        case '.css':
            contenType = 'text/css'
            break
        case '.json':
            contenType = 'application/json'
            break
        case '.png':
            contenType = 'image/png'
            break
        case '.jpg':
            contenType = 'image/jpg'
            break
    }

    // ReadFile
    fs.readFile(fileName, (err,content)=>{
        if(err) {
            if(err.code == 'ENOENT'){
                // Page not found
                fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>{
                    res.writeHead(404, {'Content-Type':'text/html'})
                    res.end(content)
                })
            }else{
                res.writeHead(500)
                res.end(`Server Error ${err.code}`)
            }
        }else{
            // Success
            res.writeHead(200, {'Content-Type':contenType})
            res.end(content)
        }
    })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, ()=> console.log(`Server Running on port: ${PORT}`))