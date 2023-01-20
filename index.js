(function () {
    const canvas = document.createElement('canvas');

    context = canvas.getContext('2d');

    width = canvas.width = innerWidth;
    height = canvas.height = innerHeight;
    particles = [];
    properties = {
        bckgroundColor: 'rgba(17, 17, 19, 1',//колір фону
        particleColor: 'rgb(255, 40, 40, 1)',//колір частинок
        particleRadius: 3,// радіус частинок
        particleCount: 60,//кількість частинок
        particleMaxVelocity: 0.5,//швидкість руху частинок
        lineLength: 150,//довжина ліній
        particleLife: 6,// швидкість заміни частинок
    };

    document.querySelector('body').appendChild(canvas);//

    window.onresize = function () {
        width = canvas.width = innerWidth;
        height = canvas.height = innerHeight;
    };

    class Particle {
        constructor() {
            //в конструкторі визначаємо колір часток, їх швидкість, положення, радіус та ін.
            this.x = Math.random() * width; //полоденні по х
            this.y = Math.random() * height; //положення по y
            this.velocityX =
                Math.random() * (properties.particleMaxVelocity * 2) -
                properties.particleMaxVelocity;
            this.velocityY =
                Math.random() * (properties.particleMaxVelocity * 2) -
                properties.particleMaxVelocity;
            this.life = Math.random() * properties.particleLife * 60;
        }
        position() {
            (this.x + this.velocityX > width && this.velocityX > 0) ||
            (this.x + this.velocityX < 0 && this.velocityX < 0)
                ? (this.velocityX *= -1)
                : this.velocityX;
            (this.y + this.velocityY > height && this.velocityY > 0) ||
            (this.y + this.velocityY < 0 && this.velocityY < 0)
                ? (this.velocityY *= -1)
                : this.velocityY;

            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reDraw() {

            context.beginPath();
            context.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
            context.closePath();
            context.fillStyle = properties.particleColor;
            context.fill();
        }

        reCalculateLife() {
            if (this.life < 1) {
                this.x = Math.random() * width; //полоденні по х
                this.y = Math.random() * height; //положення по y
                this.velocityX =
                    Math.random() * (properties.particleMaxVelocity * 2) -
                    properties.particleMaxVelocity;
                this.velocityY =
                    Math.random() * (properties.particleMaxVelocity * 2) -
                    properties.particleMaxVelocity;
                this.life = Math.random() * properties.particleLife * 60;
            }
            this.life--;
        }
    }

    function reDrawBackground() {
        context.fillStyle = properties.bckgroundColor;
        context.fillRect(0, 0, width, height);
    }
    function drawLines() {
        let x1, y1, x2, y2, length, opacity;
        for (let i in particles) {
            for (let j in particles) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if (length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength;
                    context.lineWidth = '0.5';
                    context.strokeStyle = 'rgba(255, 40, 40, ' + opacity + ')';
                    context.beginPath();
                    context.moveTo(x1, y1);
                    context.lineTo(x2, y2);
                    context.closePath();
                    context.stroke();
                }
            }
        }
    }
    function reDrawParticles() {
        for (let i in particles) {
            particles[i].reCalculateLife();
            particles[i].position();
            particles[i].reDraw();
        }
    }

    function loop() {
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init() {
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle());
        }
        loop();
    }

    init();
})();
