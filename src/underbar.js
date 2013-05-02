/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' means either an object or an array.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    /* SOLUTION */
    if (n == null) {
      return array[0];
    }
    return Array.prototype.slice.call(array, 0, (n || 0));
    /* END SOLUTION */
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    /* SOLUTION */
    if (n == null) {
      return array[array.length - 1];
    }
    if (n === 0) {
      return [];
    }
    return Array.prototype.slice.call(array, Math.max(0, array.length - n));
    /* END SOLUTION */
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    /* SOLUTION */
    if (iterator == null) {
      return undefined;
    }

    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }
    /* END SOLUTION */
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    /* SOLUTION */
    var result = -1;
    array = Array.prototype.slice.call(array);

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
    /* END SOLUTION */
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    /* SOLUTION */
    var result = [];

    _.each(collection, function(val) {
      iterator(val) && result.push(val);
    });

    return result;
    /* END SOLUTION */
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    /* SOLUTION */
    return _.filter(collection, function(val) {
      return !iterator(val);
    });
    /* END SOLUTION */
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    /* SOLUTION */
    var hash = {};

    _.each(array, function(val) {
      hash[val] = val;
    });

    return Object.keys(hash);
    /* END SOLUTION */
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    /* SOLUTION */
    var result = [];

    _.each(array, function(val, index, array) {
      result.push(iterator(val, index, array));
    });

    return result;
    /* END SOLUTION */
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
    /* SOLUTION */
    return _.map(list, function(val, i, list) {
      return typeof methodName === 'string' ? list[methodName].apply(val, args)
                                            : methodName.apply(val, args);
    });
    /* END SOLUTION */
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
    /* SOLUTION */
    initialValue = initialValue || 0;

    _.map(collection, function(val) {
      initialValue = iterator(initialValue, val);
    });

    return initialValue;
    /* END SOLUTION */
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
    /* SOLUTION */
    iterator = iterator || function(i) { return i; };

    return !!_.reduce(collection, function(allPassed, val) {
      return allPassed && iterator(val);
    }, true);
    /* END SOLUTION */
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: Try re-using every() here.
    /* SOLUTION */
    iterator = iterator || function(i) { return i; };

    return !_.every(collection, function(item) {
      return !iterator(item);
    });
    /* END SOLUTION */
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
    /* SOLUTION */
    _.each(Array.prototype.slice.call(arguments, 1), function(object) {
      _.each(object, function(prop, key) {
        obj[key] = prop;
      });
    });

    return obj;
    /* END SOLUTION */
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    /* SOLUTION */
    _.each(Array.prototype.slice.call(arguments, 1), function(object) {
      _.each(object, function(prop, key) {
        obj[key] === undefined && (obj[key] = prop);
      });
    });

    return obj;
    /* END SOLUTION */
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
    /* SOLUTION */
    return function() {
      var memo = {};
      return memo[arguments[0]] || func(arguments[0]);
    };
    /* END SOLUTION */
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    /* SOLUTION */
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      return func.apply(null, args);
    }, wait);
    /* END SOLUTION */
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    /* SOLUTION */
    // Convenience function for performing an in-place swap. This should be
    // placed outside of the function body in a production setting.
    var swap = function(arr, a, b) {
      var temp = arr[a];
      arr[a] = arr[b];
      arr[b] = temp;
    };

    var result = array.slice();

    for (var i = 0; i < result.length; i++) {
      var rand = Math.floor(Math.random() * result.length);
      swap(result, i, rand);
    }

    return result;
    /* END SOLUTION */
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
    /* SOLUTION */
    if (!collection.length) {
      throw new TypeError('Collection must be an array.');
    }

    if (Object.prototype.toString.call(iterator) === '[object String]') {
      var iter = iterator;
      iterator = function(item) {
        return item[iter];
      };
    }

    return collection.sort(function(a, b) {
      return iterator(a) - iterator(b);
    });
    /* END SOLUTION */
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    /* SOLUTION */
    var max = 0,
        result = new Array(max);

    _.each(arguments, function(arg) {
      max = Math.max(arg.length, max);
    });

    for (var i = 0; i < max; i++) {
      result[i] = _.pluck(arguments, i);
    }

    return result;
    /* END SOLUTION */
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    /* SOLUTION */
    result = result || [];

    _.each(nestedArray, function(val) {
      Array.isArray(val) ? _.flatten(val, result) : result.push(val);
    });

    return result;
    /* END SOLUTION */
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    /* SOLUTION */
    // Get a copy of all the other arrays. We'll use the array at arguments[0]
    // as our baseline; we only need to check the values in arguments[0] since
    // if another array contains a value not contained within our first array,
    // it's not a valid value.
    var others = Array.prototype.slice.call(arguments, 1);

    // Now, let's get a copy of arguments[0] that doesn't contain duplicates and
    // see if each value appears as an indexOf every single other array.
    return _.filter(_.uniq(arguments[0]), function(item) {
      return _.every(others, function(array) {
        return _.indexOf(array, item) > -1;
      });
    });
    /* END SOLUTION */
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    /* SOLUTION */
    // Get a flattened version of all other input arrays
    var others = _.flatten(Array.prototype.slice.call(arguments, 1));

    // Extract only the items that aren't contained within the flattened
    // `others` array
    return _.filter(array, function(item) {
      return !_.contains(others, item);
    });
    /* END SOLUTION */
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Return an object that responds to chainable function calls for map, pluck,
  // select, etc.
  //
  // See the Underbar readme for details.
  _.chain = function(obj) {
    /* SOLUTION */
    // TODO
    _.extend(obj, _);
    return obj;
    /* END SOLUTION */
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    /* SOLUTION */
    return function() {
      var flag = false;

      if (flag !== true) {
        flag = true;
        func.apply(Array.prototype.slice.apply(arguments));

        setTimeout(function() {
          flag = false;
        }, wait);
      }
    };
    /* END SOLUTION */
  };

}).call(this);
