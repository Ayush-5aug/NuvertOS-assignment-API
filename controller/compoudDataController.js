'use strict'
const fs = require("fs");
const { parse } = require("csv-parse");
const expressAsyncHandler = require("express-async-handler");
const db = require('../models');

const uploadCompoundData = expressAsyncHandler((req, res) => {
    let CompoundMasterData = []
    try {
        fs.createReadStream(req.file.path)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            CompoundMasterData.push({
                id : row[0],
                compundName: row[1],
                compundDescription: row[2],
                image: row[3],
                attribute: row[4],
                dateModified: row[5],
            });
        })
        .on("end", function () {
            // Inserting into DB
            db.compound.destroy({
                where: {},
                truncate: false
            });
            db.compound.bulkCreate(
                CompoundMasterData
              ).then(() => {
                res.status(200).send({data: "Compound Data imported Successfully"});
              })
              .catch((err) => { throw err });
            })
        .on("error", function (error) {
            throw error;
        });
    } catch (error) {
        res.status(500).send(`Error while saving Compound Data --> ${error}`)
    }
});

const getAllCompoundData = expressAsyncHandler(async (req, res) => {
    try {
        db.compound.findAll().then((compounds) => {
            res.status(200).send(compounds);
        }).catch((err) => {
            throw err;
        })
    } catch (error) {
        res.status(500).send(`Error while fetching Compounds master Data --> ${error}`)
    }
});

const editCompound = expressAsyncHandler(async (req, res) => {
    try {
        db.compound.update(
            { compundName: req.body.compundName, compundDescription: req.body.compundDescription, image: req.body.image, attribute: req.body.attribute, dateModified: req.body.dateModified },
            { where: { id: req.body.id } }
          ).then((response) => {
            res.status(200).send(response);
        }).catch((err) => {
            throw err;
        })
    } catch (error) {
        res.status(500).send(`Error while editing compound data --> ${error}`)
    }
});



module.exports = {
    uploadCompoundData,
    getAllCompoundData,
    editCompound
}
