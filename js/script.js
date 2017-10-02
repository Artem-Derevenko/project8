$(document).ready(function() {

	wow = new WOW(
		{
		  mobile: false
		}
	)
	wow.init();

	// $("ul.tabs").jTabs({content: ".tabs_content", animate: true}); 

	//слайдер главная страница
	$('.slider-header').slick({
		dots: false,
		infinite: true,
		speed: 500,
		fade: true,
		autoplay: true,
		cssEase: 'linear',
		responsive: [
		    {
		      breakpoint: 550,
		      settings: {
		        arrows: false
		      }
		    }
		]
	});

	//слайдер лицензии
	$('.license-slider').slick({
		infinite: true,
		slidesToShow: 3,
		dots: false,
		slidesToScroll: 3,
		autoplay: true,
		responsive: [
		    {
		      breakpoint: 765,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		]
	});

	//слайдер лицензии
	$('.slider-2').slick({
		dots: false,
		infinite: true,
		fade: true,
		autoplay: false,
		cssEase: 'linear'
	});

	//скрипт показа лицензии в увеличенном виде
    $('.wrap-license .license-slider .slide-item img').on('click', function() {
        
        var thisImg = $(this).attr('src'); 
        $('.wrap-license .content-right .license-activ img').attr('src', thisImg);

    });

    // показ/скрытие меню 
    $('.toogle').on('click', function() {
        $(".header-menu").toggleClass("active");
        $(this).toggleClass('click');
        return false;
    });

    //пагинация
    $(".pagination").pagination({
        items: 18,
        itemsOnPage: 6,
        cssStyle: 'light-theme'
    });

    //отображение информации о клиенте на странице клиент
    $(".client-item").on('click', function() {
    	$(".client-item").removeClass("active");
    	$(this).addClass("active");
    	var positionTop = $(this).position().top;
    	$(this).children('.client-info').css('top', positionTop + "px" );
    });

    //скрытие и показ фильтров на странице каталог
    $(".filter-item > .filter-name, .filter-item > .filter-icon").on('click', function() {

    	if ( !$(this).parent().hasClass('active') ) {
    		$('.subfilter-list').slideUp(300);
    		$('.filter-item').removeClass('active');
	    	$(this).siblings('.subfilter-list').slideDown(300);
	    	$(this).parent().addClass('active');
    	}

    	else {
    		$(this).siblings('.subfilter-list').slideToggle(300);
    		$(this).parent().removeClass('active');
    	}
    	
    });

    // скрытие показ фильтров при клике вне их области
	$(document).on('click', function(event) {
	    if( $(event.target).closest(".filter-list").length )
	    return;
	    $(".filter-list .subfilter-list").hide(300);
	    $('.filter-item').removeClass('active');
	    event.stopPropagation();
	});



    //прилипание блока с изображение пломбы при скролинге страницы Товар
    function resizeWidth() {

	        if ($(window).width() > 767)
	        {
	           
	           (function(){
			    	var topBegin = $("#product-info").offset().top;
					var a = document.querySelector('#product-img'), b = null, P = topBegin;
					window.addEventListener('scroll', Ascroll, false);
					document.body.addEventListener('scroll', Ascroll, false);
					function Ascroll() {
					  if (b == null) {
					    var Sa = getComputedStyle(a, ''), s = '';
					    for (var i = 0; i < Sa.length; i++) {
					      if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
					        s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
					      }
					    }
					    b = document.createElement('div');
					    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
					    a.insertBefore(b, a.firstChild);
					    var l = a.childNodes.length;
					    for (var i = 1; i < l; i++) {
					      b.appendChild(a.childNodes[1]);
					    }
					    a.style.height = b.getBoundingClientRect().height + 'px';
					    a.style.padding = '0';
					    a.style.border = '0';
					  }
					  var Ra = a.getBoundingClientRect(),
					      R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('#product-info').getBoundingClientRect().bottom);  // селектор блока, при достижении нижнего края которого нужно открепить прилипающий элемент
					  if ((Ra.top - P) <= 0) {
					    if ((Ra.top - P) <= R) {
					      b.className = 'stop';
					      b.style.top = - R +'px';
					    } else {
					      b.className = 'sticky';
					      b.style.top = P + 'px';
					    }
					  } else {
					    b.className = '';
					    b.style.top = '';
					  }
					  window.addEventListener('resize', function() {
					    a.children[0].style.width = getComputedStyle(a, '').width
					  }, false);
					}
				})()

				//изменение прозрачности изображения пломбы при скроле на странице Товар

				$(window).scroll(function(){
				    var top = $(window).scrollTop(),
				    	blockBegin = $("#product-info").offset().top,
				    	blockEnd = $("#product-info").height();

				    var opacity = ( (top > blockBegin)) ? ( 1 - ((top - blockBegin) * 1.9 / blockEnd )) : 1;

				    if ( opacity < 0 ) {  opacity = 0 }
				   
				    $(".product-image img.product-img1").css('opacity', opacity); 
				});

	        }
	}

    resizeWidth(); // устанавливаем высоту окна при первой загрузке страницы

});