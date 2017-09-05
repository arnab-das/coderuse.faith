(function(){
  'use strict';

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  $(document).ready(function(){
    var appId = 'app:coderuse.faith';
    var endPoint = 'https://search.com/v1';
    var searchQuery = getUrlParameter('q');

    $.ajaxSetup({
      headers: {'Authorization': 'Anonymous ' + appId}
    });
    // $.ajax({
    //   url: endPoint + '/blogposts?q=' + searchQuery,
    //   method: 'GET'
    // }).then(function(data){
    //   console.log(data);
    // }, function(err){
    //   console.log(err);
    // });
  });
}());