'use strict';


var WIN = global,
    DOC = WIN.document,
    main = WIN.libdom,
    subject = DOC.getElementById('buang1'),
    animating = false;
    
main.eachDisplacement(
    function (o) {
        main.offset(subject, o.x, o.y);
    },
    { x: [10, 1000], y: [50, 300] },
    'easeOut');


main.on(DOC, 'click',
    function (event) {
        var screen, current;
        
        if (animating) {
            return;
        }
        
        animating = true;
        
        screen = main.screen();
        current = main.offset(subject);
        
        main.eachDisplacement(
            function (o, last) {
                main.offset(subject, o.x, o.y);
                if (last) {
                    animating = false;
                }
            },
            {
                x: [current[0],
                    screen[0] + event.clientX],
                y: [current[1],
                    screen[1] + event.clientY]
            },
            'easeOut');

    });