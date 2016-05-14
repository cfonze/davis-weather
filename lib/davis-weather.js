/**
 * A Davis Pro Vantage 2 weather console WeatherLink IP network API library
 * 
 * Author: Carlos Fonseca
 */

var net  = require('net');
var util = require('util');
var _    = require('lodash/lang');


var foreCastStrings = [
    "Mostly clear and cooler.",
    "Mostly clear with little temperature change.",
    "Mostly clear for 12 hrs. with little temperature change.",
    "Mostly clear for 12 to 24 hrs. and cooler.",
    "Mostly clear with little temperature change.",
    "Partly cloudy and cooler.",
    "Partly cloudy with little temperature change.",
    "Partly cloudy with little temperature change.",
    "Mostly clear and warmer.",
    "Partly cloudy with little temperature change.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 24 to 48 hrs.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds with little temperature change. Precipitation possible within 24 hrs.",
    "Mostly clear with little temperature change.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds with little temperature change. Precipitation possible within 12 hrs.",
    "Mostly clear with little temperature change.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 24 hrs.",
    "Mostly clear and warmer. Increasing winds.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 12 hrs. Increasing winds.",
    "Mostly clear and warmer. Increasing winds.",
    "Increasing clouds and warmer.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 12 hrs. Increasing winds.",
    "Mostly clear and warmer. Increasing winds.",
    "Increasing clouds and warmer.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 12 hrs. Increasing winds.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly clear and warmer. Precipitation possible within 48 hrs.",
    "Mostly clear and warmer.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds with little temperature change. Precipitation possible within 24 to 48 hrs.",
    "Increasing clouds with little temperature change.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 12 to 24 hrs.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 12 to 24 hrs. Windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 12 to 24 hrs. Windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 6 to 12 hrs.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 6 to 12 hrs. Windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 12 to 24 hrs. Windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation possible within 12 hrs.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and warmer. Precipitation likely.",
    "clearing and cooler. Precipitation ending within 6 hrs.",
    "Partly cloudy with little temperature change.",
    "clearing and cooler. Precipitation ending within 6 hrs.",
    "Mostly clear with little temperature change.",
    "Clearing and cooler. Precipitation ending within 6 hrs.",
    "Partly cloudy and cooler.",
    "Partly cloudy with little temperature change.",
    "Mostly clear and cooler.",
    "clearing and cooler. Precipitation ending within 6 hrs.",
    "Mostly clear with little temperature change.",
    "Clearing and cooler. Precipitation ending within 6 hrs.",
    "Mostly clear and cooler.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds with little temperature change. Precipitation possible within 24 hrs.",
    "Mostly cloudy and cooler. Precipitation continuing.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy and cooler. Precipitation likely.",
    "Mostly cloudy with little temperature change. Precipitation continuing.",
    "Mostly cloudy with little temperature change. Precipitation likely.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and cooler. Precipitation possible and windy within 6 hrs.",
    "Increasing clouds with little temperature change. Precipitation possible and windy within 6 hrs.",
    "Mostly cloudy and cooler. Precipitation continuing. Increasing winds.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy and cooler. Precipitation likely. Increasing winds.",
    "Mostly cloudy with little temperature change. Precipitation continuing. Increasing winds.",
    "Mostly cloudy with little temperature change. Precipitation likely. Increasing winds.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and cooler. Precipitation possible within 12 to 24 hrs. Possible wind shift to the W, NW, or N.",
    "Increasing clouds with little temperature change. Precipitation possible within 12 to 24 hrs. Possible wind shift to the W, NW, or N.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and cooler. Precipitation possible within 6 hrs. Possible wind shift to the W, NW, or N.",
    "Increasing clouds with little temperature change. Precipitation possible within 6 hrs. Possible wind shift to the W, NW, or N.",
    "Mostly cloudy and cooler. Precipitation ending within 12 hrs. Possible wind shift to the W, NW, or N.",
    "Mostly cloudy and cooler. Possible wind shift to the W, NW, or N.",
    "Mostly cloudy with little temperature change. Precipitation ending within 12 hrs. Possible wind shift to the W, NW, or N.",
    "Mostly cloudy with little temperature change. Possible wind shift to the W, NW, or N.",
    "Mostly cloudy and cooler. Precipitation ending within 12 hrs. Possible wind shift to the W, NW, or N.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy and cooler. Precipitation possible within 24 hrs. Possible wind shift to the W, NW, or N.",
    "Mostly cloudy with little temperature change. Precipitation ending within 12 hrs. Possible wind shift to the W, NW, or N.",
    "Mostly cloudy with little temperature change. Precipitation possible within 24 hrs. Possible wind shift to the W, NW, or N.",
    "clearing, cooler and windy. Precipitation ending within 6 hrs.",
    "clearing, cooler and windy.",
    "Mostly cloudy and cooler. Precipitation ending within 6 hrs. Windy with possible wind shift to the W, NW, or N.",
    "Mostly cloudy and cooler. Windy with possible wind shift to the W, NW, or N.",
    "clearing, cooler and windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy with little temperature change. Precipitation possible within 12 hrs. Windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and cooler. Precipitation possible within 12 hrs., possibly heavy at times. Windy.",
    "Mostly cloudy and cooler. Precipitation ending within 6 hrs. Windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy and cooler. Precipitation possible within 12 hrs. Windy.",
    "Mostly cloudy and cooler. Precipitation ending in 12 to 24 hrs.",
    "Mostly cloudy and cooler.",
    "Mostly cloudy and cooler. Precipitation continuing, possible heavy at times. Windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy and cooler. Precipitation possible within 6 to 12 hrs. Windy.",
    "Mostly cloudy with little temperature change. Precipitation continuing, possibly heavy at times. Windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy with little temperature change. Precipitation possible within 6 to 12 hrs. Windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds with little temperature change. Precipitation possible within 12 hrs., possibly heavy at times. Windy.",
    "Mostly cloudy and cooler. Windy.",
    "Mostly cloudy and cooler. Precipitation continuing, possibly heavy at times. Windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy and cooler. Precipitation likely, possibly heavy at times. Windy.",
    "Mostly cloudy with little temperature change. Precipitation continuing, possibly heavy at times. Windy.",
    "Mostly cloudy with little temperature change. Precipitation likely, possibly heavy at times. Windy.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and cooler. Precipitation possible within 6 hrs. Windy.",
    "Increasing clouds with little temperature change. Precipitation possible within 6 hrs. windy",
    "Increasing clouds and cooler. Precipitation continuing. Windy with possible wind shift to the W, NW, or N.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy and cooler. Precipitation likely. Windy with possible wind shift to the W, NW, or N.",
    "Mostly cloudy with little temperature change. Precipitation continuing. Windy with possible wind shift to the W, NW, or N.",
    "Mostly cloudy with little temperature change. Precipitation likely. Windy with possible wind shift to the W, NW, or N.",
    "Increasing clouds and cooler. Precipitation possible within 6 hrs. Windy with possible wind shift to the W, NW, or N.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and cooler. Precipitation possible within 6 hrs. Possible wind shift to the W, NW, or N.",
    "Increasing clouds with little temperature change. Precipitation possible within 6 hrs. Windy with possible wind shift to the W, NW, or N.",
    "Increasing clouds with little temperature change. Precipitation possible within 6 hrs. Possible wind shift to the W, NW, or N.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and cooler. Precipitation possible within 6 hrs. Windy with possible wind shift to the W, NW, or N.",
    "Increasing clouds with little temperature change. Precipitation possible within 6 hrs. Windy with possible wind shift to the W, NW, or N.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Increasing clouds and cooler. Precipitation possible within 12 to 24 hrs. Windy with possible wind shift to the W, NW, or N.",
    "Increasing clouds with little temperature change. Precipitation possible within 12 to 24 hrs. Windy with possible wind shift to the W, NW, or N.",
    "Mostly cloudy and cooler. Precipitation possibly heavy at times and ending within 12 hrs. Windy with possible wind shift to the W, NW, or N.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy and cooler. Precipitation possible within 6 to 12 hrs., possibly heavy at times. Windy with possible wind shift to the W, NW, or N.",
    "Mostly cloudy with little temperature change. Precipitation ending within 12 hrs. Windy with possible wind shift to the W, NW, or N.",
    "Mostly cloudy with little temperature change. Precipitation possible within 6 to 12 hrs., possibly heavy at times. Windy with possible wind shift to the W, NW, or N.",
    "Mostly cloudy and cooler. Precipitation continuing.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy and cooler. Precipitation likely, windy with possible wind shift to the W, NW, or N.",
    "Mostly cloudy with little temperature change. Precipitation continuing.",
    "Mostly cloudy with little temperature change. Precipitation likely.",
    "Partly cloudy with little temperature change.",
    "Mostly clear with little temperature change.",
    "Mostly cloudy and cooler. Precipitation possible within 12 hours, possibly heavy at times. Windy.",
    "FORECAST REQUIRES 3 HRS. OF RECENT DATA",
    "Mostly clear and cooler."
];

