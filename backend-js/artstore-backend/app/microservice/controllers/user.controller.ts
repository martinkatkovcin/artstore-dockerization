const db = require('../../models/index.js');
const User = db.users;
const { Op } = require('sequelize');
const crypto = require('crypto');

function sendMessage(res, message, status) {
  if (status === null) {
    res.send({
      message: message
    });
  }
  else {
    res.status(status).send({
      message: message
    });
  }
}

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty.'
    });
    return;
  }

  if (!req.body.first_name) {
    res.status(400).send({
      message: 'The field First name could not be empty.'
    })

    return;
  }

  if (!req.body.last_name) {
    res.status(400).send({
      message: 'The field Last name could not be empty.'
    })

    return;
  }

  if (!req.body.email) {
    res.status(400).send({
      message: 'Field Email could not be empty.'
    })

    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(req.body.email)) {
    res.status(400).send({
      message: 'Invalid email address format. Correct format is x@y.zzz.'
    });

    return;
  }

  if (!req.body.phone_number) {
    res.status(400).send({
      message: 'Field Phone number could not be empty.'
    })

    return;
  }

  if (!req.body.username) {
    res.status(400).send({
      message: 'The field Username could not be empty.'
    })

    return;
  }

  User.findOne({where: {username: req.body.username},}).then(existingUser => {
    if (existingUser) {
      res.status(409).send({
        message: 'Username already exists. Please choose a different username.'
      });
      return;
    }

  if (!req.body.password) {
    res.status(400).send({
      message: 'The field Password could not be empty.'
    })

    return;
  }


  if (!req.body.role) {
    res.status(400).send({
      message: 'You did not choose the role.'
    })

    return;
  }

      const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: crypto.createHash('md5').update(req.body.password).digest('hex'),
        email: req.body.email,
        phone_number: req.body.phone_number,
        role: req.body.role,
      };

      User.create(user).then(data => {
          res.status(201).send(data);
        }).catch(err => {
          res.status(500).sendMessage(res, err.message || 'Error occurred while creating the user.', 500);
        });
    });
};

exports.findAll = (req, res) => {
  const username = req.query.username;
  const condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition }).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while retrieving users.', 500);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id).then(data => {
      if (data) {
        res.send(data);
      } else {
        sendMessage(res, `Cannot find user with id=${id}`, 404);
      }
    }).catch(() => {
      sendMessage(res, `Error retrieving user with id=${id}`, 500);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'User was updated successfully.', 500);
      } else {
        sendMessage(res, `Cannot update user with id=${id}. Maybe user was not found or req.body is empty.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Error updating user with id=${id}`, 500);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'User was deleted successfully.', null);
      } else {
        sendMessage(res, `Cannot delete user with id=${id}. Maybe user was not found.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Could not delete user with id=${id}`, 500);
    });
};

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ where: { username: username } }).then(user => {
    if (!user) {
      res.status(401).send({ message: 'Invalid username or password.' });
    } else {
      const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
      if (user.password === hashedPassword) {
        res.send({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          password: user.password,
          email: user.email,
          phone_number: user.phone_number,
          role: user.role,
          message: 'Logged in successfully' });
      } else {
        res.status(401).send({ message: 'Invalid password.' });
      }
    }
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || '500'
    });
  });
};