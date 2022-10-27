function Index() {
    this.score = 0;
    this.lastScore = 0;
    this.speed = 2;
    this.color = ['#cc66cc','#99ff66','#66ffcc','#FF7F24'];
    this.dom = {
        title : $('.title'),
        main : $('.main'),
        author : $('.Author')
    };
    this.bindEvent();
    this.timer1 = {};
    this.timer2 = {};
}
/**
 * 绑定事件
 * @function name: bindEvent
 * @param  none
 * @return none
 */

Index.prototype.bindEvent =  function () {
    var self = this;
    var topValue = -150;
    self.dom.title.on('click',function () {
        self.dom.title.css('display','none');
        self.dom.author.hide();
        self.creatBlock(0);
        self.timer1 = setInterval(function () {
            var main = self.dom.main;
            topValue += self.speed;
            if(main.children().length >= 6){
                for(var i = 0; i < 4; i++){
                    if(main.children().eq(5).children().eq(i).attr('class') == 'target'){
                        alert('Game Over! Your Score: ' + self.score);
                        clearInterval(self.timer1);
                        clearInterval(self.timer2);
                        return;
                    }
                }
                main.children().eq(5).remove();
            }
            if(parseInt(main.css('top')) > 0){
                main.css('top','-150px');
                topValue = -150;
                self.creatBlock(1);
                return;
            }
            main.css({
                'top' : topValue + 'px',
            })
        },10)
        self.timer2 = setInterval(function () {
            var DisScore = self.score - self.lastScore;
            if(DisScore == 10){
                self.speed++;
                self.lastScore = self.score;
                DisScore = 0;
            }

        } ,200)
    });
};


Index.prototype.creatBlock = function (IO) {
    var self = this;
    var main = self.dom.main;
    var row = $('<div class = "row"></div>');
    if(IO == 0){
        main.append(row);
        main.css('display','block');
    }else if(IO == 1){
        main.prepend(row);
    }
    for(var i = 0; i < 4; i++){
        var column = $('<div class = "col"></div>');
        row.append(column);
        column.on('click',function () {
            $this = $(this);
            if($this.attr('class') == 'target'){
                $this.css('backgroundColor','#eee').attr('class','col');
                self.score++;
                return;
            }
            alert('Game Over! Your Score: ' + self.score);
            clearInterval(self.timer1);
            clearInterval(self.timer2);
        })
    }
    var index = parseInt(Math.random() * 4);
    $(row.children()[index]).css('backgroundColor',self.color[index]);
    $(row.children()[index]).attr('class', 'target');
}

new Index();