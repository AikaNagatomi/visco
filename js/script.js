function TigilError() {
	return true;
}
window.onerror = TigilError;
(function () {
    "use strict";
    // DOM読み込み前処理ここから

    // 定数定義
    let BREAK_POINT_SM = 768;
    let BREAK_POINT_XL = 1200;

    let $breakpoint = BREAK_POINT_SM;
    let pcViewWidth = BREAK_POINT_XL;
    let $WindowWidth = window.innerWidth;

    let eventType = "click";

    // 画面サイズ変更の際の処理
    function respond_style() {
        let $WindowWidth_old = $WindowWidth;
        $WindowWidth = window.innerWidth;

        if ($WindowWidth >= BREAK_POINT_SM) {
        //PCのみ
            $(".l-header__btn").removeClass("nav-open");
            $(".l-header__navi").removeClass("nav-open");
        } else {
        //SPのみ
        }
    }


    function smoothscroll(config) {
        let urlHash = location.hash;
        urlHash = urlHash.replace(/([%])/g, "\\$1");
        if (urlHash) {
          $("body,html").stop().scrollTop(0);
          let target = $(urlHash);
          move_scroll(target, config);
        }

        // #で始まるアンカーをクリックした場合に処理
        $('a[href^="#"]').on(eventType, function (e) {
          let href = $(this).attr("href");
          e.preventDefault();
          let target = $(href === "#" || href === "" ? "body" : href);
          move_scroll(target, config);
        });

        $('a[href*="#"]').not('a[href^="#"]').on(eventType, function (e) {
          let href = $(this).attr("href");
          let url = location.protocol + '//' + location.hostname + location.pathname;
          let regex = new RegExp(url);
          if (regex.test(url)) {
            href = href.replace(regex, "");
            let reg = new RegExp(/^#/);
            if (reg.test(href)) {
              e.preventDefault();
              let target = $(href === "#" || href === "" ? "body" : href);
              move_scroll(target, config);
            }
          }
        });
      }

      function move_scroll(target, config) {
        // オプション
        let o = $.extend(
          {
            easing: "swing", // 動作パターン
            speed: 500, // スクロールの速度
            margintop: 0, // スクロール位置の変更
            headerfix: "", // 固定されているヘッダーのセレクタ
            adjustment: 1, // 位置調整
          },
          config
        );

        setTimeout(function () {

          let t = 0;
          if (target.offset()) {
            t = target.offset().top;
          }
          // 移動先を数値で取得
          let position = 0;
          if ($WindowWidth >= BREAK_POINT_SM) {
            o.headerfix = ".c-gnav";
          }
          if (o.headerfix !== "") {
            let navHeight = $(o.headerfix).outerHeight();
            position = t - navHeight * o.adjustment;
          } else {
            position = t - o.margintop;
          }

          $("html,body").stop().animate({ scrollTop: position }, o.speed, o.easing);
        }, 0);

        return false;
      }

      function scroll_page () {
        var footHeight, scrollHeight, scrollPosition, target = $('.c-pagetop');
        $(window).scroll(function () {
          // position
          footHeight = $('.l-footer').height() - (parseInt(target.css('height')) + parseInt(target.css('margin-top'))) -30;
          scrollHeight = $(document).height();
          scrollPosition = $(window).height() + $(window).scrollTop();
    
          //page_top
          if ( scrollHeight - scrollPosition  <= footHeight ) {
            target.css({'bottom': 'auto', 'position': 'absolute'});
          } else {
            target.css({'bottom': 0, 'position': 'fixed' });
          }
          if ($(this).scrollTop() > 100) {
            target.fadeIn();
          } else {
            target.fadeOut();
          }
        });
    
        target.click(function() {
          $('html,body').animate({scrollTop:0}, 500);
          return false;
        });
      }

      scroll_page ();


    $(window).on("resize orientationchange", respond_style);

    // DOM読み込み後処理ここから
    $(function () {
        respond_style();
        // スムーズスクロール
        smoothscroll();

        $(".l-header__btn").on(eventType, function () {
            $("body,.l-header").toggleClass("overlay");
            $(".l-header__btn").toggleClass("nav-open");
            $(".l-header__navi").toggleClass("nav-open");
        });

        //tab
        $('.c-tab__menu').find('a').on('click', function() {
          $('.c-tab__menu').find('li').removeClass('current');
          $(this).parent('li').addClass('current');
          $('.c-tab__box').hide();
          $($(this).attr('href')).show();
          return false;
        });
        

        // ホバー時にクラスを付与する関数
        function addHoverClass() {
          var body = document.querySelector("header");
          body.classList.add("hovered");
        }

        // ホバー終了時にクラスを削除する関数
        function removeHoverClass() {
          var body = document.querySelector("header");
          body.classList.remove("hovered");
        }

        // 要素にマウスが乗った際にクラスを付与
        var hoverElement = document.querySelector("header");
        hoverElement.addEventListener("mouseenter", addHoverClass);

        // 要素からマウスが離れた際にクラスを削除
        hoverElement.addEventListener("mouseleave", removeHoverClass);
        
        // スマートフォンのみでクリックイベントを追加
        if (window.innerWidth <= 1199) {
          $('.parent').on('click', function () {
            var theBox = $(this).next('.l-header__navi-list-child');
            var theSwitch = $(this);
            var result = theSwitch.attr('data-open');
            if (result == 'true') {
              theBox.slideUp();
              theSwitch.attr('data-open', 'false');
            } else {
              theBox.slideDown();
              theSwitch.attr('data-open', 'true');
            }
          });
        }

        // クリックで処理開始
        document.querySelector('.l-header').addEventListener('click', () => {
          // 親要素のトグルを操作
          const flWrapper = document.querySelector('.l-header__btn');
          //flWrapper.classList.toggle('notshow');
        });

        // 要素外をクリックで非表示
        $('.l-header').on('click', (e) => {
          if(!e.target.closest('.l-header__btn,.l-header__navi-list-link')) {
            const flWrapper = document.querySelector('.l-header__btn')
            $("body,.l-header").toggleClass("overlay");
            $(".l-header__btn").toggleClass("nav-open");
            $(".l-header__navi").toggleClass("nav-open");
          } else {
          }
        })

    });

    let gnavTop = $(".c-gnav").offset().top;
    let gnavHeight = $(".c-gnav").outerHeight();

    $(window).on("load scroll", function () {
         // header menu
        if ( gnavTop <= $(window).scrollTop() ) {
            $(".c-gnav").attr("data-fixed", true);
        } else {
            $(".c-gnav").attr("data-fixed", false);
        }
        // inview
        $("[data-a-inview]").each(function () {
            if ( $(this).offset().top <= $(window).scrollTop() + window.innerHeight ) {
                $(this).attr("data-inview", true);
            } else {
                $(this).attr("data-inview", false);
            }
            if ( $(this).offset().top <= $(window).scrollTop() + window.innerHeight &&  $(this).offset().top + $(this).height() > $(window).scrollTop() + window.innerHeight ) {
                if ( gnavTop <= $(window).scrollTop() ) {
                    $(this).find(".p-home__buy").attr("data-inview", true);
                } else {
                    $(this).find(".p-home__buy").attr("data-inview", false);
                }
            } else {
                $(this).find(".p-home__buy").attr("data-inview", false);
            }
        });
    });

}.call(this));
