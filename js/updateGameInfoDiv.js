function updateGameInfoDiv(game, div){
	// Clear the old data
	div.html("");

	const some_html = `
	  <div class="module">
	    <h2>Picked By:</h2>
	    <p>${game.guests}</p>
	  </div>
	`;

	//Append the new data
	div.append("div")
		.selectAll('li')
		.data(game.guests)
		.enter()
		.append('li')
		.html(String);
}