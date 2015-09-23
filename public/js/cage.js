(function ( $ ) {
 	
 	var defaultTimeoutMin, defaultTimeoutMax, loop, cheatCode, allowTracking, adjustX, adjustY;
 	var imgs = [
 		{ img: '../img/cage.png', width: 256, height: 256 } 
 	];
 	var directions = [ 
 		{ attr: 'left', degrees: 90 },
 		{ attr: 'right', degrees: 270 },
 		{ attr: 'top', degrees: 180 },
 	];
    var body, tAdjustY, tAdjustX;

    $.fn.nickcage = function( options ) {
        
        //apply options
        defaultTimeoutMin = options.timeoutMin || 2000;
        defaultTimeoutMax = options.timeoutMax || 8000;
        loop = options.loop || true;
        cheatCode = options.cheatCode || true;
        allowTracking = options.tracking || true;
        imgs = options.imgs || imgs;
        adjustY = options.adjustY || 0;
        adjustX = options.adjustX || 0; 

        body = this;

        //cage me
        $.fn.nickcage.cageMe();

        return this;
    };

    $.fn.nickcage.cageMe = function() {
        //get randoms
        var cage = $.fn.nickcage.getRandom(imgs);
        var d = $.fn.nickcage.getRandom(directions);

        console.log('cage', cage);
        console.log('dir', d);

        //build img
        var isNew = false;
        var img = $('#cage-dfsdfweroq')
        if (!img.length) { 
            isNew = true;
            img = $('<img />', {
                id: 'cage-dfsdfweroq',
                src: cage.img
            });
        } else {
            img.attr('src', cage.img);
        }

        console.log(img);

        $.fn.nickcage.positionImage(img, cage, d);

        //add to page and make sure we have a reference
        if (isNew) {
            body.append(img);
        }
        var $c = $('#cage-dfsdfweroq');

        //track image eyes and adjust
        $.fn.nickcage.trackEyes($c, cage, d);

        //set timeout
        $.fn.nickcage.startTimer($c, cage, d, $.fn.nickcage.getRandomInt(defaultTimeoutMin, defaultTimeoutMax));

        //listen for cheat code


    };

    $.fn.nickcage.trackEyes = function( $c, cage, d ) {
        tAdjustY = 0;
        //var objects = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
        var objects = new tracking.ObjectTracker(['eye']);
        objects.on('track', function(event) {
            if (event.data.length === 0) {
                // No objects were detected in this frame.
            } else {
                tAdjustY = adjustY += event.data[0].y;
            }
        });
        //small delay to make sure the image is ready
        setTimeout(function(){  tracking.track('#' + $c.attr('id'), objects); }, 1000);
    };    

    $.fn.nickcage.showCage = function( $c, cage, d ) {
    	
    	var params = {};
        console.log(tAdjustY);
        var move = cage.height - tAdjustY;

    	if (d.attr === 'top') {
    		params = { top: "+=" + move };
    	}
    	if (d.attr === 'right') {
    		params = { right: "+=" + move };
    	}
    	if (d.attr === 'left') {
    		params = { left: "+=" + move };
    	}

        console.log(params);

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
                
                if (loop) {
                    $.fn.nickcage.cageMe();
                }

            });

        }, $.fn.nickcage.getRandomInt(2000, 6000));

    };

    $.fn.nickcage.positionImage = function( img, cage, d ) {
        var top = (d.attr === 'top' ? -(cage.height) : 0);
        var right = (d.attr === 'right' ? -body[0].scrollWidth + (cage.height) : 0);
        var left = (d.attr === 'left' ? -(cage.height) : 0);
        var params = {
            'z-index': 9999,
            position: 'absolute',
            'transform': 'rotate(' + d.degrees + 'deg)',
            '-ms-transform': 'rotate(' + d.degrees + 'deg)',
            '-moz-transform': 'rotate(' + d.degrees + 'deg)',
            '-webkit-transform': 'rotate(' + d.degrees + 'deg)',
            '-o-transform': 'rotate(' + d.degrees + 'deg)'
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
        img.removeAttr('style');
        img.css(params);
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