/** 
 * Method to convert the bytes sent over the network into a word.
 * 
 * Because network byte order is least significant digit first then most siginificant digit
 * you need to flip the byte order around.
 * So lets say that inside Temp is 63.6 degrees F   
 * the buffer position 10 & 11 would contain two bytes: 0x7c and 0x02 , respectivley. 
 * If you convert 0x7c02 to a decimal number it is  31746 and its wrong.
 * First you need to flip the order of the bytes, so the 
 * number becomes 0x027c. and when you conver that it becomes 
 * 636 which is then divided by 10 to get the inside temp of 63.6   
 * 
 * To create a Word out of these 2 bytes, you need to shift the
 * 2nd byte 8 bits to the left and then bitwise OR the two bytes together. 
 * 
 * @param {string[]} b - An array of bytes.
 * @param {number} offset - The index in the array where the word should begin.
 */
function bytesToWord(b, offset) {
    if(_.isTypedArray(b) !== true) {
        throw new Error('The first parameter needs to be an array of bytes');
    }    
    var j = 0; 
    j = b[offset+1] & 0xff;
    j = j << 8;
    j |= b[offset] & 0xff;
    
    return j;
}

/**
 * Method to convert the bytes to a date.
 * 
 * @param {string[]} b - An array of bytes.
 * @param {number} offset - The index in the array where the word should begin. 
 */
