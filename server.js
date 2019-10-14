const dns = require('dns');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/checkdomain', (req, res) => {
  dns.lookup(req.body.domain, (err, address) => {
    // if (err) throw err
    if (typeof(address) !== 'undefined') {
      return res.status(403).json({
        message: `domain is already in use. please try another one`
      })
    }
    return res.json({
      message: `domain is available. Get it at the links below`
    })
  })



  /* console.log(req.body.domain);
  res.json(req.body.domain); */
});

// serve static assets in prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Running on port  ${port}`);
});
