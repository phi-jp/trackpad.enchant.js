/*
 *    trackpad クラス
 */
(function(){
    
    var TRACK_PAD_WIDTH  = 120;
    var TRACK_PAD_HEIGHT = 80;
    var TRACK_PAD_COLOR  = "rgba(200, 200, 200, 0.5)";
    var PADDING_BOTTOM   = 10;
    
    enchant.Trackpad = enchant.Class.create(enchant.Entity, {
        
        initialize: function() {
            enchant.Entity.call(this);
            
            this.width  = TRACK_PAD_WIDTH;
            this.height = TRACK_PAD_HEIGHT;
            this.backgroundColor = TRACK_PAD_COLOR;
            
            // 位置調整
            var game = enchant.Game.instance;
            this.x = (game.width - this.width)/2;
            this.y = (game.height - this.height) - PADDING_BOTTOM;
            
            // 見た目調整
            var element = this._element;
            var style   = element.style;
            
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

// test
/*
window.onload = function() {
    var game = new enchant.Game();
    
    game.onload = function() {
        var scene = game.rootScene;
        scene.backgroundColor = "black";
        
        var trackpad = new enchant.Trackpad();
        scene.addChild(trackpad);
        
        var entity = new enchant.Entity();
        entity.width = 10;
        entity.height= 10;
        entity.backgroundColor = "red";
        scene.addChild(entity);
        
        trackpad.ontouchmove = function(e) {
            entity.x = e.trackX;
            entity.y = e.trackY;
        };
    };
    
    game.start();
};
*/




