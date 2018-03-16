function updateGameInfoDiv(game, div){
	// Clear the old data
	div.html("");
	//Append the new data
	div.append("div")
		.selectAll('li')
		.data(game.devs)
		.enter()
		.append('li')
		.html(String);
}