Sonic-Gauge
===========

jQuery plugin to create and display SVG gauges using RaphaeJS

![Example Gauages](https://raw.github.com/andyburton/Sonic-Gauge/master/example.png)


Requirements
------------

jQuery (http://jquery.com/download/)	
RaphaelJS (http://raphaeljs.com/)


Installation
------------

Initialise elements with:

```javascript
$('#element').SonicGauge ({
  ...options...
});
```

Set gauge value e.g.:

```javascript
var value = 10;
$('#element').SonicGauge ('val', value);
```

Other methods that will most likely not need to be called directly:

Set options with:

```javascript
$('#element').SonicGauge ('setOptions', {
  ...options...
});
```

Draw gauge with:

```javascript
$('#element').SonicGauge ('draw');
```


Options
-------

* **label** _(string|object)_  	
A gauge label displayed above the center of the gauge.

	* **value** _(string, required)_  
	Label value text.
	
	* **margin_x** _(integer)_  
	X-axis margin offset in pixels.  
	
	* **margin_y** _(integer)_  
	Y-axis margin offset in pixels.  

* **animation_speed** _(integer, default: 1000)_  
The needle rotate animation duration in milliseconds.  

* **diameter** _(integer, default 350)_  
The diameter of the gauge element in pixels including any margin.  

* **margin** _(integer, default: 35)_  
The margin in pixels between the gauge and edge of the element (i.e. gauge diameter = element diameter - margin * 2).  

* **default_num** _(integer, default: 0)_  
The default value to set the gauge needle at.  

* **digital** _(integer, default: {})_  
Raphael style attribute for the digital display (see http://raphaeljs.com/reference.html#Element.attr)  
The digital display will be shown on the gauge if this option is set.  
Set to false to disable the digital display.  

* **digital_toFixed** _(integer, default: 0)_  
Fixed number of decimal places for the digital display value. This calls the native javascript function toFixed.   
Set to false to disable.  

* **digital_toPrecision** _(integer, default: 0)_  
Fixed precision for the digital display value. This calls the native javascript function toPrecision.  
Set to false to disable.  

* **start** _(object, default: {angle: -225, num: 0})_  
The start position and number of the gauge.  
	
	* **angle** _(integer, default: -225)_  
	Degree offset, 0 degrees is center right.  
	
	* **num** _(integer, default: 0)_  
	Starting value.  
	
* **end** _(object, default: {angle: 45, num: 100})_  
The end position and number of the gauge.  
	
	* **angle** _(integer, default: 45)_  
	Degree offset, 0 degrees is center right.  
	
	* **num** _(integer, default: 100)_  
	Starting value.  
	
* **markers** _(object)_  
Markers to display around the gauge. These can include marker lines, marker value text and styling.  
Markers are listed in order of priority.

	* **gap** _(integer, required)_  
	The distance between each marker.  
	There will only be 1 marker per value which means having 2 markers, one with a gap of 10 another with 5, will not cause them to clash.  
	
	* **toFixed** _(integer)_  
	A number to fix decimals to for the marker value. This calls the native javascript function toFixed on the label value if present.  
	
	* **toPrecision** _(integer)_  
	A number to fix precision to for the marker value. This calls the native javascript function toPrecision on the label value if present.  
	
	* **value** _(object)_  
	Value modifier for the marker value label.  
	
		* **divide** _(integer)_  
		Divide the marker value by this number for the label.  
		
		* **multiply** _(integer)_  
		Multiply the marker value by this number for the label.  

	* **line** _(object)_  
	Raphael style attribute for the marker lines (see http://raphaeljs.com/reference.html#Element.attr)  
	Marker lines will be displayed on the gauge if this option is set.  
	Note that the "width" value is the line length, the "height" value the line width, both in pixels.  
	
	* **text** _(object)_  
	Raphael style attribute for the marker text (see http://raphaeljs.com/reference.html#Element.attr)  
	Marker text will be displayed on the gauge if this option is set.  
	A "space" value is option in the object in addition to the Raphael attributes to set the text label offset from the gauge.  
	Use a negative space value to place the marker text inside the gauge.  
	
* **style** _(object)_  
Raphael style attribute for gauge elements (see http://raphaeljs.com/reference.html#Element.attr)  

	* **outline** _(object, default: {"fill": "#333333", "stroke": "#555555", "stroke-width": 8})_  
	Styling for the gauge dial and background.  

	* **center** _(object, default: {"fill": "#eeeeee", "diameter": 10})_  
	Styling for the gauge center point.  

	* **needle** _(object, default: {"height": 1, "stroke": "none", "fill": "#cc0000"})_  
	Styling for the gauge indicator needle.   

	* **label** _(object, default: {"text-anchor": "middle", "fill": "#fff", "font-size": 16})_  
	Styling for the gauge label.  
	
* **needles** _(object, default: [{}])_  
Array of gauge needle indicators. The default displays a single needle.  

	* **default_num** _(integer, default: options.default_num)_  
	The default value to set the needle at.  
	
	* **style** _(object, default: options.style.needle)_  
	Raphael style attribute for the needle (see http://raphaeljs.com/reference.html#Element.attr)  
	
	* **value** _(object)_  
	Value modifier for the needle to display.  
	
		* **divide** _(integer)_  
		Divide the gauge value by this number for the needle to display.  
	
		* **multiply** _(integer)_  
		Multiply the gauge value by this number for the needle to display.  


Testing
-------

Tested with jQuery 1.9.0 and RaphaelJS 2.1.0, hooked up to a node.js server with socket.io running on a Raspberry Pi with a USB GPS receiver, displaying realtime GPS stats.


Example
-------

See [example.htm](https://github.com/andyburton/Sonic-Gauge/blob/master/example.htm) for further details and demonstrations.
