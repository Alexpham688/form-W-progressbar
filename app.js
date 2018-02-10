$(document).ready(function(){

    //showing password
  $('#checkbox').on('click', function(){
    if($('.password').attr('type')==='password') {
      $('.password').attr('type','text');
    } else {
      $('.password').attr('type','password');
    }
  });


  var current, next, previous ,sect;
  var left, opacity, scale;
  var animating;

  $('.next').on('click', function(){
    if(animating) return false;
    animating = true;

    current = $(this).parent();
    next = $(this).parent().next();
     //activate next step on progress bar using the index of next
    $('#progress-bar li').eq($('fieldset').index(next)).addClass('active');

    //show the next fieldset
    next.show();
    //hide the current fieldset with style
    current.animate({opacity: 0}, {
    step: function(now) {
      //as the opacity of current reduces to 0 - stored in 'now'
      //1. scale current down to 80%
      scale = 1 - (1 - now) * 0.2;
      //2. bring next from the right(50%)
      left = (now * 50) + '%';
      //3. increase opacity of next to 1 as it moves in
      opacity = 1 - now;
      current.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute',
      });
      next.css({'left': left, 'opacity': opacity});
    },
     duration: 500,
     complete: function(){
       current.hide();
       animating = false
     },
     //this coms from the custom easing plugin
      ease: 'easeInOutBack'
    });
    //next class end
  });

  $('.previous').on('click', function(){
    if(animating) return false;
    animating = true;

    current = $(this).parent();
    previous = $(this).parent().prev();

    //de-activating current step on progress bar
    $('#progress-bar li').eq($('fieldset').index(current)).removeClass('active');
    //show the previous fieldset
    previous.show(500);
    //hide the current fieldset with style
    current.animate({opacity: 0}, {
      step: function(now) { /////maybe (now,mx)//////
        //1. scale the previous from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take the current fieldset to the right(50%) - 0%
        left = ((1 - now) * 50) + "%";
        //3. increase opacity of precious fieldset to 1 as it moves in
        opacity = 1 - now;
        current.css({
          'left': left
        });
        previous.css({
          'transform': 'scale('+scale+')',
           'opacity': opacity
      });
    },
    duration: 800,
    complete: function(){
      current.hide();
      animating = false;
    },
     easing: 'easeInOutBack'
   });
  });

  $('.submit').on('click', function(){
    return false;
  });
//end
});