function getStartDateOfCurrentStorm(b, offset) {
    if(_.isTypedArray(b) !== true) {
        throw new Error('The first parameter needs to be an array of bytes');
    }    
    var data = bytesToWord(b, offset);
    var year = data & 0x007F;
    year += 2000;
    var month = data & 0xF000;
    month = month >> 12;
    var day = data & 0x0F80;
    day = day >> 7;
    
    return month + '/' + day + '/' + year;
}

/**
 * Creates a new Davis object with the specified hostname and port.
 * 
 * @param {string} hostname - The hostname or ip address of the Davis Pro Vantage 2 console.
 * @param {number} [port] - The TCP/IP port number of the Davis Pro Vantage 2 console, default is 22222.  
 */
function Davis(hostname, port) {
    if (!(this instanceof Davis)) {
        throw new TypeError('Cannot call Davis constructor as a function');
    }
    
    this.hostname = hostname;
    this.port = port || 22222;
}

/**
 * @function
 * Gets the current data from the Davis device.
 * 
 * @param {callback} callback - The callback that handles the response.
 */
Davis.prototype.getCurrentConditions = function(callback) {
    var socket = new net.Socket();
    var wakeUpCmd = '\r';
    var currentDataCmd = 'LOOP 1\n';
    var cmd = '';
    var self = this;
    var dataRecieved = false;
    var wakeUpTries = 0;
    
    var wakeUp = function() {
        if(dataRecieved === false) {
            wakeUpTries++;
            socket.write(wakeUpCmd);
            if(wakeUpTries < 5) {
                setTimeout(wakeUp, 1000);                
            } else {
                socket.destroy();
                var error = 'Unable to wakeup console';
                callback(error, null);
            }
        }        
    };
    
    socket.connect (self.port, self.hostname, function() {
        cmd = wakeUpCmd;
        socket.write(wakeUpCmd);
        setTimeout(wakeUp, 1000);       
    });    
    
    socket.on('data', function(data) {
        dataRecieved = true;    
        //console.log('bytes read = ' + socket.bytesRead);
        //console.log('DATA length: ' + data.length);        
        if(cmd === wakeUpCmd) {
            cmd = currentDataCmd;
            socket.write(currentDataCmd);              
        } else if (cmd === currentDataCmd && data.length > 2) {            
            socket.destroy();
            callback(null, createCurrentDataObject(data));
        }
    });
    
    socket.on('error', function(error){
        callback(error, null);
    });    
};

/**
 * Creates the current data object based on the data specified.
 */
function createCurrentDataObject(data) {
    var currentData = {};    
    var bpString = '';
    var bp = data[4];
    switch(bp) {
        case 196: 
            bpString = 'Falling Rapidly';
            break;
        case 236: 
            bpString = 'Falling Slowly'; 
            break; 	
        case 0:   
            bpString = 'Steady'; 
            break;
        case 20:  
            bpString = 'Rising Slowly'; 
            break; 	
        case 60:  
            bpString = 'Rising Rapidly'; 
            break;   
        default:
            bpString = bp;
            break;             
    }
    currentData.barometricPressure = bpString;    
    currentData.barometer = bytesToWord(data, 8)/1000.0;    
    currentData.insideTemperature = bytesToWord(data, 10)/10.0;
    currentData.insideHumidity = data[12];
    currentData.outsideTemperature = bytesToWord(data, 13)/10.0;
    currentData.windSpeed = data[15];
    currentData.avgWindSpeed = data[16];
    currentData.windDirection = bytesToWord(data, 17);
    currentData.outsideHumidity = data[34];
    currentData.rainRate = data[42]/100.0;
    currentData.uvLevel = data[44]/10.0;
    currentData.solarRadiation = bytesToWord(data, 45);
    currentData.stormRain = bytesToWord(data, 47)/100.0;
    currentData.startDateOfCurrentStorm = getStartDateOfCurrentStorm(data, 49);
    currentData.dayRain = bytesToWord(data, 51)/100.0;
    currentData.monthRain = bytesToWord(data, 53)/100.0;
    currentData.yearRain = bytesToWord(data, 55)/100.0;    
    currentData.battery = ((data[87]* 300)/512)/100.0;
    currentData.consoleBattery = ((data[88]* 300)/512)/100.0;    
    if(data[91] > 0 && data[91] <= foreCastStrings.length) {
        currentData.forecast = foreCastStrings[data[91]];
    } else {
        currentData.forecast = 'N/A';
    }        
    currentData.sunRise = bytesToWord(data, 92);
    currentData.sunSet = bytesToWord(data, 94);        
    return currentData;    
}


