/**
 * Products.js
 * 
 */
{
    class Details {
        constructor() {
            this.DOM = {};

            const detailsTmpl = `
            <div class="details__bg details__bg--up"></div>
            <div class="details__bg details__bg--down"></div>
            <img class="details__img" src="" alt=""/>
            <h2 class="details__title"></h2>
            <div class="details__deco"></div>
            <h3 class="details__subtitle"></h3>
            <div class="details__price"></div>
            <p class="details__description"></p>
            <button class="details__addtocart">Подробнее</button>
            <button class="details__close"><svg class="icon icon--cross" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="306px" height="306px" viewBox="0 0 306 306" style="enable-background:new 0 0 306 306;" xml:space="preserve">
       <g>
           <g id="chevron-right">
               <polygon points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153"/>
           </g>
       </g></button>
            <button class="details__magnifier"><svg version="1.1" class="icon icon--magnifier" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 44.621 44.621" style="enable-background:new 0 0 44.621 44.621;" xml:space="preserve">
       <g>
           <path style="" d="M32,27.508V0.25H0v31h27.258l13.121,13.121l4.242-4.242L32,27.508z M26,25.25H6v-19h20V25.25z
                M13,23.25H8v-5h5V23.25z"/>
       </g></svg></button>
            `;





            this.DOM.details = document.createElement('div');
            this.DOM.details.className = 'details';
            this.DOM.details.innerHTML = detailsTmpl;
            DOM.content.appendChild(this.DOM.details);
            this.init();
        }
        init() {
            this.DOM.bgUp = this.DOM.details.querySelector('.details__bg--up');
            this.DOM.bgDown = this.DOM.details.querySelector('.details__bg--down');
            this.DOM.img = this.DOM.details.querySelector('.details__img');
            this.DOM.title = this.DOM.details.querySelector('.details__title');
            this.DOM.deco = this.DOM.details.querySelector('.details__deco');
            this.DOM.subtitle = this.DOM.details.querySelector('.details__subtitle');
            this.DOM.price = this.DOM.details.querySelector('.details__price');
            this.DOM.description = this.DOM.details.querySelector('.details__description');
            this.DOM.cart = this.DOM.details.querySelector('.details__addtocart');
            this.DOM.close = this.DOM.details.querySelector('.details__close');
            this.DOM.magnifier = this.DOM.details.querySelector('.details__magnifier');
            this.DOM.grid = document.querySelector('.grid');
            this.initEvents();
        }
        initEvents() {
            this.DOM.close.addEventListener('click', () => this.isZoomed ? this.zoomOut() : this.close());
            this.DOM.magnifier.addEventListener('click', () => this.zoomIn());
            anime({
                targets: '.grid__item',
                scale: [
                    { value: .7, easing: 'easeOutSine', duration: 250 },
                    { value: 1, easing: 'easeInOutQuad', duration: 350 }
                ],
                opacity: [0, 1],
                delay: anime.stagger(100, { grid: [1, 1], from: 'center' })
            });
        }
        fill(info) {
            this.DOM.img.src = info.img;
            this.DOM.title.innerHTML = info.title;
            this.DOM.deco.style.backgroundImage = `url(${info.img})`;
            this.DOM.subtitle.innerHTML = info.subtitle;
            this.DOM.price.innerHTML = info.price;
            this.DOM.description.innerHTML = info.description;
        }
        getProductDetailsRect() {
            return {
                productBgRect: this.DOM.productBg.getBoundingClientRect(),
                detailsBgRect: this.DOM.bgDown.getBoundingClientRect(),
                productImgRect: this.DOM.productImg.getBoundingClientRect(),
                detailsImgRect: this.DOM.img.getBoundingClientRect()
            };
        }
        open(data) {
            if (this.isAnimating) return false;
            this.isAnimating = true;

            this.DOM.details.classList.add('details--open');
            this.DOM.productBg = data.productBg;
            this.DOM.productImg = data.productImg;

            this.DOM.productBg.style.opacity = 0;
            this.DOM.productImg.style.opacity = 0;

            const rect = this.getProductDetailsRect();

            this.DOM.bgDown.style.transform = `translateX(${rect.productBgRect.left-rect.detailsBgRect.left}px) translateY(${rect.productBgRect.top-rect.detailsBgRect.top}px) scaleX(${rect.productBgRect.width/rect.detailsBgRect.width}) scaleY(${rect.productBgRect.height/rect.detailsBgRect.height})`;
            this.DOM.bgDown.style.opacity = 1;

            this.DOM.img.style.transform = `translateX(${rect.productImgRect.left-rect.detailsImgRect.left}px) translateY(${rect.productImgRect.top-rect.detailsImgRect.top}px) scaleX(${rect.productImgRect.width/rect.detailsImgRect.width}) scaleY(${rect.productImgRect.height/rect.detailsImgRect.height})`;
            this.DOM.img.style.opacity = 1;
            anime({
                targets: [this.DOM.bgDown, this.DOM.img],
                duration: (target, index) => index ? 800 : 250,
                easing: (target, index) => index ? 'easeOutElastic' : 'easeOutSine',
                elasticity: 250,
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                complete: () => this.isAnimating = false
            });

            anime({
                targets: [this.DOM.title, this.DOM.deco, this.DOM.subtitle, this.DOM.price, this.DOM.description, this.DOM.cart, this.DOM.magnifier],
                duration: 600,
                easing: 'easeOutExpo',
                delay: (target, index) => {
                    return index * 60;
                },
                translateY: (target, index, total) => {
                    return index !== total - 1 ? [50, 0] : 0;
                },
                scale: (target, index, total) => {
                    return index === total - 1 ? [0, 1] : 1;
                },
                opacity: 1
            });
            anime({
                targets: [this.DOM.bgUp],
                duration: 350,
                easing: 'easeOutExpo',
                scale: ['2.5', '1'],
                opacity: 1
            });

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeOutSine',
                translateX: ['-80%', 0],
                opacity: 1
            });

            anime({
                targets: DOM.hamburger,
                duration: 250,
                easing: 'easeOutSine',
                translateY: [0, '-100%']
            });
            // BLOCKING BACKGROUND SCROLLING
            // BLOCKING BACKGROUND SCROLLING
            document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y: hidden !important');
        }
        close() {
            if (this.isAnimating) return false;
            this.isAnimating = true;
            document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y: auto');
            this.DOM.details.classList.remove('details--open');

            anime({
                targets: DOM.hamburger,
                duration: 250,
                easing: 'easeOutSine',
                translateY: 0
            });

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeOutSine',
                translateX: '80%',
                opacity: 0
            });

            anime({
                targets: [this.DOM.title, this.DOM.deco, this.DOM.subtitle, this.DOM.price, this.DOM.description, this.DOM.cart, this.DOM.magnifier],
                duration: 50,
                easing: 'linear',
                opacity: 0
            });
            anime({
                targets: [this.DOM.bgUp],
                duration: 600,
                easing: 'easeInSine',
                scale: ['1', '3'],
                opacity: 0
            });

            const rect = this.getProductDetailsRect();
            anime({
                targets: [this.DOM.bgDown, this.DOM.img],
                duration: 250,
                easing: 'easeOutSine',
                translateX: (target, index) => {
                    return index ? rect.productImgRect.left - rect.detailsImgRect.left : rect.productBgRect.left - rect.detailsBgRect.left;
                },
                translateY: (target, index) => {
                    return index ? rect.productImgRect.top - rect.detailsImgRect.top : rect.productBgRect.top - rect.detailsBgRect.top;
                },
                scaleX: (target, index) => {
                    return index ? rect.productImgRect.width / rect.detailsImgRect.width : rect.productBgRect.width / rect.detailsBgRect.width;
                },
                scaleY: (target, index) => {
                    return index ? rect.productImgRect.height / rect.detailsImgRect.height : rect.productBgRect.height / rect.detailsBgRect.height;
                },
                complete: () => {
                    this.DOM.bgDown.style.opacity = 0;
                    this.DOM.img.style.opacity = 0;
                    this.DOM.bgDown.style.transform = 'none';
                    this.DOM.img.style.transform = 'none';
                    this.DOM.productBg.style.opacity = 1;
                    this.DOM.productImg.style.opacity = 1;
                    this.isAnimating = false;
                }
            });
        }
        zoomIn() {
            this.isZoomed = true;

            anime({
                targets: [this.DOM.title, this.DOM.deco, this.DOM.subtitle, this.DOM.price, this.DOM.description, this.DOM.cart, this.DOM.magnifier],
                duration: 150,
                easing: 'easeOutSine',
                translateY: (target, index, total) => {
                    return index !== total - 1 ? [0, index === 0 || index === 1 ? -50 : 50] : 0;
                },
                scale: (target, index, total) => {
                    return index === total - 1 ? [1, 0] : 1;
                },
                opacity: 0
            });
            anime({
                targets: [this.DOM.bgDown],
                duration: 250,
                easing: 'easeInSine',
                translateY: ['0%', '101%'],
                opacity: 1
            });
            const imgrect = this.DOM.img.getBoundingClientRect();
            const win = { w: window.innerWidth, h: window.innerHeight };

            const imgAnimeOpts = {
                targets: this.DOM.img,
                duration: 250,
                easing: 'easeOutCubic',
                translateX: win.w / 2 - (imgrect.left + imgrect.width / 2),
                translateY: win.h / 2 - (imgrect.top + imgrect.height / 2)
            };

            if (win.w > 0.8 * win.h) {
                this.DOM.img.style.transformOrigin = '50% 50%';
                Object.assign(imgAnimeOpts, {
                    scaleX: 0.75 * win.w / parseInt(0.8 * win.h),
                    scaleY: 0.75 * win.w / parseInt(0.8 * win.h),
                    rotate: 15
                });
            }
            anime(imgAnimeOpts);

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeInOutCubic',
                scale: 1.5,
                rotate: 90
            });
        }
        zoomOut() {
            if (this.isAnimating) return false;
            this.isAnimating = true;
            this.isZoomed = false;

            anime({
                targets: [this.DOM.title, this.DOM.deco, this.DOM.subtitle, this.DOM.price, this.DOM.description, this.DOM.cart, this.DOM.magnifier],
                duration: 250,
                easing: 'easeOutCubic',
                translateY: 0,
                scale: 1,
                opacity: 1
            });

            anime({
                targets: this.DOM.img,
                duration: 250,
                easing: 'easeOutCubic',
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                rotate: 0,
                complete: () => {
                    this.DOM.img.style.transformOrigin = '0 0';
                    this.isAnimating = false;
                }
            });
            anime({
                targets: [this.DOM.bgDown],
                duration: 140,
                easing: 'easeOutSine',
                translateY: ['101%', '0'],
                opacity: 1

            });

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeInOutCubic',
                scale: 1,
                rotate: 0
            });
        }
    };

    class Item {
        constructor(el) {
            this.DOM = {};
            this.DOM.el = el;
            this.DOM.product = this.DOM.el.querySelector('.product');
            this.DOM.productBg = this.DOM.product.querySelector('.product__bg');
            this.DOM.productImg = this.DOM.product.querySelector('.product__img');

            this.info = {
                img: this.DOM.productImg.src,
                title: this.DOM.product.querySelector('.product__title').innerHTML,
                subtitle: this.DOM.product.querySelector('.product__subtitle').innerHTML,
                description: this.DOM.product.querySelector('.product__description').innerHTML,
                price: this.DOM.product.querySelector('.product__price').innerHTML
            };

            this.initEvents();
        }
        initEvents() {
            this.DOM.product.addEventListener('click', () => this.open());
        }
        open() {
            // OPEN DESCRIPTION!
            DOM.details.fill(this.info);
            DOM.details.open({
                productBg: this.DOM.productBg,
                productImg: this.DOM.productImg
            });

            //  COLORPICKER 
            //  COLORPICKER 
            //  COLORPICKER 
            //  COLORPICKER 
            //  COLORPICKER 

            var imgsrcomi = this.DOM.productImg;
            var palette = [];
            var colorThief = new ColorThief();
            palette = colorThief.getPalette(imgsrcomi, 3)

            function rgbToHex(red, green, blue) {
                var rgb = blue | (green << 8) | (red << 16);
                return '#' + (0x1000000 + rgb).toString(16).slice(1)
            }

            const colorpr = rgbToHex(palette[0].slice(0, 1), palette[0].slice(1, 2), palette[0].slice(2, 3));
            const coloralt = rgbToHex(palette[1].slice(0, 1), palette[1].slice(1, 2), palette[1].slice(2, 3));
            const coloralt2 = rgbToHex(palette[2].slice(0, 1), palette[2].slice(1, 2), palette[2].slice(2, 3));




            document.querySelector('.details__addtocart').style.backgroundColor = colorpr;
            document.querySelector('.details__title').style.color = coloralt;
            document.querySelector('.details__price').style.color = coloralt2;
            document.querySelector('.icon--magnifier').style.fill = '#fff';
            document.querySelector('.details__magnifier').style.background = colorpr;
            document.querySelector('.icon--cross').style.fill = coloralt2;

            //  COLORPICKER BY COLD
        }
    };

    const DOM = {};
    DOM.grid = document.querySelector('.grid');
    DOM.content = DOM.grid.parentNode;
    DOM.hamburger = document.querySelector('.dummy-menu');
    DOM.gridItems = Array.from(DOM.grid.querySelectorAll('.grid__item'));
    let items = [];
    DOM.gridItems.forEach(item => items.push(new Item(item)));

    DOM.details = new Details();

    imagesLoaded(document.body, () => document.body.classList.remove('loading'));
};