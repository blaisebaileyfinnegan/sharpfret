function setupForm(destination) {
    $('form').submit(function() {
        $.post(destination,
            $('form').serialize(),
            function() {
                $('#mb').show().delay(5000).fadeOut();
                $('form').hide();
            });
        return false;
    });
}
