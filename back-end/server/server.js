


require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { Donor } = require('./models/donor')
var { Event } = require('./models/event')
var { Volunteer } = require('./models/volunteer')
var { User } = require('./models/user');
var { mongoose } = require('./db/mongoose');

var { authenticate } = require('./middleware/authenticate');


var app = express();

const port = process.env.PORT;

app.use((request, response, next) => {
  response.setHeader('Content-Type', 'application/json');
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(bodyParser.json());

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['username', 'password']);
  User.findByCredentials(body.username, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }, (e) => {
    if (e === 'wrong-password') {
      res.status(404).send()
    } else {
      res.status(400).send();
    }
  });
})

app.post('/user', (req, res) => {
  var user = new User(req.body);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/allUsers', (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ users })
    }, (e) => {
      res.status(400).send(e);
    });
});

app.post('/edit/user', (req, res) => {
  var updatedUser = req.body;
  User.findOneAndUpdate({
    _id: updatedUser._id
  }, { $set: updatedUser }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send()
      }
      res.send({ user })
    }, (e) => res.status(400).send())
});

app.post('/delete/user', (req, res) => {
  User.findOneAndRemove({
    _id: req.body._id
  }).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.send({ user })
  }, (e) => res.status(400).send());
});


/*****************************volunteer */
app.get('/volunteers', (req, res) => {
  Volunteer.find({})
    .then((volunteers) => {
      res.send({ volunteers });
    }, (e) => {
      res.status(400).send(e);
    });
});

app.post('/volunteer', (req, res) => {
  var volunteerToAdd = new Volunteer(req.body);
  volunteerToAdd.save().then((volunteer) => {
    res.send({ volunteer });
  }, (e) => res.status(400).send(e));
});


app.post('/delete/volunteer', (req, res) => {
  Volunteer.findOneAndRemove({
    _id: req.body._id
  }).then((volunteer) => {
    if (!volunteer) {
      return res.status(404).send();
    }
    res.send({ volunteer })
  }, (e) => res.status(400).send());
});


app.post('/edit/volunteer', (req, res) => {
  Volunteer.findOneAndUpdate({
    _id: req.body._id
  }, { $set: req.body }, { new: true }).then((volunteer) => {
    if (!volunteer) {
      return res.status(404).send();
    }
    res.send({ volunteer });
  }, (e) => {
    res.status(400).send(e);
  })
});

/////////////////////events
app.post('/event', (req, res) => {
  var EventToAdd = Event(req.body);
  EventToAdd.save().then((event) => {
    res.send({ event });
  }, (e) => res.status(400).send());
});


app.get('/donor/events', (req, res) => {
  Event.find({
    type: 'donor-Model'
  }).then((events) => {
    if (events.length === 0) {
      res.status(404).send()
    } else {
      res.send({ events })
    }
  }, (e) => res.status(400).send());
});

app.get('/volunteer/events', (req, res) => {
  Event.find({
    type: 'volunteer-Model'
  }).then((events) => {
    if (events.length === 0) {
      res.status(404).send()
    } else {
      res.send({ events })
    }
  }, (e) => res.status(400).send());
});

app.post('/delete/event', (req, res) => {
//   var deletedEvent = new Event(req.body)
//   deletedEvent.status = 'deleted';
// console.log(req.body._id, req.body.status)
// console.log(deletedEvent._id, deletedEvent.status)
//   Event.findOneAndUpdate(
//     { id : req.body._id}, 
//     {$set: deletedEvent} , 
//     {new: true} 
//   ).then((event) => {
//     // if(event.status === 'deleted') {
//       console.log(event)
//       res.send(event);
//     // } else {
//       // res.send('didnt save to DB')
//     // }s
//   }, (e) => res.status(400).send(e));

});

app.post('/edit/event', (req, res) => {
  Event.findOneAndUpdate({
    _id: req.body._id
  }, { $set: req.body }, { new: true }).then((event) => {
    if (!event) {
      return res.status(404).send();
    }
    res.send({ event });
  }, (e) => {
    res.status(400).send(e);
  })
});
/////donor edit add delete getall
app.post('/donor', (req, res) => {
  var donorToAdd = Donor(req.body);
  donorToAdd.save().then((donor) => {
    res.send({ donor });
  }, (e) => res.status(400).send());
});

app.get('/allDonors', (req, res) => {
  Donor.find({}).then((donors) => {
    if (!donors) {
      return res.status(404).send()
    }
    res.send(donors);
  });
});

app.post('/edit/donor', (req, res) => {
  Donor.findOneAndUpdate({
    _id: req.body._id
  }, { $set: req.body }, { new: true }).then((donor) => {
    if (!donor) {
      return res.status(404).send(donor);
    }
    res.send({ donor });
  }, (e) => {
    res.status(400).send(e);
  })
});


app.post('/delete/donor', (req, res) => {
  Donor.findOneAndRemove({
    _id: req.body._id
  }).then((donor) => {
    if (!donor) {
      return res.status(404).send();
    }
    res.send({ donor })
  }, (e) => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };




