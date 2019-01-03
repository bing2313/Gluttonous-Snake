(function() {
    var position = 'absolute';
    var element = [];
    // 创建构造函数
    function Food(options) {
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.color = options.color || 'cyan';
    }

    // 给构造函数Food添加原型成员
    Food.prototype.render = function(map) {
        remove();

        this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
        this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;
        // 此方法是让食物显示
        // 创建食物
        var div = document.createElement('div');
        map.appendChild(div);
        element.push(div);

        div.style.position = position;
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.backgroundColor = this.color;
    }

    // 删除数组中的元素，同时删除页面上的食物
    function remove() {
        for (var i = element.length - 1; i >= 0; i--) {
            // 删除div
            element[i].parentNode.removeChild(element[i]);
            // 删除数组中的元素
            // 第一个参数从哪个元素开始删除，第二个参数，删除几个元素
            element.splice(i, 1);
        }
    }
    window.Food = Food;
})()