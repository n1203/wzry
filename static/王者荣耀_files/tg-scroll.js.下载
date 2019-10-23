;
(function () {
	var targetNum = 0,
		activateNum = 0;

	var Scroller = function () {
		var initCount = 0;

		var scrollTasks = [],
			defaults = {
				once: true,
				sensitive: false,
				topOffset: 0,
				bottomOffset: 0,
				activeClass: '',
				scrollIn: null,
				scrollOut: null,
				scrolling: null,
				scrollFunc: []
			},
			that = this;

		//初始化，监听window scroll事件
		function init() {
			var $window = $(window),
				lastScrollTop = $window.scrollTop(),
				scrollOffset = 0;

			$(window).on('scroll', function () {
				scrollOffset = $window.scrollTop() - lastScrollTop;
				lastScrollTop = $window.scrollTop();

				var scrollUrl = sessionStorage.getItem('scrollUrl');
				if( scrollUrl == window.location.href ) {
					fireTasks(scrollOffset);
				}
			});
		}

		function fireTasks(scrollOffset) {
			var task,
				inScreen,
				sizeInfo,
				actived;

			if( scrollTasks.length == 0 ) {
				var elStr = sessionStorage.getItem('scrollObj');

				if( elStr == '' ) {
					return false;
				}
				elStr = elStr.substring(0,elStr.length-1);
				var idArr = elStr.split(',');
				
				var _opt = JSON.parse(sessionStorage.getItem('scrollOpt'));
				var scrollerTmp = new Scroller();
				targetNum = idArr.length;
				initCount = 0;


				$.each(idArr, function(i, val) {
					var $el = $('#' + val);

					if (_opt === false) {
						scrollerTmp.removeTask($el);
					} else {
						scrollerTmp.addTask($el, _opt);
					}
				});
			}
			
			for (var i = scrollTasks.length - 1; i >= 0; i--) {
				task = scrollTasks[i];
				sizeInfo = getSizeInfo(task.elem, task.options.topOffset, task.options.bottomOffset, task.options.sensitive);
				if(sizeInfo == undefined) return;

				if (sizeInfo.scrollIn) {
					actived = true;
					if (task.actived !== actived) {
						var _foo = task.options.scrollFunc[task.elem.id];
						if (_foo) {
							task.options.scrollFunc[task.elem.id]();
						}
						$(task.elem).addClass(task.options.activeClass)
						task.options.scrollIn && task.options.scrollIn.call(task.elem);
						if (task.options.once) {
							that.removeTask(task.elem, task.id);
						}
					}
					task.options.scrolling && task.options.scrolling.call(task.elem, scrollOffset);
					task.actived = actived;

				} else if (sizeInfo.scrollOut) {
					actived = false;
					if (task.actived !== actived) {
						task.actived = actived;
						task.options.scrollOut && task.options.scrollOut.call(task.elem);
						$(task.elem).removeClass(task.options.activeClass);
					}
				}
				if (task.actived) {
					task.options.scrolling && task.options.scrolling.call(task.elem, scrollOffset);
				}
			}
		}


		function getSizeInfo(elem, topOffset, bottomOffset, sensitive) {
			if($(elem).offset() == null) return;

			var preSize = $(elem).data('mzscrollpresize') || 1, // 这次滚动发生前元素处于屏幕上方还是下方，默认下方
				elemHeight = elem.offsetHeight,
				elemOfsTop = $(elem).offset().top,
				windowScrollTop = $(window).scrollTop(),
				windowHeight = window.innerHeight || document.documentElement.offsetHeight, // 兼容 IE
				sizeInfo = { /*scrollOut, scrollIn*/ };

			// console.log((elemOfsTop < windowScrollTop + windowHeight + topOffset));
			//console.log(elemOfsTop, windowScrollTop + windowHeight, preSize);
			//判断scrollIn时机，注意scrollIn，scrollOut时机并不是互斥的
			if ((elemOfsTop < windowScrollTop + windowHeight + topOffset && preSize == 1) ||
				(elemOfsTop + elemHeight > windowScrollTop - bottomOffset) && preSize == -1) {
				sizeInfo.scrollIn = true;
				sizeInfo.scrollOut = false;
			} else {
				sizeInfo.scrollIn = false;
				sizeInfo.scrollOut = true;
			}


			//判断scrollOut时机
			if (elemOfsTop > windowScrollTop + windowHeight + (bottomOffset < 0 && !sensitive ? 0 : bottomOffset)) {
				preSize = 1;
				$(elem).data('mzscrollpresize', 1);
			} else if (elemOfsTop + elemHeight < windowScrollTop - (topOffset < 0 && !sensitive ? 0 : topOffset)) {
				$(elem).data('mzscrollpresize', -1);
				preSize = -1;
			} else {
				preSize = 0;
			}

			if (!sensitive)
				sizeInfo.scrollOut = !!preSize;

			return sizeInfo;
		}

		this.addTask = function (elem, taskOptions) {
			var taskOptions = $.extend({}, defaults, taskOptions),
				elem = elem;

			scrollTasks.push({
				'id': (new Date).getTime() + Math.random() * 10000000,
				'elem': elem,
				'actived': false,
				'options': taskOptions
			});

			var scrollIds = sessionStorage.getItem('scrollObj') || '';

			if(typeof elem[0] == 'undefined') {
				var newId = elem.id;
			}else {
				var newId = elem[0].id;
			}

			if( scrollIds.indexOf(newId) < 0 && newId != 'undefined' ) {
				scrollIds += newId + ',';
				sessionStorage.setItem('scrollObj', scrollIds);
			}

			if (typeof taskOptions.setUp === 'function')
				taskOptions.setUp.call(elem);

			initCount++;
			if (initCount == targetNum) {
				fireTasks(0);
			}

		}

		this.removeTask = function (elem, id) {
			for (var i = scrollTasks.length - 1; i >= 0; i--) {
				if (scrollTasks[i].elem === elem && (!id || scrollTasks[i].id === id)) {
					scrollTasks.splice(i, 1);

					var scrollIds = sessionStorage.getItem('scrollObj');
					var currId = elem.id || elem[0].id;
					scrollIds = scrollIds.replace(currId + ',', '');
					if(scrollIds != 'undefined') {
						sessionStorage.setItem('scrollObj', scrollIds);
					}
				}
			};
		}
		init();
	}

	/*
	 * options 配置 如果传false则删除此元素监听任务
	 *
	 * once {boolean} 是否执行一次 default false
	 * sensitive 默认为 false 元素完全离开屏幕才触发 scrollOut，设置为 true 时元素只要离开激活区域就触发 scrollOut 
	 * topOffset {int} 元素顶部到窗口底部的距离多少算进入区域 default 0
	 * bottomOffset {int} 元素底部到窗口顶部部的距离多少算进入区域 default 0
	 * setUp {function} 如需要做一些准备工作可以写在这里
	 * activeClass {string} 元素进入区域要添加的类
	 * scrollIn {function} 元素进入区域的回调
	 * scrollOut {function} 元素离开区域的回调
	 * scrolling {function(scrolloffset)} 元素处于激活状态时处理滚动的函数
	 * scrollFunc {array} 元素进入区域执行
	 */
	$.fn.addScroll = (function () {
		var scroller = new Scroller();

		return function (options) {

			targetNum = this.length;

			sessionStorage.setItem('scrollOpt', JSON.stringify(options));
			sessionStorage.setItem('scrollUrl', window.location.href);

			this.each(function () {
				if (options === false) {
					scroller.removeTask(this);
				} else {
					scroller.addTask(this, options);
				}
			});
			return this;
		}
	})();

})();