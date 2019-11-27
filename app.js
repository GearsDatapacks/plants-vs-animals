const path = document.getElementById('path');

function setPathWidth () {
  path.setAttribute('d', `M0, 250 q${window.innerWidth / 4}, 100 ${window.innerWidth / 2}, 0 q${window.innerWidth / 4}, -100 ${window.innerWidth / 2}, 0 l0, 50 q-${window.innerWidth / 4}, -100 -${window.innerWidth / 2}, 0 q-${window.innerWidth / 4}, 100 -${window.innerWidth / 2}, 0 z`);
}

setPathWidth();
