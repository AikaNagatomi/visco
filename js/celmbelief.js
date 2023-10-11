{
	window.addEventListener('DOMContentLoaded', function() {
		$('.js-viewmore-backnumber').click(function() {
			$('.hidden-backnumber').show('fast');
			$(this).hide('fast');
		})
	});
}
