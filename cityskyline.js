el = document.querySelector('#the-sun');
pet = document.querySelector('#main-pet');
clouds = document.querySelector('#clouds');
windows = document.querySelectorAll(".window");
bats = document.querySelectorAll("#some-pet");
petMessage = document.querySelectorAll("#pet-message");

let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;

var isNight = false;

var finished = false;

let petMessage01 = `<p>Welcome to CissyTales, my name is Lilleep. <br /> Drag the sun to the lower part of the screen and make it
nighttime in CissyTales. <br /> Don't bring it near me, it is too hot! </p>`;
let petMessage02 = `<p><b>Mean!</b> You better bring me some water! </p>`;
let petMessage03 = `<p>These lights are so blinding...<br />Help me by hovering through the windows to turn them off<br /> and bring my friends back. </p>`;
let petMessage04 = `<p>Well done, human. Thank you!</p>`;

// when the user clicks down on the element
el.addEventListener('mousedown', function(e){
    e.preventDefault();
    
    // get the starting position of the cursor
    startPosX = e.clientX;
    startPosY = e.clientY;
    
    document.addEventListener('mousemove', mouseMove);
    
    document.addEventListener('mouseup', function(){
        document.removeEventListener('mousemove', mouseMove);
    });
    
});


windows.forEach((window) => {
    window.addEventListener('mouseover', function(e){
        e.preventDefault();
        
        if(!isNight) return;

        e.currentTarget.classList.remove("lights-on");

        if(shouldShowBats()) {
            showBats(); 
        }
        
    });
});


function shouldShowBats(){
    var lightsOn = [...windows].find((window) => {
        return window.classList.contains("lights-on")
    });

    return lightsOn == undefined;
}


function setupNight(){
    document.documentElement.style.setProperty('--building-color1', '#000');
    document.documentElement.style.setProperty('--building-color2', '#000');
    document.documentElement.style.setProperty('--building-color3', '#000');
    document.documentElement.style.setProperty('--building-color4', '#000');
    document.documentElement.style.setProperty('--window-color1', '#777');
    document.documentElement.style.setProperty('--window-color2', '#777');
    document.documentElement.style.setProperty('--window-color3', '#777');
    document.documentElement.style.setProperty('--window-color4', '#777');
    isNight = true;

    windows.forEach((window) => {
        window.classList.add("lights-on");
    });
}

function setupDay(){
    document.documentElement.style.setProperty('--building-color1', '#ac9fc7');
    document.documentElement.style.setProperty('--building-color2', '#6e6691');
    document.documentElement.style.setProperty('--building-color3', '#c798af');
    document.documentElement.style.setProperty('--building-color4', '#728191');
    document.documentElement.style.setProperty('--window-color1', '#d1c1f1');
    document.documentElement.style.setProperty('--window-color2', '#9891b6');
    document.documentElement.style.setProperty('--window-color3', '#e4c7d6');
    document.documentElement.style.setProperty('--window-color4', '#b7c4d1');
    isNight = false;

    windows.forEach((window) => {
        window.classList.remove("lights-on");
    });

    bats.forEach((window) => {
        window.classList.add("invisible");
    });
}

function changeBirdToBat(){
    pet.classList.remove("pet");
    pet.classList.add("night-pet");
    petMessage[0].innerHTML = petMessage03;
}

function changeSunToMoon(){
    el.classList.remove("sun");
    el.classList.add("moon");
}

function changeSunnySkyToNight(){
    clouds.classList.remove("clouds-day");
    clouds.classList.add("clouds-night");
}

function changeBatToBird(){
    pet.classList.add("pet");
    pet.classList.remove("night-pet");
}

function changeMoonToSun(){
    el.classList.add("sun");
    el.classList.remove("moon");
}

function changeNightSkyToSunny(){
    clouds.classList.add("clouds-day");
    clouds.classList.remove("clouds-night");
}

function changeColdPetToWorm(){
    pet.classList.remove("pet");
    pet.classList.add("pet-right");
    petMessage[0].innerHTML = petMessage02;
}

function changeWormPetToCold(){
    pet.classList.add("pet");
    pet.classList.remove("pet-right");
    petMessage[0].innerHTML = petMessage01;
}

function showBats(){
    bats.forEach((window) => {
        window.classList.remove("invisible");
    });
    petMessage[0].innerHTML = petMessage04;
    finished = true;
}

function reset(){
    finished = false;
}

function mouseMove(e) {
    // calculate the new position
    newPosX = startPosX - e.clientX;
    newPosY = startPosY - e.clientY;

    // with each move we also want to update the start X and Y
    startPosX = e.clientX;
    startPosY = e.clientY;

    // set the element's new position:
    el.style.top = (el.offsetTop - newPosY) + "px";
    el.style.left = (el.offsetLeft - newPosX) + "px";

    if((el.offsetTop - newPosY) > 620) {
        if (finished) return;
        changeBirdToBat();
        changeSunToMoon();
        changeSunnySkyToNight();
        setupNight();
    } else {
        changeBatToBird();
        changeMoonToSun();
        changeNightSkyToSunny();
        setupDay();
        reset();
    }

    if (isNight) return;

    if((el.offsetLeft - newPosX) > 1300) {
        changeColdPetToWorm();
    } else {
        changeWormPetToCold();
    }
}