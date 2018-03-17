function updateGameInfoDiv(game, div){
	// Clear the old data
	div.html("");

	const some_html = `
	  <div class="module">
	    <h3>Picked By:</h3>
	    <p>${game.guests.join(", ")}</p>
	  </div>
	`;

	makeGiantBombAjaxReq(game.name)

	//Append the new data
	div.appendHTML(some_html);
	//div.appendHTML(gBomb.results[0].deck)

}