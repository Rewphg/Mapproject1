var Markers = {
    fn: {
        addMarkers: function() {
            var target = $('#image-wrapper');
            var data = target.attr('data-captions');
            var captions = $.parseJSON(data);
            var coords = captions.coords;

            for (var i = 0; i < coords.length; i++) {
                var obj = coords[i];
                var top = obj.top;
                var left = obj.left;
                var text = obj.text;

                $('<span class="marker"/>').css({
                    top: top,
                    left: left
                }).html('<span class="caption">' + text + '</span>').
                appendTo(target);

            }
        },
        showCaptions: function() {
            $('span.marker').live('click', function() {
                var $marker = $(this),
                    $caption = $('span.caption', $marker);
                if ($caption.is(':hidden')) {
                    $caption.slideDown(300);

                } else {
                    $caption.slideUp(300);

                }

            });

        }
    },

    init: function() {
        this.fn.addMarkers();
        this.fn.showCaptions();

    }
};

$(function() {
    Markers.init();

});