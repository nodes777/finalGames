function buildHTML(data, guests){

		console.log("success:", data);
	    console.log("First Result Name:", data.results.name);
	    console.log("First Result guid:", data.results.guid);
	    // screen_url size is 480 x 270, ratio is 16:9
	    console.log("First Result image url:", data.results.image.screen_url);
	   	console.log("First Result deck:", data.results.deck);
	   	let date = new Date(data.results.original_release_date)
	   	console.log("First Result original release:", date.toDateString());
	   	for (var i = data.results.platforms.length - 1; i >= 0; i--) {
	   			console.log("First Result platforms:", data.results.platforms[i].name)
	   	}
// style="width:288px;height:162px;"
	let html = `
		<h2>${data.results.name}</h2>
		<img src="${data.results.image.screen_url}" style="width:288px;height:162px;"" ">
		<p>${data.results.deck}</p>
		<p>Original Release Date: ${date.toDateString()}</p>
		<p>Platforms</p>
		<ul class="platforms">
    		${data.results.platforms.map(platform => `<li>${platform.name}</li>`).join("")}
		</ul>
		<h3>Picked By:</h3>
	    <p>${guests.join(", ")}</p>
	`;

	return html;
}