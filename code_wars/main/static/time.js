let time = document.getElementById('time');

function update_time(){
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add a zero in front of numbers<10
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);

    time.textContent = hours + ":" + minutes + ":" + seconds;

    // Call the function every second to update the time
    setTimeout(update_time, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// Call the function initially to start the time update
update_time();