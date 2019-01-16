function Slider(params = {}) {
  const{
    containerSelector = '.slider',
    bodySelector = '.slider__wrapper',
    tagetSelector = 'img'
  }=params,
    sliderEl = document.querySelector(containerSelector) || createSliderEl(),
    sliderBodyEl = sliderEl.querySelector(bodySelector);


  window.addEventListener('click', openSliderByCLick);
  
  sliderEl.addEventListener('click', closeSlider);
  
  function openSlider(targetEl) {
	       fillSliderContent(targetEl);
     sliderEl.classList.add('slider--active');
    
  /*   fillSliderContent(targetEl);*/
  }
  
  function closeSlider(e) {
    if (e.target === e.currentTarget) {
      sliderEl.classList.remove('slider--active');

      sliderBodyEl.innerText = '';
    }
  }
  
  function fillSliderContent(targetEl){
	  sliderBodyEl.innerText = '';
    const imgSrc  = targetEl.getAttribute('src'),
          altText = targetEl.getAttribute('alt');
    slideEl = createSlide(imgSrc, altText);
    sliderBodyEl.append(slideEl);
    
  }
  function createSlide(imgSrc, altText=''){
    const slideEl = document.createElement('li'),
          imgEl = document.createElement('img');
    
    slideEl.classList.add('slider__item');
    slideEl.append(imgEl);
    
    imgEl.setAttribute('src', imgSrc);
    imgEl.setAttribute('alt', altText);
   
	  
  return slideEl;}
  
  function createSliderEl(){
    const sliderEl = document.createElement('div'),
          sliderViewboxEl = document.createElement('div'),
	  sliderBuy = document.createElement('a'),
          sliderWrapperEl = document.createElement('ul'),
          sliderTapeEl = document.createElement('div');
    
    sliderEl.classList.add('slider');
    sliderViewboxEl.classList.add('slider__viewbox');
    sliderWrapperEl.classList.add('slider__wrapper');
    sliderBuy.classList.add('slider__buy');
    sliderBuy.innerText = 'Купить';
  
    
    sliderEl.append(sliderViewboxEl);
    sliderViewboxEl.append(sliderBuy);
    
    document.body.append(sliderEl);
    
    return sliderEl;
  }
  
  
 
  function openSliderByCLick(e) {
    const targetEl = e.target.closest(tagetSelector);
    
    if (targetEl) {
      e.preventDefault();
      openSlider(targetEl);
    }
    
  }
}

Slider({
  containerSelector: '.slider',
  tagetSelector: '[data-type="slide"]'
});



$(document).ready(function() { // Ждём загрузки страницы
	
	/*$(".image_zoom").click(function(){	// Событие клика на маленькое изображение
	  	var img = $(this);	// Получаем изображение, на которое кликнули*/
	$(".button_zoom").click(function(){	// Событие клика на маленькое изображение
	  	var img = $(".image_zoom");	// Получаем изображение, на которое кликнули
	
		var src = img.attr('src'); // Достаем из этого изображения путь до картинки
		$("body").append("<div class='popup'>"+ //Добавляем в тело документа разметку всплывающего окна
						 "<div class='popup_bg'></div>"+ // Блок, который будет служить фоном затемненным
						 "<img src='"+src+"' class='popup_img' />"+ // Само увеличенное фото
						 "</div>");
		$(".popup").fadeIn(200); // Медленно выводим изображение
		$(".popup_bg").click(function(){	// Событие клика на затемненный фон	   
			$(".popup").fadeOut(200);	// Медленно убираем всплывающее окн	
      setTimeout(function() {	// Выставляем таймер
			  $(".popup").remove(); // Удаляем разметку всплывающего окна
			}, 200);
		});
	});
	
});
