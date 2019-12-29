const path = document.getElementById('path');
const style = document.querySelector('style');
const healthBar = document.getElementById('healthBar');
const shadowHealth = document.getElementById('shadowHealth');
const bee = document.getElementById('beemove');
const sycamore = document.getElementById('sycamore');
const healthText = document.getElementById('health');
const sycamoreRange = document.getElementById('range');
let health = 100;
let beeStats;
let sycamoreStats;

fetch('plants.json', {
    headers: {
      'Accept': 'application/json'
    },
    method: 'GET',
  })
  .then(function (response) {
    return response.json();
  })
  .then(onSuccess)
  .catch(onError);

function onSuccess (plants) {
  sycamoreStats = plants.sycamore;
}

function onError (err) {
  console.error(err);
  throw err;
}

fetch('animals.json', {
    headers: {
      'Accept': 'application/json'
    },
    method: 'GET',
  })
  .then(function (response) {
    return response.json();
  })
  .then(onSuccess)
  .catch(onError);

function onSuccess (animals) {
  beeStats = animals.bee;
  sycamoreCheck();
  changeHealth(0);
  setHealth();
  setAnimalAnimation();
  setPathWidth();
}

function onError (err) {
  console.error(err);
  throw err;
}

function isTouching (elem1, elem2) {
  const bbox1 = elem1.getBoundingClientRect();
  const bbox2 = elem2.getBoundingClientRect();
  
  if (bbox2.left >= bbox1.left && bbox2.left <= bbox1.right && bbox2.bottom <= bbox1.bottom && bbox2.bottom >= bbox1.top) {
    return true;
  }
  
  else if (bbox2.right >= bbox1.left && bbox2.right <= bbox1.right && bbox2.top <= bbox1.bottom && bbox2.top >= bbox1.top) {
    return true;
  }
  
  else if (bbox1.left <= bbox2.left && bbox1.left >= bbox2.right && bbox1.bottom >= bbox2.bottom && bbox1.bottom <= bbox2.top) {
    return true;
  }
  
  else if (bbox1.right >= bbox2.left && bbox1.right <= bbox2.right && bbox1.top <= bbox2.bottom && bbox1.top >= bbox2.top) {
    return true;
  }
  
  else {
    return false;
  }
}

function sycamoreCheck () {
  if (isTouching(sycamoreRange, bee)) {
    sycamore.setAttribute('data-moving', 'true');
  }
  
  else {
    sycamore.setAttribute('data-moving', 'false');
  }
  
  setTimeout(sycamoreCheck, 5);
}

function setPathWidth () {
  path.setAttribute('d', `M0, 250 q${window.innerWidth / 4}, 100 ${window.innerWidth / 2}, 0 q${window.innerWidth / 4}, -100 ${window.innerWidth / 2}, 0 l0, 50 q-${window.innerWidth / 4}, -100 -${window.innerWidth / 2}, 0 q-${window.innerWidth / 4}, 100 -${window.innerWidth / 2}, 0 z`);
}

function setAnimalAnimation () {
  style.textContent = `g#beemove {
        animation: ${window.innerWidth / 100}s linear infinite forwards fly;
      }
      
      @keyframes fly {
        0% {
          transform: translate(-25px, 0);
        }
        
        12% {
          transform: translate(${window.innerWidth / 8}px, 50px);
        }
    
        80% {
          transform: translate(${window.innerWidth * 0.75}px, -50px);
        }
        
        100% {
          transform: translate(${window.innerWidth + 25}px, 0px);
        }
      }`;
}

function setHealth () {
  healthText.setAttribute('x', `${window.innerWidth / 4 + 5}`);
  healthBar.setAttribute('x', `${window.innerWidth / 4}`);
  healthBar.setAttribute('width', `${window.innerWidth / 2}`);
  shadowHealth.setAttribute('x', `${window.innerWidth / 4 - 2}`);
  shadowHealth.setAttribute('width', `${window.innerWidth / 2 + 4}`);
}

function changeHealth (num) {
  health += num;
  healthText.textContent = health;
  healthBar.setAttribute('width', `${window.innerWidth / 200 * health}`);
}

bee.addEventListener('animationiteration', () => {changeHealth(Number(`-${beeStats.damage}`));});
