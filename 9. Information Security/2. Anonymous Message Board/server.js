'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');
const helmet = require('helmet');

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sample front-end
app.route('/b/:board/').get((req, res) => {
  res.sendFile(process.cwd() + '/views/board.html');
});
app.route('/b/:board/:threadid').get((req, res) => {
  res.sendFile(process.cwd() + '/views/thread.html');
});

//Index page (static HTML)
app.route('/').get((req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//Sample Front-end

//404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).type('text').send('Not Found');
});

const port = process.env.PORT || 3000;

//Start our server and tests!
app.listen(port, () => {
  console.log('Listening on port ' + port);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(() => {
      try {
        runner.run();
      } catch (e) {
        var error = e;
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
