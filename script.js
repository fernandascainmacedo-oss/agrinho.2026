let drone;
let sementes = [];
let lixos = [];
let pontuacao = 0;
let energia = 100;
let estado = "jogando";

function setup() {
  createCanvas(900, 600);

  drone = {
    x: width / 2,
    y: height / 2,
    tamanho: 40
  };

  for (let i = 0; i < 12; i++) {
    sementes.push({
      x: random(width),
      y: random(height),
      plantada: false
    });
  }

  for (let i = 0; i < 6; i++) {
    lixos.push({
      x: random(width),
      y: random(height),
      vx: random(-2, 2),
      vy: random(-2, 2)
    });
  }
}

function draw() {
  background(180, 220, 120);

  desenharCampo();

  if (estado === "jogando") {

    moverDrone();
    desenharDrone();

    fill(0);
    textSize(24);
    text("🌱 Árvores: " + pontuacao, 20, 35);
    text("🔋 Energia: " + energia, 20, 70);

    // Áreas para reflorestar
    for (let s of sementes) {

      if (!s.plantada) {
        fill(180, 120, 60);
        ellipse(s.x, s.y, 40);

        if (dist(drone.x, drone.y, s.x, s.y) < 30) {
          s.plantada = true;
          pontuacao++;
        }
      } else {
        fill(40, 150, 40);
        rect(s.x - 5, s.y - 20, 10, 20);
        circle(s.x, s.y - 25, 25);
      }
    }

    // Poluição
    for (let l of lixos) {
      l.x += l.vx;
      l.y += l.vy;

      if (l.x < 0 || l.x > width) l.vx *= -1;
      if (l.y < 0 || l.y > height) l.vy *= -1;

      fill(100);
      rect(l.x, l.y, 25, 25);

      if (dist(drone.x, drone.y, l.x, l.y) < 25) {
        energia -= 1;
      }
    }

    if (pontuacao >= sementes.length) {
      estado = "vitoria";
    }

    if (energia <= 0) {
      estado = "derrota";
    }
  }

  if (estado === "vitoria") {
    telaVitoria();
  }

  if (estado === "derrota") {
    telaDerrota();
  }
}

function moverDrone() {
  if (keyIsDown(LEFT_ARROW)) drone.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) drone.x += 5;
  if (keyIsDown(UP_ARROW)) drone.y -= 5;
  if (keyIsDown(DOWN_ARROW)) drone.y += 5;

  drone.x = constrain(drone.x, 0, width);
  drone.y = constrain(drone.y, 0, height);
}

function desenharDrone() {
  fill(50);

  rectMode(CENTER);
  rect(drone.x, drone.y, 35, 20);

  line(drone.x - 25, drone.y - 15, drone.x + 25, drone.y - 15);
  line(drone.x - 25, drone.y + 15, drone.x + 25, drone.y + 15);

  circle(drone.x - 25, drone.y - 15, 12);
  circle(drone.x + 25, drone.y - 15, 12);
  circle(drone.x - 25, drone.y + 15, 12);
  circle(drone.x + 25, drone.y + 15, 12);
}

function desenharCampo() {

  fill(80, 180, 80);
  rect(0, 0, width, height);

  for (let i = 0; i < width; i += 100) {
    stroke(120, 90, 50);
    line(i, 0, i, height);
  }

  noStroke();
}

function telaVitoria() {
  background(50, 180, 80);

  fill(255);
  textAlign(CENTER);
  textSize(42);
  text("🌳 FUTURO SUSTENTÁVEL!", width / 2, 250);

  textSize(24);
  text("Todas as áreas foram reflorestadas!", width / 2, 310);

  text("Clique para reiniciar", width / 2, 370);
}

function telaDerrota() {
  background(180, 50, 50);

  fill(255);
  textAlign(CENTER);
  textSize(42);
  text("⚠️ Energia Esgotada", width / 2, 250);

  textSize(24);
  text("O drone não conseguiu concluir a missão.", width / 2, 310);

  text("Clique para tentar novamente", width / 2, 370);
}

function mousePressed() {
  if (estado !== "jogando") {
    pontuacao = 0;
    energia = 100;
    estado = "jogando";

    sementes = [];
    for (let i = 0; i < 12; i++) {
      sementes.push({
        x: random(width),
        y: random(height),
        plantada: false
      });
    }
  }
}
