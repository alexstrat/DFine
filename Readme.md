I was looking for an easy way to organize a javascript module client-side and node-side whithout using asynchronous call in the browser but a server-side builder.

The syntax should be familiar and get inspiration of the commmonJS AMD spec..

## Use

Your repertory looks like this : 

```
--module
    |
    |--module.js
    |
    |--sub
    |   |--script.js
    |
    |--core
        |--dep1.js
        |--dep2.js
        |--class.js
```

Your `script.js` should nouw look like this :

```js
(typeof DFine === 'function' ? {DFine : DFine} : require('DFine').DFine);

DFine('module.sub.script', ['module.core.dep1', 'module.core.dep1'], function(dep1, dep2, require, exports) {
  //      ^ name of the module    ^ dependencies of the module          ^ the code in this function
  
        var class = require('module.core.class'); //use require if you want to add some dependencies
        
        exports.use_dep = function(){ //exports will what you get at the end 
          dep1.use();
          dep2.use();
        };
        
        // Do the stuff you want here as usual..
  }
);

```

## What you get

### In Node

  If yout want to do some test on your `script.js` without loading all your module but with the dependencies needed, just use :
  
  ```js
  var script = require('rigth/paht/to/your/script.js');
  
  //and now test it :
  script.use_dep(); //it should work
  ```
  
### In browser
  
  Before open up your browser you should have built your module according to the depencies. That is done like that :
  
  ```js 
  var builder = require('DFine').builder;
  
  var code = builder.build('path/to/your/module.js');
  var min_code = builder.minbuild('path/to/your/module.js');
  
  //and write code and min_code in the appropirate file
  ```
  
  What you should pass as argument of builder is the entry point of your module : the dependencies of this file will be included in the build, and the dependencies of the dependicies too, and so on..
  
  Tips : you can pass several entry point in an array !
  
  So, when you load your built script in your browser you got all you need :
  
  ```js
  module.sub.script.use_dep(); //should work
  module.dp1; //should be here too
  //and all you need also, nice !
  ```
  _Warning_ : yes, you probably have noticed, I have polluted the name-space in the browser. You got as global variable the `DFine` function.. Is this really annoying ??
  