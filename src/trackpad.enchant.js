/**
 * phi
 */
(function(){
    
    var TRACKPAD_WIDTH  = 120;
    var TRACKPAD_HEIGHT = 80;
    var TRACKPAD_COLOR  = "rgba(200,200,200,0.5)";
    var TRACKPAD_PADDING_BOTTOM = 10;
    
    enchant.Trackpad = enchant.Class.create(enchant.Entity, {
        
        /**
         * 初期化
         */
        initialize: function(width, height) {
            enchant.Entity.call(this);
            
            this.width = width  || TRACKPAD_WIDTH;
            this.height= height || TRACKPAD_HEIGHT;
            this.backgroundColor = TRACKPAD_COLOR;
            
            // 位置調整
            var game = enchant.Game.instance;
            this.x = (game.width  - this.width) / 2;
            this.y = (game.height - this.height) - TRACKPAD_PADDING_BOTTOM;
            
            // 見た目調整
            var style = this._element.style;
            style.margin = style.padding = "0px";
            style.borderRadius = "4px";
            
            // 範囲設定
            this.minX = 0;
            this.maxX = game.width;
            this.minY = 0;
            this.maxY = game.height;
        },
        
        /**
         * イベント起動
         */
        dispatchEvent: function(e) {
            e.target = this;
            e.localX = e.x - this._offsetX;
            e.localY = e.y - this._offsetY;
            
            var rateX = e.localX/this.width;
            var rateY = e.localY/this.height;
            
            e.rateX = (rateX < 0) ? 0.0 : ((rateX > 1.0) ? 1.0 : rateX);
            e.rateY = (rateY < 0) ? 0.0 : ((rateY > 1.0) ? 1.0 : rateY);
            e.trackX = e.rateX * this.rangeX + this.minX;
            e.trackY = e.rateY * this.rangeY + this.minY;
            
            if (this["on" + e.type] != null) this["on" + e.type](e);
            var listeners = this._listeners[e.type];
            if (listeners != null) {
                listeners = listeners.slice();
                for (var i=0, len=listeners.length; i<len; ++i) {
                    listeners[i].call(this, e);
                }
            }
        },
        
        _updateRangeX: function() {
            this.rangeX = (this.maxX - this.minX);
        },
        
        _updateRangeY: function() {
            this.rangeY = (this.maxY - this.minY);
        },
        
    });
    
    Object.defineProperties(enchant.Trackpad.prototype, {
        minX: {
            get: function()  { return this._minX; },
            set: function(v) { this._minX = v; this._updateRangeX(); }
        },
        maxX: {
            get: function()  { return this._maxX; },
            set: function(v) { this._maxX = v; this._updateRangeX(); }
        },
        minY: {
            get: function()  { return this._minY; },
            set: function(v) { this._minY = v; this._updateRangeY(); }
        },
        maxY: {
            get: function()  { return this._maxY; },
            set: function(v) { this._maxY = v; this._updateRangeY(); }
        },
        
        rangeX: {
            get: function()  { return this._rangeX; },
            set: function(v) { this._rangeX = v; },
        },
        rangeY: {
            get: function()  { return this._rangeY; },
            set: function(v) { this._rangeY = v; },
        },
    });
    
})();
