speroteck.controller('ParallaxController', function() {
        //check media query
        var mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, ""),
        //define store some initial variables
            halfWindowH = jQuery(window).height()*0.5,
            halfWindowW = jQuery(window).width()*0.5,
        //define a max rotation value (X and Y axises)
            maxRotationY = 5,
            maxRotationX = 3,
            aspectRatio;

        //detect if hero <img> has been loaded and evaluate its aspect-ratio
        jQuery('.cd-floating-background').find('img').eq(0).load(function() {
            aspectRatio = jQuery(this).width()/jQuery(this).height();
            if( mediaQuery == 'web' && jQuery('html').hasClass('preserve-3d') ) initBackground();
        }).each(function() {
            //check if image was previously load - if yes, trigger load event
            if(this.complete) jQuery(this).load();
        });

        //detect mouse movement
        jQuery('.cd-background-wrapper').on('mousemove', function(event){
            if( mediaQuery == 'web' && jQuery('html').hasClass('preserve-3d') ) {
                window.requestAnimationFrame(function(){
                    moveBackground(event);
                });
            }
        });

        //on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
        jQuery(window).on('resize', function(){
            mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
            if( mediaQuery == 'web' && jQuery('html').hasClass('preserve-3d') ) {
                window.requestAnimationFrame(function(){
                    halfWindowH = jQuery(window).height()*0.5,
                        halfWindowW = jQuery(window).width()*0.5;
                    initBackground();
                });
            } else {
                jQuery('.cd-background-wrapper').attr('style', '');
                jQuery('.cd-floating-background').attr('style', '').removeClass('is-absolute');
            }
        });

        function initBackground() {
            var wrapperHeight = Math.ceil(halfWindowW*2/aspectRatio),
                proportions = ( maxRotationY > maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - maxRotationX*Math.PI/180)),
                newImageWidth = Math.ceil(halfWindowW*2*proportions),
                newImageHeight = Math.ceil(newImageWidth/aspectRatio),
                newLeft = halfWindowW - newImageWidth/2,
                newTop = (wrapperHeight - newImageHeight)/2;

            //set an height for the .cd-background-wrapper
            jQuery('.cd-background-wrapper').css({
                'height' : wrapperHeight,
            });
            //set dimentions and position of the .cd-background-wrapper
            jQuery('.cd-floating-background').addClass('is-absolute').css({
                'left' : newLeft,
                'top' : newTop,
                'width' : newImageWidth,
            });
        }

        function moveBackground(event) {
            var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
                rotateX = ((event.pageY-halfWindowH)/halfWindowH)*maxRotationX;

            if( rotateY > maxRotationY) rotateY = maxRotationY;
            if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
            if( rotateX > maxRotationX) rotateX = maxRotationX;
            if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

            jQuery('.cd-floating-background').css({
                '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
            });
        }

    (function getPerspective(){
        var element = document.createElement('p'),
            html = document.getElementsByTagName('html')[0],
            body = document.getElementsByTagName('body')[0],
            propertys = {
                'webkitTransformStyle':'-webkit-transform-style',
                'MozTransformStyle':'-moz-transform-style',
                'msTransformStyle':'-ms-transform-style',
                'transformStyle':'transform-style'
            };

        body.insertBefore(element, null);

        for (var i in propertys) {
            if (element.style[i] !== undefined) {
                element.style[i] = "preserve-3d";
            }
        }

        var st = window.getComputedStyle(element, null),
            transform = st.getPropertyValue("-webkit-transform-style") ||
                st.getPropertyValue("-moz-transform-style") ||
                st.getPropertyValue("-ms-transform-style") ||
                st.getPropertyValue("transform-style");

        if(transform!=='preserve-3d'){
            html.className += ' no-preserve-3d';
        } else {
            html.className += ' preserve-3d';
        }
        document.body.removeChild(element);

    })();
});