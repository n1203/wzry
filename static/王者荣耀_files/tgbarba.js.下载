var TGBarba = (function () {
  var globalConfig = {};
  var globalTransition = {
    from: {},
    to: {}
  }

  var util = {
    getScript: function (source, callback) {
      var script = document.createElement('script');
      var prior = document.getElementsByTagName('script')[0];
      script.async = 1;

      script.onload = script.onreadystatechange = function (_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
          script.onload = script.onreadystatechange = null;
          script = undefined;

          if (!isAbort) {
            if (callback) callback();
          }
        }
      };

      script.src = source;
      prior.parentNode.insertBefore(script, prior);
    }
  }

  var init = function (_config) {
    globalConfig = _config;

    if (typeof $ != 'undefined' && typeof Zepto != 'undefined') {
      loadBarba();
    } else {
      util.getScript('https://ossweb-img.qq.com/images/js/zepto/zepto.min.js', function () {
        loadBarba();
      });
    }
  }

  var loadBarba = function () {
    util.getScript('https://game.gtimg.cn/images/yxzj/m/m201706/utf8/barba.min.js', function () {
      initBarba();
    });
  }

  var initBarba = function () {
    for (var i in globalConfig) {
      var item = globalConfig[i];
      var itemConf = {
        namespace: item.namespace || '',
        onEnter: item.onEnter || function () {},
        onEnterCompleted: item.onEnterCompleted || function () {},
        onLeave: item.onLeave || function () {},
        onLeaveCompleted: item.onLeaveCompleted || function () {},
        fadeFrom: item.fadeFrom || {},
        fadeTo: item.fadeTo || {}
      }
      globalTransition.from = itemConf.fadeFrom;
      globalTransition.to = itemConf.fadeTo;

      (function (i) {
        var Page = Barba.BaseView.extend({
          namespace: i.namespace,
          onEnter: function () {
            i.onEnter();
          },
          onEnterCompleted: function () {
            i.onEnterCompleted();
          },
          onLeave: function () {
            i.onLeave();
          },
          onLeaveCompleted: function () {
            i.onLeaveCompleted();
          }
        });

        Page.init();
      })(itemConf)
    }

    initTransition();
    Barba.Pjax.start();
  }

  var initTransition = function () {
    var FadeTransition = Barba.BaseTransition.extend({
      start: function () {
        Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
      },
      fadeOut: function () {

      },
      fadeIn: function () {
        var _this = this;
        var $el = $(this.newContainer);

        $(this.oldContainer).hide();

        $el.css({
          visibility: 'hidden',
          transition: 'none'
        });

        $el.css({
          'margin-top': '300px'
        });

        _this.done();

        var fadeTimer = setTimeout(function () {
          $el.css({
            visibility: 'visible',
            transition: 'all .3s ease'
          });
          $el.css(globalTransition.to);
          clearTimeout(fadeTimer);
        }, 50);
      }
    });

    Barba.Pjax.getTransition = function () {
      return FadeTransition;
    };

    Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
    Barba.Pjax.preventCheck = function (evt, element) {
      var regRuleUrl = globalConfig.index.barbaUrl || [];
      var regStr = '';

      for (var i = 0; i < regRuleUrl.length; i++) {
        regStr += regRuleUrl[i].replace('/', '\\/') + '|'
      }
      regStr = regStr.substring(0, regStr.length - 1);

      var regRule = new RegExp(regStr);

      if (!Barba.Pjax.originalPreventCheck(evt, element)) {
        return false;
      }

      // ignore pdf links
      if (!regRule.test(element.href.toLowerCase())) {
        return false;
      }

      // additional (besides .no-barba) ignore links with these classes
      // ab-item is for wp admin toolbar links
      var ignoreClasses = ['ab-item', 'another-class-here'];
      for (var i = 0; i < ignoreClasses.length; i++) {
        if (element.classList.contains(ignoreClasses[i])) {
          return false;
        }
      }

      return true;
    };

  }

  return {
    init: init
  }
})()