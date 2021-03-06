//matchResults = document.location.pathname.match(/^\/(.*)\/_design\/(.*?)\//)

/** Configure the database based on current URL **/
//Backbone.couch_connector.config.db_name = matchResults[1]
//Backbone.couch_connector.config.ddoc_name = matchResults[2]
// If set to true, the connector will listen to the changes feed
// and will provide your models with real time remote updates.
// But in this case we enable the changes feed for each Collection on our own.
//Backbone.couch_connector.config.global_changes = false;
Backbone.Model.prototype.idAttribute = '_id';
Coconut = {};

matchResults = document.location.pathname.match(/^\/(.*)\/_design\/(.*?)\//);

if (matchResults === null) {
    console.log('Configuring for Pouchdb');
    Coconut.db_name = 'coconut';
    Coconut.ddoc_name = 'coconut';
} else {
    Coconut.db_name = matchResults[1];
    Coconut.ddoc_name = matchResults[2];
}

Coconut.languages = ["en","pt"]

Backbone.sync = BackbonePouch.sync({
    db: PouchDB(Coconut.db_name)
});

function createDesignDoc(name, mapFunction, reduceFunction) {
    var ddoc = {
        _id: '_design/' + name,
        views: {
        }
    };
    if (typeof reduceFunction !== 'undefined'){
      ddoc.views[name] = { map: mapFunction.toString(), reduce: reduceFunction.toString() };
    } else {
      ddoc.views[name] = { map: mapFunction.toString() };
    }
    return ddoc;
}

var designDocOld = createDesignDoc('by_clientId', function (doc) {
//    if (doc.question) {
//        console.log("doc.question: " + doc.question + " doc.complete: " + doc.complete);
//        if (doc.complete && doc.complete == 'true') {
//            emit(doc.question + ':true:' + doc.lastModifiedAt, null);
            emit(doc.savedBy);
//        }
//    }
});

var byClientIdDesignDoc = createDesignDoc('by_clientId', function (doc) {
    if (doc.clientId) {
        emit(doc.clientId);
    }
});

var byServiceUuidDesignDoc = createDesignDoc('by_serviceUuid', function (doc) {
    if (doc.serviceUuid && (doc.question == 'Individual Registration' || doc.question == 'Admin Registration')) {
        emit(doc.serviceUuid);
    }
});

var by_AdminRegistrationDesignDoc = createDesignDoc('by_AdminRegistration', function (doc) {
    if (doc.serviceUuid &&  doc.question == 'Admin Registration') {
        emit(doc.serviceUuid);
    }
});

var by_DocsDateDesignDoc = createDesignDoc('by_DocsDate', function(doc) {
        emit(doc.lastModifiedAt);
});

var by_AdminDateDesignDoc = createDesignDoc('by_AdminDate', function(doc) {
        emit(doc.savedBy + '|' + doc.lastModifiedAt);
});

var by_StatsDesignDoc = createDesignDoc('by_Stats', function(doc) {
    if (doc.faveColor == 'blue')  {
      emit('faveColor-blue', 1)
    }
    if (doc.faveColor == 'orange')  {
      emit('faveColor-orange', 1)
    }
    if (doc.faveColor == 'red')  {
      emit('faveColor-red', 1)
    }
    if (doc.faveColor == 'yellow')  {
      emit('faveColor-yellow', 1)
    }
    if (doc.faveColor == 'green')  {
      emit('faveColor-green', 1)
    }
    if (doc.faveColor == 'purple')  {
      emit('faveColor-purple', 1)
    }
    if (doc.faveColor == 'brown')  {
      emit('faveColor-brown', 1)
    }
    if (doc.faveColor == 'black')  {
      emit('faveColor-black', 1)
    }
    if (doc.faveColor == 'white')  {
      emit('faveColor-white', 1)
    }
    if (doc.visitedNZbefore == null)  {
      emit('visitedNZbefore-null', 1)
    }
    if (doc.visitedNZbefore == 'Yes')  {
      emit('visitedNZbefore-yes', 1)
    }
    if (doc.visitedNZbefore == 'No')  {
      emit('visitedNZbefore-no', 1)
    }
    if (doc.knowKiwiFromChina == 'Yes')  {
      emit('knowKiwiFromChina-Yes', 1)
    }
    if (doc.knowKiwiFromChina == 'No')  {
      emit('knowKiwiFromChina-No', 1)
    }
    if (doc.coffeeOrTea == 'coffee')  {
      emit('coffeeOrTea-coffee', 1)
    }
    if (doc.coffeeOrTea == 'tea')  {
      emit('coffeeOrTea-tea', 1)
    }
    if (doc.coffeeOrTea == 'both')  {
      emit('coffeeOrTea-both', 1)
    }
    if (doc.coffeeOrTea == 'neither')  {
      emit('coffeeOrTea-neither', 1)
    }
}, '_count');
//});

//var by_AdminByDateDesignDoc = createDesignDoc('by_AdminByDate', function(doc) {
//    if (doc.savedBy) {
//        emit(doc.lastModifiedAt);
//    }
//});
//return emit(document.question + '|' + document.lastModifiedAt, null);
//var by_IndivRegistrationDesignDoc = createDesignDoc('by_AdminRegistration', function(doc) {
//    if (doc.question == 'Individual Registration') {
//        emit(doc.serviceUuid);
//    }
//});

//Backbone.sync.defaults.db.get('_design/by_clientId', function(err, doc) {
//    Backbone.sync.defaults.db.remove(doc, function(err, response) { });
//    console.log("doc deleted: " + err);
//});

Backbone.sync.defaults.db.put(byClientIdDesignDoc).then(function (doc) {
    // design doc created!
    console.log("by_clientId created")
    Backbone.sync.defaults.db.query('by_clientId', {stale: 'update_after'})
    Backbone.sync.defaults.db.viewCleanup()
}).catch(function (err) {
    if (err.name === 'conflict') {
        console.log("by_clientId exists.")
    }
});


//Backbone.sync.defaults.db.get('_design/by_serviceUuid', function(err, doc) {
//  Backbone.sync.defaults.db.remove(doc, function(err, response) { });
//  console.log("doc deleted: " + err);
//});

Backbone.sync.defaults.db.put(byServiceUuidDesignDoc).then(function (doc) {
    // design doc created!
    console.log("by_serviceUuid created")
    Backbone.sync.defaults.db.query('by_serviceUuid', {stale: 'update_after'})
    //Backbone.sync.defaults.db.viewCleanup()
}).catch(function (err) {
    if (err.name === 'conflict') {
        console.log("by_serviceUuid exists.")
    }
});

//Backbone.sync.defaults.db.get('_design/by_AdminRegistration', function(err, doc) {
//  Backbone.sync.defaults.db.remove(doc, function(err, response) { });
//  console.log("doc deleted: " + err);
//});

Backbone.sync.defaults.db.put(by_AdminRegistrationDesignDoc).then(function (doc) {
    // design doc created!
    console.log("by_AdminRegistration created")
    Backbone.sync.defaults.db.query('by_AdminRegistration', {stale: 'update_after'})
    //Backbone.sync.defaults.db.viewCleanup()
}).catch(function (err) {
    if (err.name === 'conflict') {
        console.log("by_AdminRegistration exists.")
    }
});

//Backbone.sync.defaults.db.get('_design/by_DocsDate', function(err, doc) {
//  Backbone.sync.defaults.db.remove(doc, function(err, response) { });
//  console.log("doc deleted: " + err);
//});

Backbone.sync.defaults.db.put(by_DocsDateDesignDoc).then(function (doc) {
    // design doc created!
    console.log("by_DocsDate created")
    Backbone.sync.defaults.db.query('by_DocsDate', {stale: 'update_after'})
    //Backbone.sync.defaults.db.viewCleanup()
}).catch(function (err) {
    if (err.name === 'conflict') {
        console.log("by_DocsDate exists.")
    }
});

//Backbone.sync.defaults.db.get('_design/by_AdminDate', function(err, doc) {
//  Backbone.sync.defaults.db.remove(doc, function(err, response) { });
//  console.log("doc deleted: " + err);
//});

Backbone.sync.defaults.db.put(by_AdminDateDesignDoc).then(function (doc) {
    // design doc created!
    console.log("by_AdminDate created")
    Backbone.sync.defaults.db.query('by_AdminDate', {stale: 'update_after'})
    //Backbone.sync.defaults.db.viewCleanup()
}).catch(function (err) {
    if (err.name === 'conflict') {
        console.log("by_AdminDate exists.")
    }
});

//Backbone.sync.defaults.db.get('_design/by_Stats', function(err, doc) {
//  Backbone.sync.defaults.db.remove(doc, function(err, response) { });
//  console.log("doc deleted: " + err);
//});

Backbone.sync.defaults.db.put(by_StatsDesignDoc).then(function (doc) {
    // design doc created!
    console.log("by_Stats created")
    Backbone.sync.defaults.db.query('by_Stats', {stale: 'update_after'})
    //Backbone.sync.defaults.db.viewCleanup()
}).catch(function (err) {
    if (err.name === 'conflict') {
        console.log("by_Stats exists.")
    }
});

//Backbone.sync.defaults.db.put(by_AdminByDateDesignDoc).then(function (doc) {
//    // design doc created!
//    console.log("by_AdminByDate created")
//    Backbone.sync.defaults.db.query('by_AdminByDate', {stale: 'update_after'})
////    Backbone.sync.defaults.db.viewCleanup()
//}).catch(function (err) {
//    if (err.name === 'conflict') {
//        console.log("by_AdminByDate exists.")
//    }
//});

//Backbone.sync.defaults.db.get('Individual Registration', function(err, otherDoc) {
//    otherDoc.collection = "question";
//    Backbone.sync.defaults.db.put(otherDoc, 'Individual Registration', otherDoc._rev, function(err, response) {
//        console.log("response: " + response);
//    });
//});

Handlebars.registerHelper('filterAdmin', function(items, options) {
    var out = "<ul>";

    for(var i=0, l=items.length; i<l; i++) {
        out = out + "<li>" + options.fn(items[i]) + "</li>";
    }

    return out + "</ul>";
});