/**
 * @function
 * Gets the Hi Low data from the Davis device.
 * 
 * @param {callback} callback - The callback that handles the response.
 */
Davis.prototype.getHiLowData = function(callback) {
    var socket = new net.Socket();
    var wakeUpCmd = '\r';
    var hiLowDataCmd = 'HILOWS\n';
    var cmd = '';
    var self = this;
    var dataRecieved = false;
    var wakeUpTries = 0;
    
    var wakeUp = function() {
        if(dataRecieved === false) {
            wakeUpTries++;
            socket.write(wakeUpCmd);
            if(wakeUpTries < 5) {
                setTimeout(wakeUp, 1000);                
            } else {
                socket.destroy();
                var error = 'Unable to wakeup console';
                callback(error, null);
            }
        }        
    };
    
    socket.connect (self.port, self.hostname, function() {
        cmd = wakeUpCmd;
        socket.write(wakeUpCmd);
        setTimeout(wakeUp, 1000);       
    });    
    
    socket.on('data', function(data) {
        dataRecieved = true;    
        //console.log('bytes read = ' + socket.bytesRead);
        //console.log('DATA length: ' + data.length);        
        if(cmd === wakeUpCmd) {
            cmd = hiLowDataCmd;
            socket.write(hiLowDataCmd);              
        } else if (cmd === hiLowDataCmd && data.length > 2) {            
            socket.destroy();
            callback(null, createHiLowDataObject(data));
        }
    });
    
    socket.on('error', function(error){
        callback(error, null);
    });    
};

/**
 * Creates the current data object based on the data specified.
 */
function createHiLowDataObject(data) {
    var hiLowData = {};

    hiLowData.loBarometer = bytesToWord(data, 1)/1000.0;
    hiLowData.hiBarometer = bytesToWord(data, 3)/1000.0;
    hiLowData.loBarometerThisMonth = bytesToWord(data, 5)/1000.0;
    hiLowData.hiBarometerThisMonth = bytesToWord(data, 7)/1000.0;
    hiLowData.loBarometerThisYear = bytesToWord(data, 9)/1000.0;
    hiLowData.hiBarometerThisYear = bytesToWord(data, 11)/1000.0;            
    hiLowData.loBarometerTimeOfDay = bytesToWord(data, 13);
    hiLowData.hiBarometerTimeOfDay = bytesToWord(data, 15);
    
    hiLowData.highestWindSpeedForToday = data[17];
    hiLowData.highestWindSpeedTimeOfDay = bytesToWord(data, 18);
    hiLowData.highestWindSpeedForMonth = data[20];
    hiLowData.highestWindSpeedForYear = data[21];

    hiLowData.insideHighTempForToday = bytesToWord(data, 22)/10.0;
    hiLowData.insideLowTempForToday = bytesToWord(data, 24)/10.0;
    hiLowData.insideHighTempTimeOfDay = bytesToWord(data, 26);
    hiLowData.insideLowTempTimeOfDay = bytesToWord(data, 28);
    hiLowData.insideLowTempForMonth = bytesToWord(data, 30)/10.0;
    hiLowData.insideHighTempForMonth = bytesToWord(data, 32)/10.0;
    hiLowData.insideLowTempForYear = bytesToWord(data, 34)/10.0;
    hiLowData.insideHighTempForYear = bytesToWord(data, 36)/10.0;    
    
    hiLowData.lowHumidityForDay = data[277];
    hiLowData.highHumidityForDay = data[285];
    hiLowData.lowHumidityTimeOfDay = bytesToWord(data, 293);
    hiLowData.highHumidityTimeOfDay = bytesToWord(data, 309);
    
    return hiLowData;    
}

exports = module.exports = Davis;