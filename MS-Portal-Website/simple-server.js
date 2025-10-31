const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('Starting server...');

// File-based storage for principles
const PRINCIPLES_FILE = path.join(__dirname, 'principles-data.json');
const CALENDAR_FILE = path.join(__dirname, 'calendar-events.json');

// Load principles from file or initialize empty array
let principlesData = [];
let calendarEvents = {};

function loadPrinciples() {
    try {
        if (fs.existsSync(PRINCIPLES_FILE)) {
            const data = fs.readFileSync(PRINCIPLES_FILE, 'utf8');
            principlesData = JSON.parse(data);
            console.log(`📚 Loaded ${principlesData.length} principles from file`);
        } else {
            console.log('📚 No existing principles file found, starting with empty data');
            principlesData = [];
        }
    } catch (error) {
        console.error('❌ Error loading principles:', error);
        principlesData = [];
    }
}

function savePrinciples() {
    try {
        fs.writeFileSync(PRINCIPLES_FILE, JSON.stringify(principlesData, null, 2));
        console.log(`💾 Saved ${principlesData.length} principles to file`);
    } catch (error) {
        console.error('❌ Error saving principles:', error);
    }
}

function loadCalendarEvents() {
    try {
        if (fs.existsSync(CALENDAR_FILE)) {
            const data = fs.readFileSync(CALENDAR_FILE, 'utf8');
            calendarEvents = JSON.parse(data);
            const totalEvents = Object.values(calendarEvents).reduce((sum, events) => sum + events.length, 0);
            console.log(`📅 Loaded ${totalEvents} calendar events from file`);
        } else {
            console.log('📅 No existing calendar events file found, starting with empty data');
            calendarEvents = {};
        }
    } catch (error) {
        console.error('❌ Error loading calendar events:', error);
        calendarEvents = {};
    }
}

function saveCalendarEvents() {
    try {
        fs.writeFileSync(CALENDAR_FILE, JSON.stringify(calendarEvents, null, 2));
        const totalEvents = Object.values(calendarEvents).reduce((sum, events) => sum + events.length, 0);
        console.log(`💾 Saved ${totalEvents} calendar events to file`);
    } catch (error) {
        console.error('❌ Error saving calendar events:', error);
    }
}

// Load data on startup
loadPrinciples();
loadCalendarEvents();

