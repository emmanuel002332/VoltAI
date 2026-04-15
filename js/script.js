const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '🌙';
    } else {
        html.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '☀️';
    }
});

const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < 100; i++) {
    stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 1.5, speed: Math.random() * 0.3 + 0.1, opacity: Math.random() });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // This line picks the text color (Black in Light, White in Dark)
    const color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
    ctx.fillStyle = color;

    stars.forEach(s => {
        // We set opacity to 0.2 so they are subtle dots, not distracting blobs
        ctx.globalAlpha = 0.2; 
        ctx.beginPath(); 
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); 
        ctx.fill();
        s.y -= s.speed;
        if (s.y < 0) s.y = canvas.height;
    });
    requestAnimationFrame(animate);
}
animate();

const solveBtn = document.getElementById('solve-btn');
const aiStatus = document.getElementById('ai-status');
const aiResponse = document.getElementById('ai-response');
const mathOutput = document.getElementById('math-output');

solveBtn.addEventListener('click', () => {
    solveBtn.innerText = "Analyzing...";
    aiStatus.innerText = "Processing Physics Data...";
    aiResponse.classList.add('hidden');
    setTimeout(() => {
        katex.render("\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots", mathOutput, { displayMode: true });
        aiStatus.innerText = "Solution Found:";
        aiResponse.classList.remove('hidden');
        solveBtn.innerText = "Generate Derivation";
    }, 1500);
});
