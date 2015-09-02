app.factory("Sessions", ["$firebaseObject",
  function($firebaseObject) {
    return function(sessUrl) {
      var ref = new Firebase(sessUrl);
      return $firebaseObject(ref);
    };
  }
]);
