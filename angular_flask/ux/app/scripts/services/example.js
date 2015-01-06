'use strict';

app.factory("Customer", [
  "$resource",
  "TrucoinAuthorization",
  function($resource, TrucoinAuthorization){
    return $resource("/api/v2/atm/customer/:id", {}, {
		'get'		: {method:"GET", cache:false, isArray:false, headers: {"Authorization": TrucoinAuthorization}},
		'save'		: {method:'POST', isArray:false, headers: {"Authorization": TrucoinAuthorization}}
    });
  }
]);