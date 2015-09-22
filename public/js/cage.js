(function ( $ ) {
 	
 	var defaultTimeoutMin = 4000;
 	var defaultTimeoutMax = 8000;
 	var cageImgs = [
 		{ img: 'cage.png', width: 256, height: 256 } 
 	];
 	var directions = [ 
 		{ attr: 'left', degrees: 90 },
 		{ attr: 'right', degrees: 270 },
 		{ attr: 'top', degrees: 180 },
 	 ];
     var adjust = 0;

    $.fn.nickcage = function( options ) {
        
        //apply options
        var cage = $.fn.nickcage.getRandom(cageImgs);
        var d = $.fn.nickcage.getRandom(directions);

        console.log('cage', cage);
        console.log('dir', d);
        console.log('body', this);

        //build img
        var img = $('<img />', {
        	id: 'cage',
        	src: '../img/' + cage.img
        });
        
        //position image
        var top = (d.attr === 'top' ? -(cage.height) : 0);
        var right = (d.attr === 'right' ? -this[0].scrollWidth + (cage.height) : 0);
        var left = (d.attr === 'left' ? -(cage.height) : 0);
        var params = {
        	'z-index': 9999,
        	position: 'absolute'
        };
        if (d.attr === 'top') {
    		params.top = top;
    	}
    	if (d.attr === 'right') {
    		params.right = right;
    	}
    	if (d.attr === 'left') {
    		params.left = left;
    	}
        img.css(params);
        
        $.fn.nickcage.rotateImg(img, d.degrees);

        //add to page
        this.append(img);
        var $c = $('#cage');

        //track image eyes and adjust
        $.fn.nickcage.trackEyes($c, cage, d);

        //set timeout
        $.fn.nickcage.startTimer($c, cage, d, $.fn.nickcage.getRandomInt(4000, 8000));

        //listen for cheat code

        return this;
    };

    $.fn.nickcage.trackEyes = function( $c, cage, d ) {
        var self = this;
        //var objects = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
        var objects = new tracking.ObjectTracker(['eye']);
        objects.on('track', function(event) {
            if (event.data.length === 0) {
                // No objects were detected in this frame.

            } else {

                console.log(event.data);

                self.adjust = event.data[0].y;

                console.log(self.adjust);

            }
        });
        //small delay to make sure the image is ready
        setTimeout(function(){  tracking.track('#' + $c.attr('id'), objects); }, 1000);
    };    

    $.fn.nickcage.showCage = function( $c, cage, d ) {
    	
    	var params = {};
        var move = cage.height - this.adjust;

    	if (d.attr === 'top') {
    		params = { top: "+=" + move };
    	}
    	if (d.attr === 'right') {
    		params = { right: "+=" + move };
    	}
    	if (d.attr === 'left') {
    		params = { left: "+=" + move };
    	}

	    $c.animate(params, 5000, function() {
	    	console.log('finished');
            $.fn.nickcage.hideCage($c, cage, d, move);
		});
	};

    $.fn.nickcage.hideCage = function( $c, cage, d, m ) {
        setTimeout(function(){ 
            
            if (d.attr === 'top') {
                params = { top: "-=" + m };
            }
            if (d.attr === 'right') {
                params = { right: "-=" + m };
            }
            if (d.attr === 'left') {
                params = { left: "-=" + m };
            }

            $c.animate(params, 5000, function() {
                console.log('all done');
            });

        }, $.fn.nickcage.getRandomInt(2000, 6000));

    };

	$.fn.nickcage.rotateImg = function( $c, degrees ) {
		$c.css({
			'transform': 'rotate(' + degrees + 'deg)',
		  	'-ms-transform': 'rotate(' + degrees + 'deg)',
		  	'-moz-transform': 'rotate(' + degrees + 'deg)',
		  	'-webkit-transform': 'rotate(' + degrees + 'deg)',
		  	'-o-transform': 'rotate(' + degrees + 'deg)'
		});
	};

	$.fn.nickcage.startTimer = function( $c, cage, d, t) {
		setTimeout(function(){  $.fn.nickcage.showCage($c, cage, d); }, t);
	};

    $.fn.nickcage.getRandom = function( ary ) {
	    return ary[Math.floor(Math.random()*ary.length)];
	};

	$.fn.nickcage.getRandomInt = function( min, max ) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	};
 
}( jQuery ));