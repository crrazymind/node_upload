$(document).ready(function() {
    runMe();
    $('.submit-btn1').click(function() {
        var data = $('.inp1').parents('form')[0];
        console.log(data);
        console.log(reader);
        data = reader.result;
        //var data = 'data=qweqweqwe&resp=ewrwerwe';
        var url = '/upload';
        var dataType = 'json';
        var success = function sucessCallback(res) {
            console.log(res);
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            contentType :"multipart/form-data",
            success: success,
            dataType: dataType
        });
        return false;
    });
});

function runMe(){
    var _inp = $(".inp1");
    var _form = $(".hold");
    var _img;
    var canv = document.getElementById("canv1");
    var ctx = canv.getContext("2d");
    $(canv).width(300);
    $(canv).height(300);
    _img = 'image/01.jpg';
    var img = new Image();   // Create new img element
    img.src = _img;
    img.onload = function(){
        console.log('load', img);
        ctx.drawImage(img, 0, 0);
    }

    _form.change(function(){
        _img = _inp.val();
        if(!document.all){
            var file =_inp[0].files.item(0);
        }else{
            var file =_inp[0].value;
        }

        reader = new FileReader();
        reader.onload = function(e) {
            $('<img>').attr('src', e.target.result).appendTo('body');
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);

      /* var img = new Image();
         img.src = _img;
        img.onload = function(){
            console.log(img);
            ctx.drawImage(img, 0, 0);
        }*/
       // ctx.drawImage(img, 0, 0);
        console.log(_img);
    });


}

function initHover(){
	var name = ['gray', 'green', 'orange', 'lightblue', 'blue'];
	var _b = $('.beaker');
	var _ttl = _b.find('.ttl');
	$(name).each(function(_i){
		var _el = _b.find('.' + name[_i]);
		var _title = _el.find('.ttl');
		_title.hide();
		_el.mouseenter(function(){
			_ttl.fadeOut();
			_title.fadeIn();
		});
		_title.click(function(){
			bubbleFader.runAnimate();
			return false;
		})
	});
	/*$('.beaker .gray, .beaker .green, .beaker .orange, .beaker .lightblue, .beaker .blue').each(function(){
		var _title = $(this).find('span');
		_title.hide();
	});*/
}
var BubbleFader = (function(_options){
	var BubbleFader = function(_options){
	// defaults options
		var _options = jQuery.extend({
			duration: 200,
			autoSlide: 5000
		}, _options);

		var _Me = this;
		var _hold = _options.box;
		var _speed = _options.duration;
		var _timer = _options.timer;
		var _box = _hold.find('a');
		_box.css('visibility', 'visible');
		_box.css('opacity', 0);
		var _time;
		var _f = true;
		var _mas = [];
		var _rnd = 0;
		_box.each(function (_i) {
			_mas.push(_i);
		});

		var _length = _mas.length;

		this.RunFn = function(){
			console.log(_box.length);
			_time = setTimeout(function () {
				if (_length <= 0) {
					_f = false;
				}
				if (_f == false) clearInterval(_time);
				//var _rnd = Math.floor(Math.random() * _length);
				_rnd +=1;
				animateOne(_rnd);
				if (_f != false) {
					_Me.RunFn();
				}
			}, (_timer / 15000) / (1 / (_box.length * _box.length) / ((_length + 1) * (_length + 1))));
		}

		function animateOne(_rnd) {
			//var _this = _box.eq(_mas[_rnd] * 1);
			var _this = _box.eq(_rnd);
			_mas.splice(_rnd, 1);
			_length = _mas.length;
			_this.addClass('activated').animate({
				opacity: 1
			}, {
				queue: false,
				duration: _speed,
				complete: function () {}
			});
		}

		return {
			runAnimate : function(){
				_mas = [];
				_box.each(function (_i) {
					_mas.push(_i);
				});
				_length = _mas.length;
				_f = true;
				_box.css('visibility', 'visible');
				_box.css('opacity', 0);
				_Me.RunFn();
			}
		};
	};
	return function (_options) {
		return new BubbleFader(_options);
	};
})();
