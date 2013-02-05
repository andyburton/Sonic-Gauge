
/**
 * Sonic Gauge jQuery Plugin v0.1
 * jQuery plugin to create and display SVG gauges using RaphaelJS
 * 
 * Copyright (c) 2013 Andy Burton (http://andyburton.co.uk)
 * GitHub https://github.com/andyburton/Sonic-Gauge
 * 
 * Licensed under the MIT license (http://andyburton.co.uk/license/mit.txt)
 */

(function($){
	
	var methods	= {
		
		/**
		 * Initialise object
		 */
		
		init : function (options)
		{
			
			this.options	= $.extend ({},$.fn.SonicGauge.defaultOptions);
			this.settings	= {};
			
			this.SonicGauge ('setOptions', options);
			this.SonicGauge ('draw');
			
			return this;
			
		},
		
		/**
		 * Set options
		 */
		
		setOptions : function (options)
		{
			
			if (options)
			{
				if (options.style)
				{
					$.extend (this.options.style, options.style);
				}

				delete options.style;

				$.extend (this.options, options);
			}
			
			this.settings.canvas_d	= this.options.diameter;
			this.settings.canvas_r	= this.settings.canvas_d / 2;
			this.settings.speedo_d	= this.settings.canvas_d - this.options.margin * 2;
			this.settings.speedo_r	= this.settings.speedo_d / 2;
			this.settings.increment	= (this.options.end.angle - this.options.start.angle) / this.options.end.num;
			
			return this;
			
		},
		
		/**
		 * Draw gauge
		 */

		draw : function ()
		{
			
			this.gauge		= Raphael (this.attr ('id'), this.settings.canvas_d, this.settings.canvas_d);

			var outline		= this.gauge.circle (this.settings.canvas_r, this.settings.canvas_r, this.settings.speedo_r).attr (this.options.style.outline);
			var center		= this.gauge.circle (this.settings.canvas_r, this.settings.canvas_r, this.options.style.center.diameter).attr (this.options.style.center);
			
			if (this.options.label)
			{
				var label	= this.gauge.text (this.settings.canvas_r, this.settings.canvas_r - (this.settings.canvas_r / 4), this.options.label).attr (this.options.style.label);
			}
			
			var p			= this;
			var markers		= [];

			$.each (this.options.markers, function () {
				
				if (this.line)
				{

					if (!this.line.width)
					{
						this.line.width = 10;
					}

					var line	= p.gauge.rect (p.settings.canvas_r + p.settings.speedo_r - this.line.width, p.settings.canvas_r, this.line.width, 1).attr (this.line).hide ();

				}
				
				var end	= this.divide? p.options.end.num * this.divide : p.options.end.num;
				
				for (var count = 0; count <= end; count += this.gap)
				{
					
					var val	= this.divide? count / this.divide : count;
					
					if ($.inArray (val, markers) >= 0)
					{
						continue;
					}

					markers.push (val);
					
					if (this.toFixed)
					{
						val = val.toFixed (this.toFixed);
					}
					
					if (this.toPrecision)
					{
						val = val.toPrecision (this.toPrecision);
					}

					var a	= p.settings.increment * val + p.options.start.angle;

					if (this.line)
					{
						var speed_marker = line.clone ().rotate (a, p.settings.canvas_r, p.settings.canvas_r);
					}

					if (this.text)
					{

						if (!this.text.space)
						{
							this.text.space = 0;
						}

						var rad		= a.toRadians ();
						var x		= p.settings.canvas_r + (this.text.space + p.settings.speedo_r) * Math.cos (rad);
						var y		= p.settings.canvas_r + (this.text.space + p.settings.speedo_r) * Math.sin (rad);
						var text	= p.gauge.text (x, y, val).attr (this.text);

					}

				}

				if (this.line)
				{
					line.remove ();
				}

			});

			this.needle	= this.gauge.rect (this.settings.canvas_r, this.settings.canvas_r, this.settings.speedo_r, 1).attr (this.options.style.needle).hide ();
			this.needle.transform ("r" + (this.settings.increment * this.options.default_num + this.options.start.angle) + "," + this.settings.canvas_r + "," + this.settings.canvas_r).show ();
			
			return this;
			
		},

		/**
		 * Set gauge value
		 */

		val : function (val)
		{
			this.needle.animate ({transform: "r" + (this.settings.increment * val + this.options.start.angle) + "," + this.settings.canvas_r + "," + this.settings.canvas_r}, this.options.animation_speed);
			return this;
		}
		
	};
	
	/**
	 * Constructor
	 */
	
	$.fn.SonicGauge = function (method) {
		
		// Call method and set options

		if (methods[method]){
			return methods[method].apply (this, Array.prototype.slice.call (arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply (this, arguments);
		} else {
			$.error ('Method ' +  method + ' does not exist on jQuery.SonicGauge');
		}
		
	};
	
	/**
	 * Default options
	 */
	
	$.fn.SonicGauge.defaultOptions = {
		margin			: 35,
		diameter		: 350,
		start			: {angle: -225, num: 0},
		end				: {angle: 45, num: 100},
		default_num		: 0,
		animation_speed	: 1000,
		markers			: [
			{
				gap: 10,
				line: {"width": 20, "stroke": "none", "fill": "#eeeeee"},
				text: {"space": 22, "text-anchor": "middle", "fill": "#333333", "font-size": 18}
			},{
				gap: 5, 
				line: {"width": 8, "stroke": "none", "fill": "#999999"}
			}
		],
		style			: {
			"outline"	: {"fill": "#333333", "stroke": "#555555", "stroke-width": 8},
			"center"	: {"fill": "#eeeeee", "diameter": 10},
			"needle"	: {"stroke": "none", "fill": "#cc0000"}
		}
	};
	
})(jQuery);

/**
 * Convert decimal to radians
 */

if (typeof (Number.prototype.toRadians) === "undefined") {
	Number.prototype.toRadians = function () {
		return this * Math.PI / 180;
	}
}