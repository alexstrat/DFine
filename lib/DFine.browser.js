//USAGE : DFine('module.sub.script', 
//              ['module.core.dep1', 'module.core.dep1'], 
//              function(dep1, dep2)

(function(global){
  
     
  var depLevel = 0;
  var depStack = [];
  var depTree = {};

  var _iterRequire = function(dep) {
    //dep = 'kado.sub.lib
    var ar = dep.split('.');
    //pop out the last element : key = 'lib'; dep = 'kadoh.sub'
    var key = ar[(ar.length -1)];
    ar.pop();
    dep = ar.join('.');

    if(ar.length === 0){
      //if key was the last element to pop, he was the global variable
      var ret = global[key];
      return (typeof ret === 'undefined' ? {} : ret);
    }
    else{
      //else retrieve it iterativeliy..
      return _iterRequire(dep)[key];
    }

  };
  
  var _assign = function(ns, data) {
    var parts = ns.split('.'),
        parent = global;

   
    for (var i = 0; i < parts.length-1; i += 1) {
    // create a property if it doesn't exist
      parent[parts[i]] = parent[parts[i]] || {}; 
      parent = parent[parts[i]];
      }
      
      parent[parts[parts.length]] = data;
    
  };
  
  var _addtoDepStack = function(ns, depNames, fn) {
    //add ns to the top of stack
    depTree[ns]= { 
      num : depLevel
    , fn : fn
    };
    depLevel++;
    
    //move the dep up on ns
    for(i in depNames) { var dep = depNames[x];
      if(depTree[dep]){
        depTree[dep].num = depLevel;
        depLevel++;
      }
    }
    
  };
 
  
  global.DFine = function(ns, depNames, moduleBody) {
    //if the user didn't put dependecies
    if(arguments.length === 2 && typeof depNames === 'function'){
      moduleBody = depNames;
      depNames = [];
    }
    
    _addtoDepStack(ns, depNames, function(){ 
      
      var args = depNames.map(function(x){return _iterRequire(x)});      
      //and call it
      var data = moduleBody.apply(null, deps);
      
      _assign(ns, data);
      });
    };
    
    global.DFine.build = function() {
      for(key in depTree) {
        depStack.push(depTree[key]);
      }
      
      depStack.sort(function(a,b) {
        return a.num - b.num;
      });
      
      for(x in depStack) {
        depStack[i].fn.call();
      }
      
    };
  }(this));
  