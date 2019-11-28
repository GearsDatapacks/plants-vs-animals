const path = document.getElementById('path');
const style = document.querySelector('style');

function setPathWidth () {
  path.setAttribute('d', `M0, 250 q${window.innerWidth / 4}, 100 ${window.innerWidth / 2}, 0 q${window.innerWidth / 4}, -100 ${window.innerWidth / 2}, 0 l0, 50 q-${window.innerWidth / 4}, -100 -${window.innerWidth / 2}, 0 q-${window.innerWidth / 4}, 100 -${window.innerWidth / 2}, 0 z`);
}

function setAnimalAnimation () {
  style.textContent = `g#beemove {
        animation: 5s linear infinite forwards fly;
      }
      
      @keyframes fly {
        0% {
          transform: translate(-25px, 0);
        }
        
        12% {
          transform: translate(${window.innerWidth / 8}px, 50px);
        }
        
        87% {
          transform: translate(${window.innerWidth * 0.75}px, -50px);
        }
        
        100% {
          transform: translate(${window.innerWidth + 25}px, 0px);
        }
      }`;
}

setAnimalAnimation();
setPathWidth();
