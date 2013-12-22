/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (arguments.length === 1) {
      return array[0];
    } else {
      return array.slice(0, n);
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (arguments.length === 1) {
      return array[array.length - 1];
    } else {
      if (n === 0) {
        return [];
      } else {
        return array.slice(-n);        
      }
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){

    var result = -1;
    _.each(array, function(value, key) {
      if(value === target && result === -1) {
        result = key;
      }
    });
    return result;
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var result = [];
    _.each(collection, function(value, index, collection) {
      if (iterator(value)) {
        result.push(value);
      }
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(value) {
      return !iterator(value);
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, sorted, iterator) {
    if (arguments.length === 1) {
      sorted = false;
      iterator = function(value) {
        return value
      }
    }
    var result = [];

    //If the array is sorted, we can push each value of the array except if the transformed value
    //equals the transformed value of the previous value
    if (sorted) {
      _.each(array, function(value, index, collection) {
        if (index === 0) {
          result.push(value);
        } else{
          if (iterator(value) !== iterator(array[index - 1])) {
            result.push(value);
          }
        }
      });
    } else {
      //If the array is not sorted, we need for each value of the array, to walk the "array of the transformed value",
      //if it is not found, then we can push the value
      var resultTransformed = [];

      _.each(array, function(value, index, collection) {
        var valueTransformed = iterator(value);
        var duplicate = false;
        _.each(resultTransformed, function(valueT, indexT, collectionT) {
          if (valueTransformed === valueT) {
            duplicate = true;
          }
        });
        if (duplicate === false) {
          resultTransformed.push(valueTransformed);
          result.push(value);
        }
      });
    }
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(array, function(value) {
      result.push(iterator(value));
    })
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    if (typeof methodName === 'string') {
      return _.map(list, function(value, key) {
        return value[methodName](args);
      });
    } else if (typeof methodName === 'function') {
      return _.map(list, function(value, key) {
        return methodName.apply(value, args);
      });
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {

    var result = 0;

    if (arguments.length === 3) {
      result = initialValue;
    }

    _.each(collection, function(value, index, collection) {
      console.log(result);
      result = iterator(result, value);
    });

    return result;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    //Provide a basic iterator if missing
    if (arguments.length === 1) {
      iterator = function(item) {
        return item;
      }
    }

    return _.reduce(collection, function(allElementsTrue, item) {
      if(allElementsTrue === false) {
        return false;
      }
      var result = iterator(item);
      return (typeof result === 'boolean') ? result : !!result;

    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (arguments.length === 1) {
      iterator = function(item) {
        return item;
      }
    }

    return !_.every(collection, function(item) {
      return !iterator(item);

    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {

    var objectsToAdd = Array.prototype.slice.call(arguments, 1);

    _.each(objectsToAdd, function(value, index, collection) {
      _.each(value, function(value, prop, collection) {
        obj[prop] = value;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var objectsToAdd = Array.prototype.slice.call(arguments, 1);

    _.each(objectsToAdd, function(value, index, collection) {
      _.each(value, function(value, prop, collection) {
        prop in obj ? true : obj[prop] = value;
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var resultsDic = {};

    return function(arg) {
      return arg in resultsDic ?
        resultsDic[arg] :
        resultsDic[arg] = func.apply(this, arguments);
    }

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    var args =  Array.prototype.slice.call(arguments, 2);

    return setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var work = array;
    console.log('initial work is: ' + work);
    var shuffled = [];

    var getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    //Implement the original Fisher and Yates original method
    while (work.length > 0) {
      var pick = getRandomInt(0, work.length - 1);
      console.log('pick is: ' + pick);

      shuffled.push(work[pick]);
      console.log('shuffled is: ' + shuffled);
      work.splice(pick, 1);
      console.log('work is: ' + work);
    }

    return shuffled;

  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof iterator === 'string') {
      return collection.sort(function(a,b) {
        if(a[iterator] > b[iterator]) {
          return 1;
        } else if (a[iterator] < b[iterator]) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (typeof iterator === 'function') {
      return collection.sort(function(a,b) {
        if(iterator(a) > iterator(b)) {
          return 1;
        } else if (iterator(a) < iterator(b)) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      return collection;
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var listOfArrays = Array.prototype.slice.call(arguments, 0);
    var firstArray = arguments[0];
    var mainResultArray = [];

    //Loop on each value of the first array
    _.each(firstArray, function(valueFirstArray, indexFirstArray) {
      var resultArray = [];

      //Loop on each array of the list of arrays
      _.each(listOfArrays, function(arr, index) {
        if (arr[indexFirstArray]) {
          resultArray.push(arr[indexFirstArray]);
        } else {
          resultArray.push(undefined);
        }
      });
      mainResultArray.push(resultArray);

    });

    return mainResultArray;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    var result = [];

    var flat = function(nestedArray) {
      _.each(nestedArray, function(value) {
        if (Array.isArray(value)) {
          flat(value);
        } else {
          result.push(value);
        }
      });
    }

    flat(nestedArray);

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var firstArray = arguments[0];
    var otherArrays = Array.prototype.slice.call(arguments, 1);
    var intersectArray = [];

    //Loop on the elements of the first array
    _.each(firstArray, function(valueFirst, indexFirst) {

      //For each element of the first array, check that "every" other array "contains" the element
      //If this the case, put the element in the intersect array
      if (_.every(otherArrays, function(valueOtherArray, indexOtherArray) {
        return _.contains(valueOtherArray, valueFirst);
      })) {
        intersectArray.push(valueFirst);        
      }
    
    });

    return intersectArray;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var firstArray = array;
    var nextArrays = Array.prototype.slice.call(arguments, 1);
    //default the diffArray to a copy of the first array
    var diffArray = firstArray.slice(0);

    //Loop on the elements of the first array
    _.each(firstArray, function(valueFirst, indexFirst) {

      //For each element of the first array, check that "some" (at least one) other array "contains" the element
      //If this the case, remove the element from the diffArray
      if (_.some(nextArrays, function(valueNextArray) {
        return _.contains(valueNextArray, valueFirst);
      })) {
        //I use indexOf here because as soon as one elements is removed from diffArray, the indexes are not in sync with firstArray anymore
        diffArray.splice(diffArray.indexOf(valueFirst), 1);
      }
    });
    return diffArray;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {

    var storedResult; //Last stored result of func
    var activeTimeWindow = false; //Indicates if the window of time is active
    var called = false; //Indicates if there was at least one call to func during the window of time

    return function() {

      var callFunction = function() {
        //Call function and store the result
        storedResult = func.apply(this, arguments);
        //Activate the window of time
        activeTimeWindow = true; 
        //End the window of time after the specified time
        setTimeout(function() {
          activeTimeWindow = false;
          //If the function was called at least once during the window of time, start over again
          if (called) {
            called = false;
            callFunction();
          }
        }, wait);
      }

      //If window of time not active, call the func
      if (!activeTimeWindow) {
        callFunction();
      } else {
        //If window of time active, show that the function was called at least once during the window
        called = true;
      }

      //Always return the last stored result
      return storedResult;
    };
  };

}).call(this);
