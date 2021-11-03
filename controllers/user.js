const Model = require('../models'),
    response  = require('../helpers/response'),
    User = Model.users,
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    saltRounds = 10

module.exports = {
    create(req, res) {
        User.create(req.body)
        .then((data) => {
            return res.status(201).json( response.success('Role successfully created', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    login: function(req, res, next) {
        User.findOne({
            where : {
                email : req.body.email
            },
            include: 'role'
        })
        .then((data) => {
            if(data.is_active) {
                if(bcrypt.compareSync(req.body.password, data.password)) {
                    const token = jwt.sign({id: data.id}, req.app.get('secretKey'), { expiresIn: '4h'});
                    return res.status(200)
                    .json( response.success('User successfully logined', 
                        { 
                            name : data.name,
                            email : data.email,
                            role : data.role.name,
                            role_id: data.role.id,
                            token : token,
                            
                        }
                    ))
                } else {
                    return res.status(422).json( response.error('"Invalid email/password!!!') )
                }
            } else {
                return res.status(422).json( response.error('"Your account disabled!!!') )
            }
            
        })
        .catch((err) => {
            return res.status(422).json( response.error(err) )
        })
    },
    list (req, res) {
        User.findAll({
            include : 'role'
        })
        .then((data) => {
            return res.status(201).json( response.success('User successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    destroy (req, res) {
        User.destroy({
            where: { uuid: req.body.uuid }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`User with uuid ${req.body.uuid} deleted successfully`, true) )
            } else {
                return res.status(404).json( response.error(`User with uuid ${req.body.uuid} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    },
    update (req, res) {
        User.update({ name: req.body.name , is_active : req.body.is_active}, {
            where: { uuid: req.body.uuid }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`User with uuid ${req.body.uuid} updated successfully`, true) )
            } else {
                return res.status(404).json( response.error(`User with uuid ${req.body.uuid} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    },
    changePassword: function(req, res, next) {
        User.findOne({
            where : {
                email : req.body.email
            }
        })
        .then((data) => {
            if(bcrypt.compareSync(req.body.old_password, data.password)) {
                User.update({ password: req.body.new_password }, {
                    where: { uuid: data.uuid }
                })
                .then(resp => {
                    if(resp == 1) {
                        return res.status(200).json( response.success(`User password with uuid ${data.uuid} changed successfully`, true) )
                    } else {
                        return res.status(404).json( response.error(`User password with uuid ${data.uuid} fail to change`, false) )
                    }
                })
                .catch(err => {
                    return res.status(500).json( response.error(err))
                });
            } else {
                return res.status(422).json( response.error('"Old Password Wrong!!!') )
            }
        })
        .catch((err) => {
            return res.status(422).json( response.error(err) )
        })
    },
}