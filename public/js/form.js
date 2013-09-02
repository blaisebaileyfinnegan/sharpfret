function setupForm(destination) {
    $('#submit').click(function() {
        $.post(destination,
            $('form').serialize(),
            function() {
                $('#mb').show().delay(5000).fadeOut();
                $('form').hide();
            });
        return false;
    });
}
