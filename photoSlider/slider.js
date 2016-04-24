
$('.slider').each(function(){


    var $this = $(this);
    var $group = $this.find('.slide-group');
    var $slides = $this.find('.slide');
    var buttonArray = [];
    var currentIndex = 0;
    var timeout;



    /**move - moves slides
     *
     * @param newIndex
     */
    function move(newIndex) {
        var animateLeft, slideLeft;

        advance();

        // if current slide is showing or a slide is animating, do nothing
        if($group.is(':animated') || currentIndex === newIndex) {
            return;
        }

        buttonArray[currentIndex].removeClass('active');
        buttonArray[newIndex].addClass('active');

        if(newIndex > currentIndex) {
            slideLeft = '100%';
            animateLeft = '-100%';
        }
        else {
            slideLeft = '-100%';
            animateLeft = '100%';
        }

        // position new slide to left (if less) or right (if more) of current
        $slides.eq(newIndex).css({left: slideLeft, display: 'block'});
        $group.animate({left: animateLeft}, function(){
            $slides.eq(currentIndex).css({display: 'none'});
            $slides.eq(newIndex).css({left: 0});
            $group.css({left: 0});
            currentIndex = newIndex;
        });
    }



    function advance() {
        clearTimeout(timeout);
        // start timer to run anonymous function evey 4 seconds
        timeout = setTimeout(function(){
            if(currentIndex < ($slides.length - 1)) {
                move(currentIndex + 1);
            }
            else {
                move(0);
            }
        }, 4000);
    }


    $.each($slides, function(index){
        // create button element
        var $button = $('<button type="button" class="slide-btn">&bull;</button>');

        if(index === currentIndex) {
            $button.addClass('active');
        }

        $button.on('click', function() {
            move(index);
        }).appendTo('.slide-buttons');
        buttonArray.push($button);
    });

    advance();
    
});