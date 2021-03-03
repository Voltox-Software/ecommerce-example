const express = require('express'); const path = require('path'); const app = express(); app.use(express.static(path.join(__dirname, 'build')));

app.get('/dev/ping', function (req, res) { return res.send('pong');
});

app.get('*', function (req, res) { res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, "0.0.0.0",() => console.log("Running on PORT=",process.env.PORT || 8080));
