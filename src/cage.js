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
        var cage = $.fn.nickcage.getRandom(cageImgs);
        var d = $.fn.nickcage.getRandom(directions);

        console.log('cage', cage);
        console.log('dir', d);
        console.log('body', this);

        //build img
        var img = $('<img />', {
        	id: 'cage',
        	src: 'img/' + cage.img
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

        console.log(params);

        img.css(params);
        
        $.fn.nickcage.rotateImg(img, d.degrees);

        //add to page
        this.append(img);
        var $c = $('#cage');

        //set timeout
        $.fn.nickcage.startTimer($c, cage, d, $.fn.nickcage.getRandomInt(4000, 8000));

        //listen for cheat code

        return this;
    };

    $.fn.nickcage.showCage = function( $c, cage, d ) {
    	
    	var params = {};

    	if (d.attr === 'top') {
    		params = { top: "+=" + (cage.height * 2) };
    	}
    	if (d.attr === 'right') {
    		params = { right: "+=" + (cage.height * 2) };
    	}
    	if (d.attr === 'left') {
    		params = { left: "+=" + (cage.height * 2) };
    	}

	    $c.animate(params, 5000, function() {
	    	console.log('finished');
		});
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