// Handle API requests
function handleAPI(req, res) {
    // Set CORS headers for API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method === 'POST' && req.url === '/api/login') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const loginData = JSON.parse(body);
                console.log('🔐 Login attempt:', { username: loginData.username, password: '***' });
                
                // Simple authentication (you can modify these credentials)
                const validCredentials = [
                    { username: 'manetas & stevens associates', password: '123' },
                    { username: 'admin', password: 'password' },
                    { username: 'user', password: '123456' },
                    { username: 'demo', password: 'demo' }
                ];
                
                const isValid = validCredentials.some(cred => 
                    cred.username === loginData.username && cred.password === loginData.password
                );
                
                if (isValid) {
                    console.log('✅ Login successful for:', loginData.username);
                    res.writeHead(200);
                    res.end(JSON.stringify({
                        success: true,
                        message: 'Login successful',
                        user: { username: loginData.username }
                    }));
                } else {
                    console.log('❌ Login failed for:', loginData.username);
                    res.writeHead(401);
                    res.end(JSON.stringify({
                        success: false,
                        message: 'Invalid credentials'
                    }));
                }
            } catch (error) {
                console.error('❌ Login error:', error);
                res.writeHead(400);
                res.end(JSON.stringify({
                    success: false,
                    message: 'Invalid request format'
                }));
            }
        });
        
        return;
    }
    
    // Handle other API endpoints
    if (req.method === 'GET' && req.url === '/api/health') {
        res.writeHead(200);
        res.end(JSON.stringify({ status: 'ok', message: 'Server is running' }));
        return;
    }
    
    // GET principles endpoint
    if (req.method === 'GET' && req.url === '/api/principles') {
        console.log('📖 Getting principles:', principlesData.length, 'items');
        res.writeHead(200);
        res.end(JSON.stringify(principlesData));
        return;
    }
    
    // POST principles endpoint
    if (req.method === 'POST' && req.url === '/api/principles') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const requestData = JSON.parse(body);
                console.log('💾 Saving principle:', requestData.text?.substring(0, 50) + '...');
                
                // Count existing principles in this category for numbering
                const existingInCategory = principlesData.filter(p => p.category === requestData.category);
                const principleNumber = existingInCategory.length + 1;
                
                // Create the principle object with proper structure
                const principleData = {
                    id: Date.now().toString(),
                    content: requestData.text,
                    category: requestData.category,
                    number: requestData.category === 'Economic' ? `1.${principleNumber}` : `2.${principleNumber}`,
                    timestamp: new Date().toISOString()
                };
                
                principlesData.push(principleData);
                
                // Save to file
                savePrinciples();
                
                console.log('✅ Principle saved. Total:', principlesData.length);
                res.writeHead(200);
                res.end(JSON.stringify({
                    success: true,
                    message: 'Principle saved successfully',
                    principle: principleData
                }));
            } catch (error) {
                console.error('❌ Error saving principle:', error);
                res.writeHead(400);
                res.end(JSON.stringify({
                    success: false,
                    message: 'Invalid request format'
                }));
            }
        });
        
        return;
    }
    
    // DELETE principles endpoint
    if (req.method === 'DELETE' && req.url.startsWith('/api/principles')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = url.searchParams.get('id');
        
        if (!id) {
            res.writeHead(400);
            res.end(JSON.stringify({
                success: false,
                message: 'Principle ID is required'
            }));
            return;
        }
        
        const index = principlesData.findIndex(p => p.id === id);
        if (index === -1) {
            console.log('❌ Principle not found for deletion:', id);
            res.writeHead(404);
            res.end(JSON.stringify({
                success: false,
                message: 'Principle not found'
            }));
            return;
        }
        
        const deletedPrinciple = principlesData.splice(index, 1)[0];
        console.log('🗑️ Deleted principle:', deletedPrinciple.content?.substring(0, 50) + '...');
        console.log('✅ Principles remaining:', principlesData.length);
        
        // Save to file
        savePrinciples();
        
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            message: 'Principle deleted successfully'
        }));
        return;
    }
    
    // GET calendar events endpoint
    if (req.method === 'GET' && req.url === '/api/calendar-events') {
        console.log('📅 Getting calendar events');
        res.writeHead(200);
        res.end(JSON.stringify(calendarEvents));
        return;
    }
    
    // POST calendar events endpoint
    if (req.method === 'POST' && req.url === '/api/calendar-events') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const eventsData = JSON.parse(body);
                console.log('📅 Saving calendar events:', Object.keys(eventsData).length, 'dates');
                
                // Replace all calendar events with new data
                calendarEvents = eventsData;
                
                // Save to file
                saveCalendarEvents();
                
                res.writeHead(200);
                res.end(JSON.stringify({
                    success: true,
                    message: 'Calendar events saved successfully'
                }));
            } catch (error) {
                console.error('❌ Error saving calendar events:', error);
                res.writeHead(400);
                res.end(JSON.stringify({
                    success: false,
                    message: 'Invalid request format'
                }));
            }
        });
        
        return;
    }
    
    // DELETE calendar event endpoint
    if (req.method === 'DELETE' && req.url.startsWith('/api/calendar-events')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const dateKey = url.searchParams.get('dateKey');
        const eventId = url.searchParams.get('eventId');
        
        if (!dateKey || !eventId) {
            res.writeHead(400);
            res.end(JSON.stringify({
                success: false,
                message: 'dateKey and eventId are required'
            }));
            return;
        }
        
        if (!calendarEvents[dateKey]) {
            res.writeHead(404);
            res.end(JSON.stringify({
                success: false,
                message: 'No events found for this date'
            }));
            return;
        }
        
        const originalLength = calendarEvents[dateKey].length;
        calendarEvents[dateKey] = calendarEvents[dateKey].filter(event => event.id != eventId);
        
        if (calendarEvents[dateKey].length === originalLength) {
            res.writeHead(404);
            res.end(JSON.stringify({
                success: false,
                message: 'Event not found'
            }));
            return;
        }
        
        // Remove the date key if no events left
        if (calendarEvents[dateKey].length === 0) {
            delete calendarEvents[dateKey];
        }
        
        console.log('📅 Deleted calendar event:', eventId, 'from', dateKey);
        
        // Save to file
        saveCalendarEvents();
        
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            message: 'Calendar event deleted successfully'
        }));
        return;
    }
    
    // API endpoint not found
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, message: 'API endpoint not found' }));
}

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Handle API endpoints
    if (req.url.startsWith('/api/')) {
        handleAPI(req, res);
        return;
    }
    
    // Get the file path
    let filePath = req.url;
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    // Remove query parameters
    const urlPath = filePath.split('?')[0];
    const fullPath = path.join(__dirname, urlPath);
    
    console.log(`Serving: ${fullPath}`);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Get the file extension
    const extname = String(path.extname(fullPath)).toLowerCase();
    
    // Set content type based on file extension
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read and serve the file
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            console.error(`Error reading file ${fullPath}:`, err.message);
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>The requested file was not found.</p>', 'utf-8');
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`<h1>500 Server Error</h1><p>${err.code}</p>`, 'utf-8');
            }
        } else {
            // Success
            console.log(`✓ Served ${fullPath} (${content.length} bytes)`);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
    if (err.code === 'EADDRINUSE') {
        console.error('Port 8000 is already in use!');
    }
});

// Start server with explicit binding
const PORT = 8000;
const HOST = '127.0.0.1'; // Explicit localhost binding

server.listen(PORT, HOST, () => {
    console.log(`✓ Server running on http://${HOST}:${PORT}`);
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Current directory: ${__dirname}`);
    console.log('✓ Press Ctrl+C to stop the server');
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n✓ Server shutting down...');
    server.close(() => {
        console.log('✓ Server stopped');
        process.exit(0);
    });
}); 