(function ( $ ) {
 	
 	var defaultTimeoutMin, defaultTimeoutMax, loop, cheatCode, allowTracking, adjustX, adjustY, maxRuns;
 	var imgs = [
 		{ img: '../img/cage.png', width: 256, height: 256 } 
 	];
 	var directions = [ 
 		{ attr: 'left', degrees: 90 },
 		{ attr: 'right', degrees: 270 },
 		{ attr: 'top', degrees: 180 },
        { attr: 'bottom', degrees: 0 },
 	];
    var body, tAdjustY, tAdjustX, runs = 0;

    $.fn.nickcage = function( options ) {
        
        //apply options
        defaultTimeoutMin = options.timeoutMin || 2000;
        defaultTimeoutMax = options.timeoutMax || 8000;
        loop = (!options.loop ? false : true);
        cheatCode = (!options.cheatCode ? false : true);
        allowTracking = (!options.tracking ? false : true);
        imgs = options.imgs || imgs;
        adjustY = options.adjustY || 0;
        adjustX = options.adjustX || 0; 
        maxRuns = options.maxRuns || 5;
]
        body = this;

        //cage me
        $.fn.nickcage.cageMe();

        return this;
    };

    $.fn.nickcage.cageMe = function() {
        
        tAdjustY = 0;
        tAdjustX = 0;

        //get randoms
        var cage = $.fn.nickcage.getRandom(imgs);
        var d = $.fn.nickcage.getRandom(directions);

        console.log('cage', cage);
        console.log('dir', d);

        console.log(loop);

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

        runs++;

    };

    $.fn.nickcage.trackEyes = function( $c, cage, d ) {
        //var objects = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
        var objects = new tracking.ObjectTracker(['eye']);
        objects.on('track', function(event) {
            if (event.data.length) {
                tAdjustY = adjustY + event.data[0].y;
            }
        });
        //small delay to make sure the image is ready
        setTimeout(function(){  tracking.track('#' + $c.attr('id'), objects); }, 1000);
    };    

    $.fn.nickcage.showCage = function( $c, cage, d ) {
    	
    	var params = {};
        var move = cage.height - tAdjustY;
        params[d.attr] = "+=" + move;

	    $c.animate(params, 5000, function() {
	    	console.log('finished');
            $.fn.nickcage.hideCage($c, cage, d, move);
		});
	};

    $.fn.nickcage.hideCage = function( $c, cage, d, m ) {
        setTimeout(function(){ 
            
            var params = {};
            params[d.attr] = "-=" + m;

            $c.animate(params, 5000, function() {
                
                if (loop && runs < maxRuns) {
                    $.fn.nickcage.cageMe();
                } else {
                    $c.remove();
                }

            });

        }, $.fn.nickcage.getRandomInt(2000, 6000));

    };

    $.fn.nickcage.positionImage = function( img, cage, d ) {
        var params = {
            'z-index': 9999,
            position: 'absolute',
            'transform': 'rotate(' + d.degrees + 'deg)',
            '-ms-transform': 'rotate(' + d.degrees + 'deg)',
            '-moz-transform': 'rotate(' + d.degrees + 'deg)',
            '-webkit-transform': 'rotate(' + d.degrees + 'deg)',
            '-o-transform': 'rotate(' + d.degrees + 'deg)'
        };
        params[d.attr] = -(cage.height);
        
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