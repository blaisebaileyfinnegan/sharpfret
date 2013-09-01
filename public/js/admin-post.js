$(function () {
    $('form').submit(function() {
        $.post('/admin/post',
            $('form').serialize(),
            function() {
                $('#mb').show().delay(5000).fadeOut();
                $('form').hide();
            });
        return false;
    });
});
