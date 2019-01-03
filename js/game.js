// 根据自定义函数创建一个新的作用域，避免命名冲突
(function() {
    var that;

    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    // 渲染
    Game.prototype.start = function() {
        // 1.把蛇和食物对象渲染到地图上面
        this.food.render(this.map);
        this.snake.render(this.map);

        // 2.开始游戏的逻辑
        // 2.1让蛇动起来
        // 2.2让蛇遇见边界停止游戏
        runSnake();
        // 2.3通过键盘操作蛇的方向
        bindKey();
        // 2.4蛇吃到食物，蛇身变长
    }

    // 操作蛇移动的方向的方法
    function bindKey() {
        // 蛇移动的方向是由蛇头决定的
        // Snake 方法中有这个属性 direction  来决定蛇节的移动方向
        document.addEventListener('keydown', function(e) {
            // console.log(e.keyCode);
            // left - 37
            // top - 38
            // right - 39
            // bottom - 40
            switch (e.keyCode) {
                case 37:
                    that.snake.direction = 'left';
                    break;
                case 38:
                    that.snake.direction = 'top';
                    break;
                case 39:
                    that.snake.direction = 'right';
                    break;
                case 40:
                    that.snake.direction = 'bottom';
                    break;
            }
        }, false)
    }

    // 让蛇动起来的私有函数
    function runSnake() {
        // 因为需要让蛇不停的走，所以要定时器
        var timerId = setInterval(function() {
            // 获取蛇对象的属性、方法：move是移动的方法，render是渲染到底图上的方法
            that.snake.move(that.food, that.map);
            that.snake.render(that.map);
            // 给蛇设置边界
            // 一行最多可容纳多少蛇节
            var maxX = that.map.offsetWidth / that.snake.width;
            // 一列最多可容纳多少蛇节
            var maxY = that.map.offsetHeight / that.snake.height;
            // 获取蛇头的坐标,在Snake这个构造函数中，body设置了x和y就是蛇节的横纵距离
            var headX = that.snake.body[0].x;
            var headY = that.snake.body[0].y;

            // 判断
            if (headX < 0 || headX >= maxX) {
                alert('Game Over');
                clearInterval(timerId);
            }
            if (headY < 0 || headY >= maxY) {
                alert('Game Over');
                clearInterval(timerId);
            }
        }, 150)
    }
    // 想要外部访问，通过紧急对象window暴漏函数
    window.Game = Game;
})()