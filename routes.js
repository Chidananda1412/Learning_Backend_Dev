const routesHandler = (req, res) => {

    // Home page
    if (req.url === '/' && req.method === 'GET') {

        res.setHeader('Content-Type', 'text/html');

        res.write(`
            <html>
                <body>
                    <h1>Enter Username</h1>

                    <form action="/user" method="POST">
                        <input type="text" name="username" />
                        <button type="submit">Submit</button>
                    </form>

                </body>
            </html>
        `);

        return res.end();
    }

    // User route
    if (req.url === '/user' && req.method === 'POST') {

        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {

            const parsedBody = Buffer.concat(body).toString();

            const username = parsedBody.split('=')[1];

            res.setHeader('Content-Type', 'text/html');

            res.write(`
                <html>
                    <body>
                        <h1>User Submitted:</h1>
                        <h2>${username}</h2>
                    </body>
                </html>
            `);

            res.end();
        });

        return;
    }

};

module.exports = routesHandler;