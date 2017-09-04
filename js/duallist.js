
const defaultsDualList = {
	leftTitle : 'Query Result',
	rightTitle : 'Stored',
	leftSelectAllButton : '<span class="glyphicon glyphicon-check"></span> Select All',
	rightSelectAllButton : '<span class="glyphicon glyphicon-check"></span> Select All',
	leftClearButton : '<span class="glyphicon glyphicon-trash"></span> Clear',
	rightClearButton : '<span class="glyphicon glyphicon-trash"></span> Clear',
	leftMoveButton : '<span class="glyphicon glyphicon-chevron-left"></span>',
	rightMoveButton : '<span class="glyphicon glyphicon-chevron-right"></span>',
	upMoveButton : '<span class="glyphicon glyphicon-chevron-up"></span>',
	downMoveButton : '<span class="glyphicon glyphicon-chevron-down"></span>',
	hasClearOption : true,
	isOptionsUnique : false
};

function DualList( element, args ){
	this.id = element;
	this.container = document.getElementById( element );
	this.settings = $.extend( {}, defaultsDualList, args );
	if( this.settings.isOptionsUnique ){
		this.leftOptions = {};
		this.rightOptions = {};
	} else {
		this.leftOptions = [];
		this.rightOptions = [];
	}
	this.titles = [];
	this.init();
}

function bindEventsDualList( duallist ) {
	duallist.elements.leftMoveButton.onclick = function(){ removeDuallist( duallist ); }
	duallist.elements.rightMoveButton.onclick = function(){ moveDualList( duallist ); }
	duallist.elements.upMoveButton.onclick = function(){ removeDuallist( duallist ); }
	duallist.elements.downMoveButton.onclick = function(){ moveDualList( duallist ); }
	duallist.elements.leftSelectAllButton.onclick = function(){ selectAllLeftDuallist( duallist ); }
	duallist.elements.rightSelectAllButton.onclick = function(){ selectAllRightDuallist( duallist ); }
	duallist.elements.leftClearButton.onclick = function(){ clearAllLeftDuallist( duallist ); }
	duallist.elements.rightClearButton.onclick = function(){ clearAllRightDuallist( duallist ) }
}

function moveDualList( duallist ){
	var list = duallist.elements.leftTBody.getElementsByClassName( 'optionSelectedDualList' );
	var listIndex = [];
	for( var x = 0; x < list.length; x++ ){
		listIndex.push( list[ x ].getAttribute( 'data-idx' ) );
	}
	duallist.moveLeftOptions( listIndex );
}

function removeDuallist( duallist ) {
	var list = duallist.elements.rightTBody.getElementsByClassName( 'optionSelectedDualList' );
	var listIndex = [];
	for( var x = 0; x < list.length; x++ ){
		listIndex.push( list[ x ].getAttribute( 'data-idx' ) );
	}
	duallist.moveRightOptions( listIndex );
}

function selectAllLeftDuallist( duallist ) {
	var list = duallist.elements.leftTBody.getElementsByTagName( 'tr' );
	for( var x = 0; x < list.length; x++ ){
		list[ x ].className = 'optionSelectedDualList';
	}
}

function selectAllRightDuallist( duallist ) {
	var list = duallist.elements.rightTBody.getElementsByTagName( 'tr' );
	for( var x = 0; x < list.length; x++ ){
		list[ x ].className = 'optionSelectedDualList';
	}
}

function clearAllLeftDuallist( duallist ) {
	if( duallist.settings.isOptionsUnique ){
		duallist.leftOptions = {};
	} else {
		duallist.leftOptions = [];
	}
	duallist.elements.leftTBody.innerHTML = '';
}

function clearAllRightDuallist( duallist ) {
	selectAllRightDuallist( duallist );
	removeDuallist( duallist );
}

