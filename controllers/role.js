const Model = require('../models'),
    response  = require('../helpers/response'),
    Role = Model.roles

module.exports = {
    list (req,res) {
        Role.findAll()
        .then((data) => {
            return res.status(201).json( response.success('Role successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    find (req, res) {
        Role.findOne({
            where : {
                uuid : req.body.uuid
            }
        })
        .then((data) => {
            return res.status(201).json( response.success('Role successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    create(req, res) {
        Role.create(req.body)
        .then((data) => {
            return res.status(201).json( response.success('Role successfully created', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    update (req, res) {
        Role.update(req.body, {
            where: { uuid: req.body.uuid }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`Role with uuid ${req.body.uuid} updated successfully`, true) )
            } else {
                return res.status(404).json( response.error(`Role with uuid ${req.body.uuid} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    },
    destroy (req, res) {
        Role.destroy({
            where: { uuid: req.body.uuid }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`Role with uuid ${req.body.uuid} deleted successfully`, true) )
            } else {
                return res.status(404).json( response.error(`Role with uuid ${req.body.uuid} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    }
}