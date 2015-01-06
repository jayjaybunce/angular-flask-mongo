'use strict';

/* Filters */

app.filter("decimalPlaces", [
  "$filter",
  function($filter){
    return function(value, places) {
      // Short-circuit
      if( value===undefined  || value===null ){
        return value;
      }

      // Default places=2
      places = typeof places !== "undefined" ? places : 2;
      value  = isNaN(value)  !== true        ? value  : 0;
      value  = value         !== "0E-10"     ? value  : 0;

      // Round it off, and convert it to a string
      var s = $filter("number")(value, places);

      // Find the decimal
      var pos = s.indexOf(".");

      // Short-circuit for no decimal
      if( pos===-1 ){
        pos = s.length;
      }

      // Capture everything before the decimal
      var result = s.slice(0, pos) + ".";

      // Add the decimal places or zeros
      for(var i=1; i<=places; ++i){
        if( i < (s.length-pos) ){
          result += s[pos + i];
        }else{
          result += "0";
        }
      }

      return result;
    };
  }
]);