Sonic-Gauge
===========

jQuery plugin to create and display SVG gauges using RaphaëlJS

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

* **label** _(string, default: "")_  	
A gauge label displayed above the center of the gauge.

* **animation_speed** _(integer, default: 100)_  
The needle rotate animation duration in milliseconds.

* **diameter** _(integer, default 350)_  
The diameter of the gauge element in pixels including any margin.

* **margin** _(integer, default: 35)_  
The margin in pixels between the gauge and edge of the element (i.e. gauge diameter = element diameter - margin * 2).

* **default_num** _(integer, default: 0)_  
The default value to set the gauge needle at.

* **start** _(object, default: {angle: -225, num: 0})_  
The start position and number of the gauge.  
	
	* **angle** _(integer, required)_  
	  Degree offset, 0 degrees is center right.  
	
	* **num** _(integer, required)_  
	  Starting value.  
	
* **end** _(object, default: {angle: 45, num: 100})_  
The end position and number of the gauge.  
	
	* **angle** _(integer, required)_  
	Degree offset, 0 degrees is center right.  
	
	* **num** _(integer, required)_  
	Starting value.  
	
* **markers** _(object)_  
Markers to display around the gauge. These can include marker lines, marker value text and styling.  
Markers are listed in order of priority.

	* **gap** _(integer, required)_  
	The distance between each marker.  
	There will only be 1 marker per value which means having 2 markers, one with a gap of 10 another with 5, will not cause them to clash.
	
	* **divide** _(integer)_  
	A number to divide the value by to fix precision e.g. a gap of 0.01 will cause javascript precision issues, so set a gap of 1 and divide of 100.
	
	* **toFixed** _(integer)_  
	A number to fix decimals to for the marker value. This calls the native javascript function toFixed on the label value if present.
	
	* **toPrecision** _(integer)_  
	A number to fix precision to for the marker value. This calls the native javascript function toPrecision on the label value if present.
	
	* **line** _(object)_  
	Raphael style attribute for the marker lines (see http://raphaeljs.com/reference.html#Element.attr)  
	Marker lines will be displayed on the gauge if this option is set.  
	A "width" value is required in the object in addition to the Raphael attributes to set the line length.
	
	* **text** _(object)_  
	Raphael style attribute for the marker text (see http://raphaeljs.com/reference.html#Element.attr)  
	Marker text will be displayed on the gauge if this option is set.  
	A "space" value is option in the object in addition to the Raphael attributes to set the text label offset from the gauge.
	
* **style** _(object)_  
Raphael style attribute for gauge elements (see http://raphaeljs.com/reference.html#Element.attr)  

	* **outline** _(object)_  
	Styling for the gauge dial and background.  

	* **center** _(object)_  
	Styling for the gauge center point.  

	* **needle** _(object)_  
	Styling for the gauge indicator needle.  

	* **label** _(object)_  
	Styling for the gauge label.  	


Testing
-------

Tested with jQuery 1.9.0 and RaphaelJS 2.1.0, hooked up to a node.js server with socket.io running on a Raspberry Pi with a USB GPS receiver, displaying realtime GPS stats.


Example
-------

See [example.htm](https://github.com/andyburton/Sonic-Gauge/blob/master/example.htm) for further details and demonstrations.
