const Model = require('../models'),
    response  = require('../helpers/response'),
    Kecamatan = Model.Kecamatan,
    Data_kasus = Model.Data_kasus,
    Sequelize = require('sequelize');

module.exports = {
    list (req,res) {
        Kecamatan.findAll({
            
                
                attributes: [
                    'id','uuid', 'nama', 'lat', 'long', 'kodepos',
                    [ Sequelize.fn('COUNT', Sequelize.col('data_kasus.kecamatan_id')), 'totalKasus']], 
               
                include: [{
                    // Model: {Data_kasus,  Kecamatan},
                    // all: true,
                    attributes: [],
                    on: {
                        col1: Sequelize.where(Sequelize.col('Kecamatan.uuid'), '=', Sequelize.col('data_kasus.kecamatan_id'))
                    }
                }],
           
            group: ['Kecamatan.uuid']
        })
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