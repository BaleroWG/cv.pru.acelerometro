/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var watchID = null; 
var radius = 50;


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    

    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        app.receivedEvent('deviceready');
        startWatch();     
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        //maf var listeningElement = parentElement.querySelector('.listening');
        //maf var receivedElement = parentElement.querySelector('.received');

        //maf listeningElement.setAttribute('style', 'display:none;');
        //maf receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    
};

app.initialize();


function startWatch(){
    var options = { frequency:100};
    watchID = navigator.accelerometer.watchAcceleration(
        onSuccess, onError, options);
}

function onSuccess(acceleration) {
    //posición inicial XY
    var x = 0;
    var y = 0;
    
    //Velocidad
    var vx = 0;
    var vy = 0;
    
    var vMultiplier = 100; 
    
    var dot = document.getElementById('dot');
    var accElement = document.getElementById('accelerometerData');
    
    accelX = acceleration.x;
    accelY = acceleration.y;
    
    vy = vy + -(accelY);
    vx = vx + accelX;
    
    y = parseInt(y + vy * vMultiplier);
    x = parseInt(x + vx * vMultiplier);
    
    //límites para el movimiento
    if (x<0) { x = 0; vx = 0; }
    if (y<0) { y = 0; vy = 0; }
    
    if (x>document.documentElement.clientWidth-radius) {
        x = document.documentElement.clientWidth-radius; vx = 0;
    }
    
    if (y>document.documentElement.clientHeight-radius) {
        y = document.documentElement.clientHeight-radius; vy = 0;
    }
    
    //aplicar la posición al estilo de la posición de dot
    dot.style.top = y + "px";
    dot.style.left = x + "px";
    
    accElement.innerHTML = acceleration.x + '<br/>' + acceleration.y + 
        '<br/>' + acceleration.z + 
        '<br/> timestamp' + acceleration.timestamp + '<br />' +
        'Move Top: ' +  y + 'px <br />'+
        'Move Left: ' + x + 'px';
    
}
            
function onError(error) {
    //Manejar cualquier error que nos podriamos enfrentar
    var accElement = document.getElementById('accelerometerData');
    accElement.innerHTML = 'Lo siento, no puedo acceder a datos de aceleracioń'
} 
