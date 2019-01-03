(function() {
    var position = 'absolute';
    // 记录之前创建的蛇节
    var elements = [];

    function Snake(options) {
        // 如果没有传入参数，则默认是一个空对象
        options = options || {};
        // width和height是蛇身上小方块的大小
        this.width = options.width || 20;
        this.height = options.height || 20;
        // 蛇移动的方向
        this.direction = options.direction || 'right';
        // 蛇的身体（蛇节）第一个元素是蛇头
        this.body = [
            { x: 3, y: 2, color: 'red' },
            { x: 2, y: 2, color: 'blue' },
            { x: 1, y: 2, color: 'blue' }
        ];
    }
    Snake.prototype.render = function(map) {

        // 删除之前创建的蛇
        remove();
        // 把每一个蛇节渲染到地图上
        for (var i = 0, len = this.body.length; i < len; i++) {
            // 蛇节
            var object = this.body[i];
            //  动态创建蛇节
            var div = document.createElement('div');
            map.appendChild(div);

            // 记录蛇节
            elements.push(div);
            // 样式
            div.style.position = position;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = object.x * this.width + 'px';
            div.style.top = object.y * this.height + 'px';
            div.style.backgroundColor = object.color;
        }
    }

    // 私有的成员 外部的文件访问不到
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            // 删除div
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i, 1);
        }
    }

    // 控制蛇的移动方法
    // 思路：当蛇移动的时候，
    // 就是没个蛇节向指定的方向移动，
    // 后面蛇节移动到前面那个蛇节的位置
    Snake.prototype.move = function(food, map) {
        // 控制蛇节移动的位置（除了蛇头）
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 控制蛇头的移动
        // 由于蛇身的蛇节是根据蛇头移动的，
        // 所以此处需要判断蛇头的方向
        var head = this.body[0];
        switch (this.direction) {
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }


        // 因为食物消失和蛇身变长发生在蛇移动的时候
        // 所以将此方法设置到蛇的移动过程中
        // 当蛇头的坐标和食物的坐标重合，我们就当做蛇吃了食物，此时食物消失，蛇身变长
        // 获取蛇头的坐标，食物的坐标就是food.x    food.y
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if (headX === food.x && headY === food.y) {
            // 蛇身变长
            var last = this.body[this.body.length - 1];
            this.body.push({
                    x: last.x,
                    y: last.y,
                    color: last.color
                })
                // 食物消失
            food.render(map);
        }
    }
    window.Snake = Snake;
})()
// var map = document.getElementById('map');
// var box = new Snake();
// box.render(map);