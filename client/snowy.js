// snow.js (optimized)

// Create container
const snowContainer = document.createElement('div');
Object.assign(snowContainer.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '9999',
    overflow: 'hidden'
});
document.body.appendChild(snowContainer);

// Add CSS animation once
const style = document.createElement('style');
style.innerHTML = `
@keyframes fall {
    to {
        transform: translateY(110vh);
    }
}
`;
document.head.appendChild(style);

function createSnowflake() {
    const snowflake = document.createElement('div');

    const size = Math.random() * 6 + 4; // smaller = faster
    const duration = Math.random() * 5 + 5; // slower animation = fewer updates
    const drift = Math.random() * 40 - 20; // side movement

    Object.assign(snowflake.style, {
        position: 'absolute',
        top: '-10px',
        left: Math.random() * window.innerWidth + 'px',
        width: size + 'px',
        height: size + 'px',
        backgroundColor: 'white',
        borderRadius: '50%',
        opacity: Math.random() * 0.7 + 0.3,
        transform: `translateX(${drift}px)`,
        animation: `fall ${duration}s linear`,
        willChange: 'transform'
    });

    snowContainer.appendChild(snowflake);

    // Remove after animation finishes
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

// Lower spawn rate = better performance
setInterval(createSnowflake, 250);
