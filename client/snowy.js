document.addEventListener('DOMContentLoaded', function() {
    function createSnowEffect() {
        if (document.getElementById('content').style.display !== 'block') {
            return;
        }

        const snowContainer = document.createElement('div');
        snowContainer.id = 'snow-container';
        snowContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; overflow: hidden;';
        document.body.appendChild(snowContainer);

        const snowflakes = [];
        const maxSnowflakes = 80;

        function createSnowflake() {
            const snowflake = document.createElement('div');
            const size = Math.random() * 12 + 6;
            
            snowflake.style.cssText = `
                position: absolute;
                background: white;
                border-radius: 50%;
                opacity: 0.05;
                width: ${size}px;
                height: ${size}px;
                top: -20px;
                left: ${Math.random() * 100}%;
            `; //makeing the snow how it looks
            
            snowContainer.appendChild(snowflake);
            
            return {
                element: snowflake,
                x: Math.random() * window.innerWidth,
                y: -20,
                speed: Math.random() * 2 + 1,
                wind: Math.random() * 0.5 - 0.25,           //can see the one of thee code me added the
                sway: Math.random() * 0.5,                  //thing that makes the snow left and right
                swaySpeed: Math.random() * 0.02 + 0.01,     //like why not lellll
                swayOffset: Math.random() * Math.PI * 2,
                size: size
            };
        }

        for (let i = 0; i < maxSnowflakes; i++) {
            snowflakes.push(createSnowflake());
        }

        function animateSnow() {
            if (!document.getElementById('snow-container')) return;
            
            const currentTime = Date.now();
            
            snowflakes.forEach((flake) => {
                flake.y += flake.speed;
                
                const sway = Math.sin(currentTime * flake.swaySpeed + flake.swayOffset) * flake.sway;
                flake.x += flake.wind + sway;
                
                if (flake.x > window.innerWidth + 50) flake.x = -50;
                if (flake.x < -50) flake.x = window.innerWidth + 50;
                
                if (flake.y > window.innerHeight) {
                    flake.y = -30;
                    flake.x = Math.random() * window.innerWidth;
                }
                
                flake.element.style.transform = `translate(${flake.x}px, ${flake.y}px)`;
            });
            
            requestAnimationFrame(animateSnow);
        }

        window.addEventListener('resize', function() {
            if (!document.getElementById('snow-container')) return;
        });

        animateSnow();
    }

    function checkAndCreateSnow() {
        const contentElement = document.getElementById('content');
        if (contentElement && contentElement.style.display === 'block') {
            if (!document.getElementById('snow-container')) {
                createSnowEffect();
            }
        } else {
            const snowContainer = document.getElementById('snow-container');
            if (snowContainer) {
                snowContainer.remove();
            }
        }
    }

    setInterval(checkAndCreateSnow, 1000);
});