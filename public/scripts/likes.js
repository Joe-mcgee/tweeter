$(document).ready(function() {
  console.log($('.like'));
  $(document).on('click', '.like', function() {
    $(this).toggleClass('liked');

    if ($(this).hasClass('liked')) {
      $(this).css({ 'background-color': 'red' });
    } else {
      $(this).css({ 'background-color': 'transparent' });
    }
    let form = ('<form>')
    let input = $('<input name="i" value="1">')
    $(form).append(input)
    let div = $('<div/>')
    $(div).append(form)
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(div).serialize()
    })



  });
  console.log('after')



});


