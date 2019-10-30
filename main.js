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


        // feature detect
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
              .then(permissionState => {
                if (permissionState === 'granted') {
                  window.addEventListener('deviceorientation', () => {});
                }
              })
              .catch(console.error);
          } else {
            console.log('Device probably Android or iOS 12 or earlier, does not understand DeviceOrientationEvent.requestPermission()')
          }
}

function startEvents() {
    console.log('Starting events');

    window.addEventListener("deviceorientation", function(event) 
		{
        // console.log('Event' + event);
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