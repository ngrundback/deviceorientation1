let eventIntervalMs = 100; // not used yet
let eventsCount = 0;

console.log('writing to console in main scope.');

if (window.DeviceOrientationEvent) {
    console.log("DeviceOrientation is supported");
}
else {
    console.log("DeviceOrientation NOT supported");
}

function buttonFuncion() {
    console.log('writing to console from buttonFunction.');
    document.getElementById("iosRequestStatus").innerHTML = "Test";
}

function requestIosPermission() {
    console.log('in requestIosPermission()');
    document.getElementById("iosRequestStatus").innerHTML = "Asking...";


    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', () => { });
                    document.getElementById("iosRequestStatus").innerHTML = "Granted";
                }
                {
                    document.getElementById("iosRequestStatus").innerHTML = "Denied";
                }
            })
            .catch(console.error);
    } else {
        console.log('Device probably Android or iOS 12 or earlier, does not understand DeviceOrientationEvent.requestPermission()')
    }
}

function startEvents() {
    console.log('Starting events');

    window.addEventListener("deviceorientation", function (event) {
        ++eventsCount;

        document.getElementById("alphaValue").innerHTML = event.alpha;
        document.getElementById("betaValue").innerHTML = event.beta;
        document.getElementById("gammaValue").innerHTML = event.gamma;

        document.getElementById("eventCounterValue").innerHTML = eventsCount;
    }
    )
}

function stopEvents() {
    console.log('Stopping events, NOT IMPLEMENTED');
}