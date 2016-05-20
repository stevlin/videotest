
var app = {
   accely:0,
   accelx:0,
   accelz:0,
   src:"http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
   src2:"http://techslides.com/demos/sample-videos/small.mp4",
   sensitivity:20,
   video:0,

   
   
    initialize: function() {
        document.addEventListener("deviceready", app.onDeviceReady, false);
    },

    onDeviceReady: function() {
     // alert("Device is Ready");
        app.video = document.getElementById("video1");
       navigator.notification.vibrate(2500);

   },

    playVideo: function() {
        app.startWatch();

        if (app.video.paused) {
            app.video.play(); 
        }
        else {
            app.video.pause(); 
        }
    },
    pauseVideo: function() {
              navigator.notification.vibrate(2500);

        if (app.video.paused) {
            app.video.play(); 
        }
        else {
            app.video.pause(); 
        }
    },

  
    getCamera: function() {
        var captureSuccess = function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            // do something interesting with the file
            document.getElementById('image').src = path;

        }
        };
        // capture error callback
        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };
        // start image capture
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
        
    },

    onAccelSuccess: function(acceleration) {
        if(Math.abs(acceleration.y - app.accely) > app.sensitivity ||
           Math.abs(acceleration.x - app.accelx) > app.sensitivity ||
           Math.abs(acceleration.z - app.accelz) > app.sensitivity) {
       if(app.src == app.video.src) {
          app.video.src = app.src2;
       }
       else {
          app.video.src = app.src;
       }
          app.video.load();
          app.video.play(); 


        }
        app.accely = acceleration.y;
        app.accelx = acceleration.x;
        app.accelz = acceleration.z;


    },


    onError: function() {
        alert('onError!');
    },

    startWatch: function() {
        // Check acceleration every half second.
        var options = { frequency: 500 };

        watchID = navigator.accelerometer.watchAcceleration(this.onAccelSuccess, this.onError, options);
    },

    stopWatch: function() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }
    
    
};
