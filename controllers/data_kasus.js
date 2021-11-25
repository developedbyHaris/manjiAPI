const Model = require('../models'),
    response  = require('../helpers/response'),
    Data_kasus = Model.Data_kasus

module.exports = {
    list (req,res) {
        Data_kasus.findAll({
            include:  [{ 
                all: true, 
                nested: true 
               }]
            
        })
        .then((data) => {
            return res.status(201).json( response.success('Data_kasus successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    find (req, res) {
        Data_kasus.findOne({
            where : {
                uuid : req.body.uuid
            }
        })
        .then((data) => {
            return res.status(201).json( response.success('Data_kasus successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },

    listbygroup (req, res) {
        Data_kasus.findAll({
            where : {
                kecamatan_id : req.body.kecamatan_id
            },
            include:  [{ 
                all: true, 
                nested: true 
               }]
        })
        
        .then((data) => {
          
            return res.status(200).json( response.success('Asset_Sub_Category successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    create(req, res) {
        Data_kasus.create(req.body)
        .then((data) => {
            return res.status(201).json( response.success('Data_kasus successfully created', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    update (req, res) {
        Data_kasus.update(req.body, {
            where: { uuid: req.body.uuid }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`Data_kasus with uuid ${req.body.uuid} updated successfully`, true) )
            } else {
                return res.status(404).json( response.error(`Data_kasus with uuid ${req.body.uuid} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    },
    destroy (req, res) {
        Data_kasus.destroy({
            where: { uuid: req.body.uuid }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`Data_kasus with uuid ${req.body.uuid} deleted successfully`, true) )
            } else {
                return res.status(404).json( response.error(`Data_kasus with uuid ${req.body.uuid} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    }
}