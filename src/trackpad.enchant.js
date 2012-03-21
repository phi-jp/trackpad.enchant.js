/**
 * phi
 */
(function(){
    
    var TRACKPAD_WIDTH  = 120;
    var TRACKPAD_HEIGHT = 80;
    var TRACKPAD_COLOR  = "rgba(200,200,200,0.5)";
    var TRACKPAD_PADDING_BOTTOM = 10;
    
    enchant.Trackpad = enchant.Class.create(enchant.Entity, {
        
        initialize: function() {
            enchant.Entity.call(this);
            
            this.width = TRACKPAD_WIDTH;
            this.height= TRACKPAD_HEIGHT;
            this.backgroundColor = TRACKPAD_COLOR;
            
            // 位置調整
            var game = enchant.Game.instance;
            this.x = (game.width  - this.width) / 2;
            this.y = (game.height - this.height) - TRACKPAD_PADDING_BOTTOM;
            
            // 見た目調整
            var style = this._element.style;
            style.margin = style.padding = "0px";
            style.borderRadius = "4px";
        },
        
        dispatchEvent: function(e) {
            e.target = this;
            e.localX = e.x - this._offsetX;
            e.localY = e.y - this._offsetY;
            
            var game = enchant.Game.instance;
            var rateX = e.localX/this.width;
            var rateY = e.localY/this.height;
            
            rateX = (rateX < 0) ? 0.0 : ((rateX > 1.0) ? 1.0 : rateX);
            rateY = (rateY < 0) ? 0.0 : ((rateY > 1.0) ? 1.0 : rateY);
            e.trackX = rateX * game.width;
            e.trackY = rateY * game.height;
            
            if (this["on" + e.type] != null) this["on" + e.type](e);
            var listeners = this._listeners[e.type];
            if (listeners != null) {
                listeners = listeners.slice();
                for (var i=0, len=listeners.length; i<len; ++i) {
                    listeners[i].call(this, e);
                }
            }
        }
        
    });
    
})();
