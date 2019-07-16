$(function() {
	var availableNames = new Array();
	
	var movie_url = "movielist/movielist.xml";
	if(window.location.href.includes('movieReview.html')) 
		movie_url = "../movielist/movielist.xml";
		
	$.ajax({
		url: movie_url,
		dataType: "xml",
		type: "GET",
		timeout: "5000",
		error: function(request, option, error) {
			console.log($(error));
			alert('Failed to load movie data, try refresh again or contact the administrator. ');
		},
		success: function( xmlResponse ) {
			var data = $( "movie", xmlResponse ).map(function() {
				return $.trim( $( "title", this ).text());
			}).get();
			$( "#txtSearch" ).autocomplete({
				source: data,
				minLength: 3
			});
		}
    });
});

$(document).ready(function() {
	$("body").css("padding-top", "50px");
});

function search_movie(form) {
	var movie = form.txtSearch.value;
	if(movie.length < 3)
		alert('Movie name must be at least three characters..');
	else {
		if(window.location.href.includes('movieReview.html')) {
			window.location.href = 'movies.html#title=' + btoa(encodeURIComponent(movie));
		} else {
			window.location.href = 'movielist/movies.html#title=' + btoa(encodeURIComponent(movie));
			if(window.location.href.includes('movies.html')) {
				window.location.reload();
			}
		}
	}
	$( "#txtSearch" ).val('');
	return false;
}