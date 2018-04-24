
// Load the Cloudant library.
var Cloudant = require('@cloudant/cloudant');

// Initialize Cloudant with settings from .env
var username = process.env.cloudant_username;
var password = process.env.cloudant_password;

if(process.env.VCAP_SERVICES) {
    let VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES);
    let credentials = VCAP_SERVICES["cloudantNoSQLDB"][0].credentials;
    username = credentials.username;
    password = credentials.password;
}

var cloudantDB = Cloudant({account:username, password:password}, function(err, cloudant) {
    if (err) {
      console.log('Failed to initialize Cloudant: ' + err.message);
    }else{
        console.log("Connected")
    }
});

var getDB = function(dbName) {
    var newdb = cloudantDB.db.use(dbName);
    return newdb;
};

function createDB(dbName) {
    var self = this;
    self._dbName = dbName;
    initDB(self);
}

var initDB = function(dal) {
    dal._mydb = getDB(dal._dbName);
    dal.attachment = dal._mydb.attachment;
}

createDB.prototype.get = function(id, callback) {
    var self = this;
    self._mydb.get(id, function(err, doc) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, doc.equipment);
        }
    });
};

createDB.prototype.list = function(callback) {
    var self = this;
    self._mydb.list(function(err, doc) {
        if (err) {
            callback("Error in list", null);
        } else {
            let results = [];
            doc = doc.filter(function(row) {
                return results.push(row.equipment);
            });
            callback(null, results);
        }
    });
};

createDB.prototype.listWithLimit = function(limit, callback) {
var self = this;
    self._mydb.list({
        include_docs: true,
        limit: limit,
        descending: false
    }, function(err, doc) {
        if (err) {
            callback("Error in listWithLimit", null);
        } else {
            let results = [];
            doc.rows = doc.rows.filter(function(row) {
                return row.id.indexOf("_design") !== 0 && results.push(row.doc.equipment);
            });
            callback(null, results);
        }
    });
};

createDB.prototype.add = function(doc, callback) {
    var self = this;
    doc = Object.assign({_id:doc.equipmentNumber, equipment: doc});
    
    self._mydb.insert(doc, function(err, doc) {
        if (err) {
            callback("Error in add", null);
        } else {
            callback(null, doc);
        }
    });
};


module.exports = createDB;

