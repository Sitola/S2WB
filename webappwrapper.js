// SAGE2 is available for use under the SAGE2 Software License
//
// University of Illinois at Chicago's Electronic Visualization Laboratory (EVL)
// and University of Hawai'i at Manoa's Laboratory for Advanced Visualization and
// Applications (LAVA)
//
// See full text, terms and conditions in the LICENSE.txt included file
//
// Copyright (c) 2014


var webappwrapper = SAGE2_App.extend( {
	
	init: function(data) {
		function do_zoom(scale) {
			this.zoom = scale;

		}


		// call super-class 'init'
		this.SAGE2Init("iframe", data);

		// application specific 'init'
		this.element.frameborder = 0;
		var t = this;
			t.zoom = 1.0
		
		this.element.onload = function() {
			//t.element.contentDocument.getElementsByTagName("body")[0].style.transformOrigin = "top center";
			//t.element.contentDocument.getElementsByTagName("body")[0].style.transform = "scale(" + t.zoom + ")";
		}
		
		//this.element.setAttribute("sandbox","");
		this.element.src = 'http://www.sitola.cz';
		this.element.style.border = "none";
		this.element.style.background = "#fff";

		this.initializeWidgets();
	},
	
	initializeWidgets: function() {
		this.controls.addButton({type: "rewind", position: 1, identifier: "Back"});
		this.controls.addButton({type: "fastforward", position: 2, identifier: "Forward"});
		
		this.controls.addButton({type: "prev", position: 6, identifier: "Left"});
		this.controls.addButton({type: "next", position: 7, identifier: "Right"});
		this.controls.addButton({type: "up-arrow", position: 8, identifier: "Up"});
		this.controls.addButton({type: "down-arrow", position: 9, identifier: "Down"});
		
		this.controls.addButton({type: "zoom-in", position: 10, identifier: "ZoomIn"});
		this.controls.addButton({type: "zoom-out", position: 11, identifier: "ZoomOut"});
		this.controls.addButton({type: "loop", position: 4, identifier: "Reload"});
		
		this.controls.addTextInput({value: "", label: "URL", identifier: "URL"});

		this.controls.finishedAddingControls();
		
	},

	load: function(state, date) {
	},
	
	draw: function(date) {
	},
	
	resize: function(date) {
		this.refresh(date);
	},
	
	event: function(eventType, position, user_id, data, date) {

		if (eventType === "pointerPress" && (data.button === "left") ) {

			var x= position.x + this.element.contentDocument.getElementsByTagName("body")[0].scrollLeft;
			var y= position.y + this.element.contentDocument.getElementsByTagName("body")[0].scrollTop;

			console.log(x,y);
			this.element.contentDocument.elementFromPoint(x,y).click();	
		
		}
		if (eventType === "pointerMove") {
		}
		if (eventType === "pointerRelease" && (data.button === "left") ) {
		}

		// Scroll events for zoom
		if (eventType === "pointerScroll") {
			this.scrolltop += data.wheelDelta;
			this.element.contentDocument.getElementsByTagName("body")[0].scrollTop = this.scrolltop;		
			this.scrolltop = this.element.contentDocument.getElementsByTagName("body")[0].scrollTop;
		}

		if (eventType === "widgetEvent") {
			switch (data.identifier) {
				case "Back":
					this.element.contentWindow.history.go(-1);
					break;
				case "Forward":
					this.element.contentWindow.history.go(1);
					break;
				case "Left":
					this.element.contentDocument.getElementsByTagName("body")[0].scrollLeft -= 500;
					this.scrolltop = this.element.contentDocument.getElementsByTagName("body")[0].scrollLeft;
					break;
				case "Right":
					this.element.contentDocument.getElementsByTagName("body")[0].scrollLeft += 500;
					this.scrolltop = this.element.contentDocument.getElementsByTagName("body")[0].scrollLeft;
					break;
				case "Up":
					this.element.contentDocument.getElementsByTagName("body")[0].scrollTop -= 500;
					this.scrolltop = this.element.contentDocument.getElementsByTagName("body")[0].scrollTop;
					break;
				case "Down":
					this.element.contentDocument.getElementsByTagName("body")[0].scrollTop += 500;
					this.scrolltop = this.element.contentDocument.getElementsByTagName("body")[0].scrollTop;
					break;
				case "ZoomIn":
					this.zoom += 0.1;
					this.element.contentDocument.getElementsByTagName("body")[0].style.transformOrigin = "top center";
					this.element.contentDocument.getElementsByTagName("body")[0].style.transform = "scale(" + this.zoom + ")";
					break;
				case "ZoomOut":
					this.zoom -= 0.1;
					this.element.contentDocument.getElementsByTagName("body")[0].style.transformOrigin = "top center";
					this.element.contentDocument.getElementsByTagName("body")[0].style.transform = "scale(" + this.zoom + ")";
					break;
				case "Reload":
					this.zoom = 1.2;
					this.scrolltop = 0;
					this.element.contentWindow.location.reload(true);
					break;
				case "URL":
					text = data.text;
					this.element.src = "about:blank";
					if (!text.match(/^[a-zA-Z]+:\/\//))
					{
						text = 'http://' + text;
					}
					this.element.src = text;
					break;
				default:
					console.log("No handler for:", data.identifier);
			}
		}

		if (eventType == "specialKey" && data.code == 37 && data.state == "down") {
			// left
		}
		else if (eventType == "specialKey" && data.code == 38 && data.state == "down") {
			// up
		}
		else if (eventType == "specialKey" && data.code == 39 && data.state == "down") {
			// right
		}
		else if (eventType == "specialKey" && data.code == 40 && data.state == "down") {
			// down
		}
		
		this.refresh(date);
	}
});


