const Model = require('../models'),
    response  = require('../helpers/response'),
    Kecamatan = Model.Kecamatan

module.exports = {
    list (req,res) {
        Kecamatan.findAll()
        .then((data) => {
            return res.status(201).json( response.success('Kecamatan successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    find (req, res) {
        Kecamatan.findOne({
            where : {
                uuid : req.body.uuid
            }
        })
        .then((data) => {
            return res.status(201).json( response.success('Kecamatan successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    create(req, res) {
        Kecamatan.create(req.body)
        .then((data) => {
            return res.status(201).json( response.success('Kecamatan successfully created', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    update (req, res) {
        Kecamatan.update(req.body, {
            where: { uuid: req.body.uuid }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`Kecamatan with uuid ${req.body.uuid} updated successfully`, true) )
            } else {
                return res.status(404).json( response.error(`Kecamatan with uuid ${req.body.uuid} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    },
    destroy (req, res) {
        Kecamatan.destroy({
            where: { uuid: req.body.uuid }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`Kecamatan with uuid ${req.body.uuid} deleted successfully`, true) )
            } else {
                return res.status(404).json( response.error(`Kecamatan with uuid ${req.body.uuid} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    }
}