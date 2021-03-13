const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function(request, response){
    // console all the requested urls so we can which urls need to be routed
    console.log(request.url);

    // conver UpperCase to LowerCase so it doesn't affect on user expirience
    let path = request.url.toLowerCase();

    // types for different page content
    let contentType = '';
    let mime = {
        html: 'text/html',
        txt: 'text/plain',
        css: 'text/css',
        js: 'application/javascript',
        jpg: 'image/jpeg',
        mp4: 'video/mp4'
    };

    // MAIN page
    if(path=='/'){
        path = 'index.html';
        response.statusCode = 200;
        contentType = mime.html;
    }

    // ABOUT page
    // indexOf -> check whether url contains this name regardless of unnecessary symbols
    if(path.indexOf('/about')>=0){
        path = 'about.html';
        response.statusCode = 200;
        contentType = mime.html;
    }
    // indexOf -> check whether url contains this name regardless of unnecessary symbols
    if(path.indexOf('/img/gallery/graduation.jpg')>=0){
        path = 'img/gallery/graduation.jpg';
        response.statusCode = 200;
        contentType = mime.jpg;
    }

    // GALLERY
    // indexOf -> check whether url contains this name regardless of unnecessary symbolsRY
    if(path.indexOf('/img/gallery/study.jpg')>=0){
        path = 'img/gallery/study.jpg';
        response.statusCode = 200;
        contentType = mime.jpg;
    }
    // indexOf -> check whether url contains this name regardless of unnecessary symbols
    if(path.indexOf('/video/students/memes.mp4')>=0){
        path = 'video/students/memes.mp4';
        response.statusCode = 200;
        contentType = mime.mp4;
    }

    // CSS AND JS
    // indexOf -> check whether url contains this name regardless of unnecessary symbols
    if(path.indexOf('/style.css')>=0){
        path = 'style.css';
        response.statusCode = 200;
        contentType = mime.css;
    }
    // indexOf -> check whether url contains this name regardless of unnecessary symbols
    if(path.indexOf('/script.js')>=0){
        path = 'script.js';
        response.statusCode = 200;
        contentType = mime.js;
    }
                // extra work which instructions explicitly stated NOT TO DO
                if(path == '/img/welcome.jpg'){
                    path = 'img/welcome.jpg';
                    response.statusCode = 200;
                    contentType = mime.jpg;
                }

                if(path == '/img/ab_us.jpg'){
                    path = 'img/about.jpg';
                    response.statusCode = 200;
                    contentType = mime.jpg;
                }

                // indexOf -> check whether url contains this name regardless of unnecessary symbols
                if(path.indexOf('/img/cry.jpg')>=0){
                    path = 'img/cry.jpg';
                    response.statusCode = 200;
                    contentType = mime.jpg;
                }

    // set header content types
    response.setHeader('Content-Type', contentType)

    // set an html file
    fs.readFile(path, function(error, data) {
        if (error) {
            if(error.code == 'ENOENT') {
                // if page not found
                fs.readFile('./error.html', function(error, data) {
                    response.writeHead(404, { 'Content-Type': mime.html });
                    response.end(data, 'utf-8');
                });
            }
            else {
                // internal server error
                response.writeHead(500);
                response.end('Internal error: '+error.code+' ..\n');
            }
        }
        else {
            // if everything is ok server the page
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data, 'utf-8');
        }
    });
    
})

// make server to listen to specified port for incoming connections
server.listen(port, function(error){
    if(error){
        console.log('Error occured', error)
    } else{
        console.log('Server is listening on port ' + port)
    }
})