(function ( $ ) {
 	
 	var defaultTimeoutMin = 4000;
 	var defaultTimeoutMax = 8000;
 	var cageImgs = [
 		{ img: 'cat.png', width: 500, height: 333 } 
 	];
 	var directions = [ 
 		{ attr: 'left', degrees: 90 },
 		{ attr: 'right', degrees: 270 },
 		{ attr: 'top', degrees: 180 },
 	 ];

    $.fn.nickcage = function( options ) {
        
        //apply options

        console.log('running');

        var cage = $.fn.nickcage.getRandom(cageImgs);
        var direction = $.fn.nickcage.getRandom(directions);

        console.log('cage', cage);
        console.log('dir', direction);
        console.log('body', this);

        //build img
        var img = $('<img />', {
        	id: 'cage',
        	src: 'img/' + cage.img
        });

        //position image
        var top = (direction.attr === 'top' ? -(cage.height) : 0);
        var right = (direction.attr === 'right' ? this[0].scrollWidth + (cage.height) : 0);
        var left = (direction.attr === 'left' ? -(cage.height) : 0);
        img.css({
        	'z-index': 9999,
        	position: 'absolute'
        });
        if (d.attr === 'top') {
    		params = { top: "+=" + (cage.height * 2) };
    	}
    	if (d.attr === 'right') {
    		params = { right: "-=" + (cage.height * 2) };
    	}
    	if (d.attr === 'left') {
    		params = { left: "+=" + (cage.width * 2) };
    	}
        
        $.fn.nickcage.rotateImg(img, direction.degrees);

        //add to page
        this.append(img);
        var $c = $('#cage');

        //set timeout
        $.fn.nickcage.startTimer($c, cage, direction, $.fn.nickcage.getRandomInt(4000, 8000));

        //listen for cheat code

        return this;
    };

    $.fn.nickcage.showCage = function( $c, cage, d ) {
    	
    	var params = {};

    	if (d.attr === 'top') {
    		params = { top: "+=" + (cage.height * 2) };
    	}
    	if (d.attr === 'right') {
    		params = { right: "-=" + (cage.height * 2) };
    	}
    	if (d.attr === 'left') {
    		params = { left: "+=" + (cage.width * 2) };
    	}

	    $c.animate(params, 5000, function() {
	    	console.log('finished');
		});
	};

	$.fn.nickcage.rotateImg = function( $c, degrees ) {
		/*
		.rotated {
		  transform: rotate(90deg);
		  -ms-transform: rotate(90deg);
		  -moz-transform: rotate(90deg);
		  -webkit-transform: rotate(90deg);
		  -o-transform: rotate(90deg);
		}
		*/
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