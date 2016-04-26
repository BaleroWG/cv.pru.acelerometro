# cv.pru.acelerometro
proyecto cordova android. prueba del acelerometro

hay que instalar los plugins device y accelerometer. En la carpeta del proyecto ejecutar

$ cordova platform add android
 
$ cordova plugin add cordova-plugin-device

$ cordova plugin add cordova-plugin-device-motion

$ cordova build android

para correr en un dispositivo conectado a la notebook:

$ cordova run android --device
