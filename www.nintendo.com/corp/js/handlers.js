/* /corp/js/handlers.jsp */

$(function(){
	$('.search-form').on('submit', onSearchFormSubmit);
});

function onSearchFormSubmit( $event ){
	$event.preventDefault();
	var formData = $(this).serializeArray(),
		newUrl = '//www.nintendo.com/search/#/results/' + formData[0].value + '/1';
		
	window.location = newUrl;
}