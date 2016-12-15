// ## Transit chart ###################################
(function( astrology ) {
	
	var context;
    
	/**
	 * Transit charts.
	 * 
	 * @class
	 * @public
	 * @constructor
 	 * @param {astrology.Radix} radix 
	 * @param {Object} data
	 */
	astrology.Transit = function( radix, data ){
		
		// Validate data
		var status = astrology.utils.validate(data);		 		
		if( status.hasError ) {										
			throw new Error( status.messages );
		}
						
		this.data = data;								
		this.paper = radix.paper; 
		this.cx = radix.cx;
		this.cy = radix.cy;
		this.radius = radix.radius;
		
		this.shift = radix.shift;		
						
		this.universe = document.createElementNS(this.paper.root.namespaceURI, "g");
		this.universe.setAttribute('id', astrology.ID_CHART + "-" + astrology.ID_TRANSIT);
		this.paper.root.appendChild( this.universe );
					
		context = this; 
												
		return this;
	};
		
	/**
	 * Draw points
	 */
	astrology.Transit.prototype.drawPoints = function(){
		if(this.data.points == null){
			return;
		}
		
		var universe = this.universe;		
		var wrapper = astrology.utils.getEmptyWrapper( universe, astrology.ID_CHART + "-" + astrology.ID_TRANSIT + "-" + astrology.ID_POINTS );
				
		// Planets can not be displayed on the same radius.				
		var gap = astrology.MARGIN;
		var radiusStep = ( gap / 2 ) / Object.keys(this.data.points).length;	
		var planetRadius = this.radius + (2 * astrology.PADDING);
									
		for (var planet in this.data.points) {
 			if (this.data.points.hasOwnProperty( planet )) {
 		   		var position = astrology.utils.getPointPosition( this.cx, this.cy, planetRadius, this.data.points[planet] + this.shift); 		   		 		   	
 		   		var symbol = this.paper.getSymbol(planet, position.x, position.y);
        		symbol.setAttribute('id', astrology.ID_CHART + "-" + astrology.ID_TRANSIT + "-" + astrology.ID_POINTS + "-" + planet);
        		symbol.setAttribute('data-radius', planetRadius); 		   		 		   	
        		wrapper.appendChild( symbol );
        		//planetRadius += radiusStep;
        		// TODO
    		}
		}							
	};
	
	/**
	 * Draw aspects
	 */
	astrology.Transit.prototype.aspects = function( data ){
		
		// TODO
		// validate data
												
		var wrapper = astrology.utils.getEmptyWrapper( this.universe, astrology.ID_CHART + "-" + astrology.ID_ASPECTS );
		
        for( var i = 0, len = data.length; i < len; i++ ){ 
        	var startPosition = astrology.utils.getPointPosition( this.cx, this.cy, this.radius/astrology.INDOOR_CIRCLE_RADIUS_RATIO, data[i][0] + this.shift);
        	var endPosition = astrology.utils.getPointPosition( this.cx, this.cy, this.radius/astrology.INDOOR_CIRCLE_RADIUS_RATIO, data[i][1] + this.shift);        	
        	var line = this.paper.line( startPosition.x, startPosition.y, endPosition.x, endPosition.y);        		        
        	line.setAttribute("stroke", astrology.STROKE_ONLY ? astrology.FONT_COLOR : data[i][2]);		 				 				 		
 			line.setAttribute("stroke-width", 1);        	
        	wrapper.appendChild( line );        	        
        }
        
        // this
        return context;				
	};
	
	/**
	 * Draw ruler
	 */
	astrology.Transit.prototype.drawRuler = function drawRuler(){
		 var universe = this.universe;
		
		// rays
        var lineLength = 3;
        for( i = 0, start = 0, step = 5;i < 72; i++ ){ 
            var startPosition = astrology.utils.getPointPosition( this.cx, this.cy, this.radius, start  + this.shift);
        	var endPosition = astrology.utils.getPointPosition( this.cx, this.cy, this.radius + lineLength, start + this.shift);
        	var line = this.paper.line( startPosition.x, startPosition.y, endPosition.x, endPosition.y);        	
        	line.setAttribute("stroke", astrology.COLOR_CIRCLE );		 				 				 		
 			line.setAttribute("stroke-width", 1);        	        
       		universe.appendChild( line );
       		start += step;
       	}		
	};
	
	/**
	 * Moves points to another position.
	 * 
 	 * @param {Object} data
	 */
	astrology.Transit.prototype.animate = function( data ){
		// TODO
	};
				
}( window.astrology = window.astrology || {}));
