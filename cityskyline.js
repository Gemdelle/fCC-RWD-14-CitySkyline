el = document.querySelector('.sky');
pet = document.querySelector('#some-pet');
let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;

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

    console.log("ESTE ES EL LEFT BRO: "+el.style.left)

    if((el.offsetTop - newPosY) > 620) {
        pet.classList.remove("pet");
         pet.classList.add("night-pet");
    } else {
        pet.classList.add("pet");
         pet.classList.remove("night-pet");
    }


    if((el.offsetLeft - newPosX) > 1300) {
        pet.classList.remove("pet");
         pet.classList.add("pet-right");
    } else {
        pet.classList.add("pet");
         pet.classList.remove("pet-right");
    }
    //620px
    /*
    1300
    clouds
    pet
    sky
    */
}