var superHeroes = ['Superman', 'Batman', 'The Hulk', 'Iron Man', 'Spiderman'];

jQuery(document).ready(function(){
	$('#addSuperHero').on('click', function(){
		var newButton = $('#superHeroInput').val().trim();
		superHeroes.push(newButton);
		
		renderButtons();
		return false;
	});	

	$('#superHeroes').on('click', 'img', function(){
		if ($(this).val() == 'still'){
			var imageNumber = $(this).attr('id');
			var gifUrl = $('#gifImage' + imageNumber).val();
			$(this).attr('src', gifUrl);
			$(this).val('gif');
		}
		else{
			var imageNumber = $(this).attr('id');
			var stillUrl = $('#stillImage' + imageNumber).val();
			$(this).attr('src', stillUrl);
			$(this).val('still');
		}
	})

	$(document).on('click', '.hero', displayHeroInfo);
	renderButtons();
});

function displayHeroInfo(){
	var hero = $(this).attr('data-name');
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + hero + '&api_key=dc6zaTOxFJmzC&limit=10&rating=pg';
	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {
			$('#superHeroes').empty();

			for(var i=0; i < response.data.length; i++){
				var superDiv = $('<div>');
				superDiv.addClass('');

				var url = response.data[i].images.fixed_height_still.url;
				var imageHtml = $('<img>');
				imageHtml.attr('src', url);
				imageHtml.attr('id', i);
				imageHtml.val('still');

				var rating = response.data[i].rating;
				var ratingHtml = $('<p>').text("Rating: " + rating);

				var stillImageHtml = $('<input>').attr('type', 'hidden');
				stillImageHtml.val(url);
				stillImageHtml.attr('id', 'stillImage' + i);

				var gifImageHtml = $('<input>').attr('type', 'hidden');
				gifImageHtml.val(response.data[i].images.fixed_height.url);
				gifImageHtml.attr('id', 'gifImage' + i);

				superDiv.append(ratingHtml);
				superDiv.append(imageHtml);
				superDiv.append(gifImageHtml);
				superDiv.append(stillImageHtml);
				
				$('#superHeroes').append(superDiv);
			}
		}); 
};

function renderButtons(){ 
	$('#superHeroButtons').empty();
	for (var i = 0; i < superHeroes.length; i++){
		// Then dynamicaly generates buttons for each movie in the array
	    var button = $('<button>') 
	    button.addClass('hero'); 
	   	button.attr('data-name', superHeroes[i]); 
	    button.text(superHeroes[i]);
	    $('#superHeroButtons').append(button); 

	}
}