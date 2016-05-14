# davis-weather
A Node.js module for querying Davis Advantage Pro 2 consoles with Davis 
WeatherLink IP that are connected to the network.

# Usage
First, install the library:

`npm install --save davis-weather`

Then, require it:

```javascript
var Davis = require('davis-weather');
var davisClient = new Davis('192.168.1.60');
```

The constructor object accepts two parameters, hostname/ipAddress and port number.
The port number is optional and defaults to port 22222.

# Example
Once initialized, data can be easily retrieved:

```javascript
davisClient.getCurrentConditions(function(err, data) {    
   if(err) {
       console.log(err);
   } else {
       console.log(JSON.stringify(data, null, 2));
   }
});
```

# API Reference
The library includes the following methods:

`davisClient.getCurrentConditions(callback)`

The callback accepts two standard parameters, the first one being an `Error` object if the operation failed.
The second parameter provides an `object` with the current weather conditions captured by the console.

```javascript
davisClient.getCurrentConditions(function(err, data) {    
   if(err) {
       console.log(err);
   } else {
       console.log(JSON.stringify(data, null, 2));
   }
});
```
---

`davisClient.getHiLowData(callback)`

The callback accepts two standard parameters, the first one being an `Error` object if the operation failed.
The second parameter provides an `object` with the high and low data captured by the console.

```javascript
davisClient.getHiLowData(function(err, data) {    
   if(err) {
       console.log(err);
   } else {
       console.log(JSON.stringify(data, null, 2));
   }
});
```

The MIT License (MIT)
=======

Copyright (c) 2016 Carlos Fonseca <cfonze@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.