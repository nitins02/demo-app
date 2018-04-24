
let {equipmentDB} = require('../db/cloudant');
let Response = require('./response');

function addEquipment(req, res) {
    var equipment = req.swagger.params.equipment.value;
    equipmentDB.get(equipment.equipmentNumber, function(err, doc){
        if(!doc){
            equipmentDB.add(equipment, function(err, result){
                if(!err){
                    res.status(200).json(new Response(200, "Equipment successfully added"));
                }else{
                    res.status(200).json(new Response(400, "Error while adding the Equipment"));
                }
            });
        }else{
            res.status(200).json(new Response(409, "Equipment already exists"));
        }
    });
}

function getEquipment(req, res) {
    var equipmentNumber = req.swagger.params.equipmentNumber.value;
    equipmentDB.get(equipmentNumber, function(err, doc){
        if(!err){
            res.status(200).send(doc);
        }else{
            if(err.error === 'not_found'){
                res.status(404).send("Equipment not found");
            }else{
                res.status(400).send(err);
            }
        }
    });
}

function searchEquipment(req, res) {
    var limit = req.swagger.params.limit.value;
    console.log(">>>limit ", limit);

    equipmentDB.listWithLimit(limit, function(err, doc){
        res.json(doc);
    });
    
}

module.exports = {
    addEquipment: addEquipment,
    getEquipment: getEquipment,
    searchEquipment: searchEquipment
}