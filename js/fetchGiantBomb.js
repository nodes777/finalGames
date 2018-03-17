//da5e0448ce1c37b176ea9ed380dccf31e7e1c556

// $.ajax(
// 	{
// 	url: "http://www.giantbomb.com/api/game/3030-4725/?api_key=da5e0448ce1c37b176ea9ed380dccf31e7e1c556",
// 	success: function(result){
//         $("#chart").html(result);
//     }
// });
//http://www.giantbomb.com/api/game/3025-4013/?format=jsonp&api_key=da5e0448ce1c37b176ea9ed380dccf31e7e1c556
//	search example    url: `http://www.giantbomb.com/api/search/?format=jsonp&api_key=da5e0448ce1c37b176ea9ed380dccf31e7e1c556&query=${name}`

function searchGiantBombAjaxReq(name) {
	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: `http://www.giantbomb.com/api/search/?format=jsonp&api_key=da5e0448ce1c37b176ea9ed380dccf31e7e1c556&query=${name}`
	}).done(function(data) {
	    console.log("success:", data);
	    console.log("First Result Name:", data.results[0].name);
	    console.log("First Result guid:", data.results[0].guid);
	}).fail(function() {
	  alert("error");
	})
}

// Get all info from sample json
// exampleData.forEach(function(d){
// 	searchGiantBombAjaxReq(d.name)
// })


function makeGiantBombAjaxReq(game) {
	console.log(game.guid)
	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: `http://www.giantbomb.com/api/game/${game.guid}/?format=jsonp&api_key=da5e0448ce1c37b176ea9ed380dccf31e7e1c556`
	}).done(function(data) {
	    // console.log("success:", data);
	    // console.log("First Result Name:", data.results.name);
	    // console.log("First Result guid:", data.results.guid);
	    // console.log("First Result image url:", data.results.image.medium_url);
	   	// console.log("First Result deck:", data.results.deck);
	   	// let date = new Date(data.results.original_release_date)
	   	// console.log("First Result original release:", date.toDateString());
	   	// for (var i = data.results.platforms.length - 1; i >= 0; i--) {
	   	// 		console.log("First Result platforms:", data.results.platforms[i].name)
	   	// }
	   	let html = buildHTML(data, game.guests)
		renderNewGameInfo(html)
	}).fail(function() {
	  alert("error");
	})
}
