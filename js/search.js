(function () {
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

  $(document).ready(function () {
    var searchQuery = getUrlParameter('q');
    var endPoint = 'http://89.163.220.7:7539/api/search?q=' + searchQuery;

    Handlebars.registerHelper('slugify', function(input) {
      if(!input) {
        return input;
      }
      return input.split(' ').join('-');
    });

    $.ajaxSetup({
      cache: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      }
    });
    $.ajax({
      url: endPoint,
      method: 'GET'
    }).then(function (data) {
      var source   = $("#post-template").html();
      var template = Handlebars.compile(''
        + '{{#each this}}'
        + '<h3 class="post-month" id="{{ slugify yearMonth }}">{{ yearMonth }}</h3>'
        + '<ul class="post-list">'
        + '  {{#each posts}}'
        + '  <li class="h-entry">'
        + '    <a href="{{ url }}" class="p-name u-url">{{ name }}</a>'
        + '    <time class="dt-published">{{ date }}</time>'
        + '  </li>'
        + '  {{/each}}'
        + '</ul>'
        + '{{/each}}'
      );
      var postsHtml    = template(data);
      $('.posts-list').html(postsHtml);
    }, function (err) {
      console.log(err);
    });
  });
}());