const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve the HTML file
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.method === 'POST' && req.url === '/upload') {
        // Handle upload
        let body = '';
        let size = 0;
        const maxSize = 10 * 1024 * 1024; // 10MB limit
        
        req.on('data', chunk => {
            size += chunk.length;
            if (size > maxSize) {
                res.writeHead(413, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Payload too large' }));
                req.destroy();
                return;
            }
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                console.log('Received drawing data:');
                console.log(`User: ${data.user}`);
                console.log(`Points count: ${data.points.length}`);
                console.log('Sample points:', data.points.slice(0, 5));
                
                // Save to file (optional)
                const timestamp = Date.now();
                const filename = `drawing_${data.user}_${timestamp}.json`;
                fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        console.error('Error saving file:', err);
                    } else {
                        console.log(`Saved to ${filename}`);
                    }
                });
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (error) {
                console.error('Error parsing data:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Open this URL in your browser to test the drawing app');
});
