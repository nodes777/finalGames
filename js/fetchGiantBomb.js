//da5e0448ce1c37b176ea9ed380dccf31e7e1c556

// $.ajax(
// 	{
// 	url: "http://www.giantbomb.com/api/game/3030-4725/?api_key=da5e0448ce1c37b176ea9ed380dccf31e7e1c556",
// 	success: function(result){
//         $("#chart").html(result);
//     }
// });
//http://www.giantbomb.com/api/game/3030-4725/?api_key=da5e0448ce1c37b176ea9ed380dccf31e7e1c556

function makeGiantBombAjaxReq(name) {
	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: `http://www.giantbomb.com/api/search/?format=jsonp&api_key=da5e0448ce1c37b176ea9ed380dccf31e7e1c556&query=${name}`
	}).done(function(data) {
	    console.log("success:", data);
	    console.log("First Result Name:", data.results[0].name);
	}).fail(function() {
	  alert("error");
	})
}
