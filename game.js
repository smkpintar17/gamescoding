let player = {
  hp: 100,
  maxHp: 100,
  attack: 20
};

let enemy = null;

// START BATTLE
function startBattle(area){

  if(area==="forest"){
    enemy = { hp: 50, attack: 5, img:"https://i.imgur.com/7yUvePI.png" };
  }

  if(area==="cave"){
    enemy = { hp: 80, attack: 10, img:"https://i.imgur.com/3ZQ3Z8T.png" };
  }

  if(area==="castle"){
    enemy = { hp: 120, attack: 20, img:"https://i.imgur.com/q8ZQZ9L.png" };
  }

  document.getElementById("enemyImg").src = enemy.img;

  document.getElementById("story").innerText = "⚔️ Pertarungan dimulai!";

  updateUI();
}

// ATTACK
function attack(){
  if(!enemy) return;

  enemy.hp -= player.attack;

  if(enemy.hp <= 0){
    document.getElementById("story").innerText = "🎉 Musuh kalah!";
    enemy = null;
    return;
  }

  player.hp -= enemy.attack;

  if(player.hp <= 0){
    alert("💀 Game Over");
    location.reload();
  }

  updateUI();
}

// HEAL
function heal(){
  player.hp += 20;
  if(player.hp > player.maxHp) player.hp = player.maxHp;

  if(enemy){
    player.hp -= enemy.attack;
  }

  updateUI();
}

// RUN
function run(){
  enemy = null;
  document.getElementById("story").innerText = "🏃 Kamu kabur!";
  updateUI();
}

// UPDATE UI
function updateUI(){
  document.getElementById("hp").innerText = "HP: " + player.hp;

  if(enemy){
    document.getElementById("enemyHp").innerText = "HP: " + enemy.hp;
  } else {
    document.getElementById("enemyHp").innerText = "-";
  }
}