DualList.prototype = {
	init : function() {
		this.container.innerHTML = 
			'<div class="col-sm-5 duallist-block">\
				<div class="panel panel-primary">\
					<div class="panel-heading">\
						<h4 id="' + this.id + '_leftTitle" class="panel-title"></h4>\
					</div>\
					<div class="table-responsive duallist">\
						<table class="table table-bordered table-condensed table-hover">\
							<thead id="' + this.id + '_leftTHead" ></thead>\
							<tbody id="' + this.id + '_leftTBody" ></tbody>\
						</table>\
					</div>\
					<div class="panel-footer">\
						<button id="' + this.id + '_leftSelectAllButton" class="btn btn-primary btn-sm"></button>\
						<button id="' + this.id + '_leftClearButton" class="btn btn-primary btn-sm"></button>\
					</div>\
				</div>\
			</div>\
			\
			<div class="col-sm-1 text-center duallist-arrows">\
				<div class="hidden-xs">\
					<button id="' + this.id + '_leftMoveButton" class="btn btn-default btn-sm move-left"></button>\
					<button id="' + this.id + '_rightMoveButton" class="btn btn-default btn-sm move-right"></button>\
				</div>\
				<div class="hidden-sm hidden-md hidden-lg">\
					<button id="' + this.id + '_upMoveButton" class="btn btn-default btn-sm move-up"></button>\
					<button id="' + this.id + '_downMoveButton" class="btn btn-default btn-sm move-down"></button>\
				</div>\
			</div>\
			\
			<div class="col-sm-5 duallist-block">\
				<div class="panel panel-primary">\
					<div class="panel-heading">\
						<h4 id="' + this.id + '_rightTitle" class="panel-title"></h4>\
					</div>\
					<div class="table-responsive duallist">\
						<table class="table table-bordered table-condensed table-hover">\
							<thead id="' + this.id + '_rightTHead" ></thead>\
							<tbody id="' + this.id + '_rightTBody" ></tbody>\
						</table>\
					</div>\
					<div class="panel-footer">\
						<button id="' + this.id + '_rightSelectAllButton" class="btn btn-primary btn-sm"></button>\
						<button id="' + this.id + '_rightClearButton" class="btn btn-primary btn-sm"></button>\
					</div>\
				</div>\
			</div>';
		
		this.elements = {
				leftTitle : document.getElementById( this.id + '_leftTitle' ),
				rightTitle : document.getElementById( this.id + '_rightTitle' ),
				leftTHead : document.getElementById( this.id + '_leftTHead' ),
				rightTHead : document.getElementById( this.id + '_rightTHead' ),
				leftTBody : document.getElementById( this.id + '_leftTBody' ),
				rightTBody : document.getElementById( this.id + '_rightTBody' ),
				leftSelectAllButton : document.getElementById( this.id + '_leftSelectAllButton' ),
				rightSelectAllButton : document.getElementById( this.id + '_rightSelectAllButton' ),
				leftClearButton : document.getElementById( this.id + '_leftClearButton' ),
				rightClearButton : document.getElementById( this.id + '_rightClearButton' ),
				leftMoveButton : document.getElementById( this.id + '_leftMoveButton' ),
				rightMoveButton : document.getElementById( this.id + '_rightMoveButton' ),
				upMoveButton : document.getElementById( this.id + '_upMoveButton' ),
				downMoveButton : document.getElementById( this.id + '_downMoveButton' )
		}
		
		this.setLeftTitle( this.settings.leftTitle );
		this.setRightTitle( this.settings.rightTitle );
		this.setLeftSelectAllButton( this.settings.leftSelectAllButton );
		this.setRightSelectAllButton( this.settings.rightSelectAllButton );
		this.setLeftClearButton( this.settings.leftClearButton );
		if( this.settings.hasClearOption ){
			this.setRightClearButton( this.settings.rightClearButton );
		}
		this.setLeftMoveButton( this.settings.leftMoveButton );
		this.setRightMoveButton( this.settings.rightMoveButton );
		this.setUpMoveButton( this.settings.upMoveButton );
		this.setDownMoveButton( this.settings.downMoveButton );
		
		bindEventsDualList( this );
	},
	setLeftTitle : function( text ) {
		this.elements.leftTitle.innerHTML = text;
	},
	setRightTitle : function( text ) {
		this.elements.rightTitle.innerHTML = text;
	},
	setLeftSelectAllButton : function( text ) {
		this.elements.leftSelectAllButton.innerHTML = text;
	},
	setRightSelectAllButton : function( text ) {
		this.elements.rightSelectAllButton.innerHTML = text;
	},
	setLeftClearButton : function( text ) {
		this.elements.leftClearButton.innerHTML = text;
	},
	setRightClearButton : function( text ) {
		this.elements.rightClearButton.innerHTML = text;
	},
	setLeftMoveButton : function( text ) {
		this.elements.leftMoveButton.innerHTML = text;
	},
	setRightMoveButton : function( text ) {
		this.elements.rightMoveButton.innerHTML = text;
	},
	setUpMoveButton : function( text ) {
		this.elements.upMoveButton.innerHTML = text;
	},
	setDownMoveButton : function( text ) {
		this.elements.downMoveButton.innerHTML = text;
	},
	moveLeftOptions : function( list ) {
		if( this.settings.isOptionsUnique ){
			var options = {};
			for( var x = 0; x < list.length; x++ ){
				var element = this.leftOptions[ list[ x ] ];
				if( element ){
					options[ list[ x ] ] = element;
					this.leftOptions[ list[ x ] ] = null;
				}
			}
			this.addRightOptions( options );
		} else {
			var options = [];
			for( var x = 0; x < list.length; x++ ){
				var element = this.leftOptions[ list[ x ] ];
				if( element ){
					options.push( element );
					this.leftOptions[ list[ x ] ] = null;
					//this.leftOptions.splice( list[ x ], 1 );
				}
			}
			list.sort(function(a, b){return b-a});
			for( var x = 0; x < list.length; x++ ){
				this.leftOptions.splice( list[ x ], 1 );
			}
			this.addRightOptions( options );
		}
		this.repaintLeftOptions();
	},
	moveRightOptions : function( list ) {
		if( this.settings.isOptionsUnique ){
			var options = {};
			for( var x = 0; x < list.length; x++ ){
				var element = this.rightOptions[ list[ x ] ];
				if( element ){
					options[ list[ x ] ] = element;
					this.rightOptions[ list[ x ] ] = null;
				}
				this.addLeftOptions( options );
			}
		} else {
			var options = [];
			for( var x = 0; x < list.length; x++ ){
				var element = this.rightOptions[ list[ x ] ];
				if( element ){
					options.push( element );
					this.rightOptions[ list[ x ] ] == null;
					//this.rightOptions.splice( list[ x ], 1 );
				}
			}
			list.sort(function(a, b){return b-a});
			for( var x = 0; x < list.length; x++ ){
				this.rightOptions.splice( list[ x ], 1 );
			}
			this.addLeftOptions( options );
		}
		this.repaintRightOptions();
	},
	addLeftOptions : function( list ) {
		if( this.settings.isOptionsUnique ){
			for( key in list ){
				this.leftOptions[ key ] = list[ key ];
			}
		} else {
			for( var x = 0; x < list.length; x++ ){
				this.leftOptions.push( list[ x ] );
			}
		}
		this.repaintLeftOptions();
	},
	addRightOptions : function( list ) {
		if( this.settings.isOptionsUnique ){
			for( key in list ){
				this.rightOptions[ key ] = list[ key ];
			}
		} else {
			for( var x = 0; x < list.length; x++ ){
				this.rightOptions.push( list[ x ] );
			}
		}
		this.repaintRightOptions();
	},
	repaintLeftOptions : function() {
		this.elements.leftTBody.innerHTML = '';
		if( this.settings.isOptionsUnique ){
			for( key in this.leftOptions ){
				var list = this.leftOptions[ key ];
				if( list == null ){
					continue;
				}
				var tr = document.createElement( 'tr' );
				tr.dataset.selected = 'f';
				tr.dataset.idx = key;
				tr.onclick = function( event ) {
					if( this.dataset.selected == 't' ){
						this.className = '';
						this.dataset.selected = 'f';
					} else {
						this.className = 'optionSelectedDualList';
						this.dataset.selected = 't';
					}
				}
				for( var x = 0; x < list.length; x++ ){
					this.addTd( tr, list[ x ] );
				}
				this.elements.leftTBody.appendChild( tr );
			}
		} else {
			//console.log('LEFT OPTIONS');
			//console.log(this.leftOptions);
			for( var y = 0; y < this.leftOptions.length; y++ ){
				var list = this.leftOptions[ y ];
				if( list == null ){
					continue;
				}
				var tr = document.createElement( 'tr' );
				tr.dataset.selected = 'f';
				tr.dataset.idx = y;
				tr.onclick = function( event ) {
					if( this.dataset.selected == 't' ){
						this.className = '';
						this.dataset.selected = 'f';
					} else {
						this.className = 'optionSelectedDualList';
						this.dataset.selected = 't';
					}
				}
				for( var x = 0; x < list.length; x++ ){
					this.addTd( tr, list[ x ] );
				}
				this.elements.leftTBody.appendChild( tr );
			}
		}
	},
	repaintRightOptions : function() {
		this.elements.rightTBody.innerHTML = '';
		if( this.settings.isOptionsUnique ){
			for( key in this.rightOptions ){
				var list = this.rightOptions[ key ];
				if( list == null ){
					continue;
				}
				var tr = document.createElement( 'tr' );
				tr.dataset.selected = 'f';
				tr.dataset.idx = key;
				tr.onclick = function( event ) {
					if( this.dataset.selected == 't' ){
						this.className = '';
						this.dataset.selected = 'f';
					} else {
						this.className = 'optionSelectedDualList';
						this.dataset.selected = 't';
					}
				}
				for( var x = 0; x < list.length; x++ ){
					this.addTd( tr, list[ x ] );
				}
				this.elements.rightTBody.appendChild( tr );
			}
		} else {
			//console.log('RIGHT OPTIONS');
			//console.log(this.rightOptions);
			for( var y = 0; y < this.rightOptions.length; y++ ){
				var list = this.rightOptions[ y ];
				if( list == null ){
					continue;
				}
				var tr = document.createElement( 'tr' );
				tr.dataset.selected = 'f';
				tr.dataset.idx = y;
				tr.onclick = function( event ) {
					if( this.dataset.selected == 't' ){
						this.className = '';
						this.dataset.selected = 'f';
					} else {
						this.className = 'optionSelectedDualList';
						this.dataset.selected = 't';
					}
				}
				for( var x = 0; x < list.length; x++ ){
					this.addTd( tr, list[ x ] );
				}
				this.elements.rightTBody.appendChild( tr );
			}
		}
	},
	repaint : function() {
		this.repaintLeftOptions();
		this.repaintRightOptions();
	},
	setLeftTitles : function( titles ) {
		this.elements.leftTHead.innerHTML = '';
		var tr = document.createElement( 'tr' );
		for( var x = 0; x < titles.length; x++ ){
			this.addTh( tr, titles[ x ] );
		}
		this.elements.leftTHead.appendChild( tr );
	},
	setRightTitles : function( titles ) {
		this.elements.rightTHead.innerHTML = '';
		var tr = document.createElement( 'tr' );
		for( var x = 0; x < titles.length; x++ ){
			this.addTh( tr, titles[ x ] );
		}
		this.elements.rightTHead.appendChild( tr );
	},
	setTitles : function( titles ) {
		this.setLeftTitles( titles );
		this.setRightTitles( titles );
	},
	addTh : function( tr, data ) {
		var th = document.createElement( 'th' );
		th.innerHTML = data;
		tr.appendChild( th );
	},
	addTd : function( tr, data ) {
		var td = document.createElement( 'td' );
		td.innerHTML = data;
		tr.appendChild( td );
	},
	getOptions : function() {
		return this.rightOptions;
	}
}
