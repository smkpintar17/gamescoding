// LOGIN SYSTEM
let currentUser=null;

function register(){
  const u=document.getElementById("username").value;
  const p=document.getElementById("password").value;

  localStorage.setItem("user_"+u, JSON.stringify({password:p, hp:100, exp:0}));

  alert("Register berhasil!");
  login();
}

function login(){
  const u=document.getElementById("username").value;
  const p=document.getElementById("password").value;

  const data=JSON.parse(localStorage.getItem("user_"+u));

  if(data && data.password===p){
    currentUser=u;
    startGame(data);
    localStorage.setItem("lastUser",u);
  } else {
    alert("Login gagal");
  }
}

// AUTO LOGIN
window.onload=()=>{
  const last=localStorage.getItem("lastUser");
  if(last){
    const data=JSON.parse(localStorage.getItem("user_"+last));
    currentUser=last;
    startGame(data);
  }
};

let player;
let currentArea="";

// START GAME
function startGame(data){
  document.getElementById("loginBox").style.display="none";
  document.getElementById("game").style.display="block";

  player=data;

  document.getElementById("playerName").innerText=currentUser;
  updateUI();
}

// MAP AREA
function goArea(area){
  currentArea=area;

  let storyText="";
  let options=[];

  if(area==="forest"){
    storyText="🌲 Kamu masuk hutan dan bertemu monster!";
    options=["Serang","Kabur"];
  }

  if(area==="cave"){
    storyText="🕳️ Kamu menemukan gua gelap...";
    options=["Masuk","Kabur"];
  }

  if(area==="castle"){
    storyText="🏰 Boss besar muncul!";
    options=["Lawan","Kabur"];
  }

  document.getElementById("story").innerText=storyText;

  const ans=document.getElementById("answers");
  ans.innerHTML="";

  options.forEach(opt=>{
    const b=document.createElement("button");
    b.innerText=opt;
    b.onclick=()=>action(opt);
    ans.appendChild(b);
  });
}

// ACTION
function action(choice){

  if(choice==="Serang" || choice==="Masuk" || choice==="Lawan"){
    fight();
  } else {
    document.getElementById("story").innerText="Kamu kabur...";
  }
}

// FIGHT
function fight(){
  let damage=Math.floor(Math.random()*20)+5;
  player.hp-=damage;

  let gain=Math.floor(Math.random()*50)+10;
  player.exp+=gain;

  if(player.hp<=0){
    alert("Game Over!");
    reset();
    return;
  }

  document.getElementById("story").innerText=
    "⚔️ Kamu bertarung! -" + damage + " HP, +" + gain + " EXP";

  saveGame();
  sendToGoogleSheets();
  updateUI();
}

// SAVE LOCAL
function saveGame(){
  localStorage.setItem("user_"+currentUser, JSON.stringify(player));
}

// UPDATE UI
function updateUI(){
  document.getElementById("hp").innerText=player.hp;
  document.getElementById("exp").innerText=player.exp;
}

// RESET
function reset(){
  localStorage.removeItem("lastUser");
  location.reload();
}

// GOOGLE SHEETS INTEGRATION
function sendToGoogleSheets(){
  fetch("https://script.google.com/macros/s/AKfycbwuMKR41aoE0rXf12rKD4jYxf9wVlHX9fyclAoXfsNfCclnvJUOxcq9RUyIuv3OMtMu6A/exec", {
    method:"POST",
    body: JSON.stringify({
      user: currentUser,
      hp: player.hp,
      exp: player.exp,
      area: currentArea
    })
  });
}
