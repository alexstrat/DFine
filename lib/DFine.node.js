
//USAGE : DFine('module.sub.script', 
//              ['module.core.dep1', 'module.core.dep1'], 
//              function(dep1, dep2)

exports._ = function(clientRequire, clientExports) {


  var _customRequire = function(dep) {
    //wrapp the clientRequire to get the dependencies
    var path = "";//here find a way to find the right path to the appropriate file.


    return clientRequire(path); // Do we really need the client require??
  };

  return {
    DFine : function(ns, depNames, moduleBody) {
      //if the user didin't put dependecies
      if(arguments.length === 2 && typeof depNames === 'function'){
        moduleBody = depNames;
        depNames = [];
      }

      //add the dependencies to the argument
      var args = depNames.map(function(x){return _customRequire(x)});      
      //and call it
      var data = moduleBody.apply(null, deps);

      //manage the returned data which is the export :
      if (data && typeof data === 'object')
      Object.keys(data).forEach(function(key) {
        clientExports[key] = data[key];
      });

      if(data && typeof data === 'function')
      clientExports = data;

    }
  }

};


