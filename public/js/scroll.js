window.onload = function(){
    setTimeout(() => {
        scrollTo(0,0);
    }, 90);
}

const header = document.querySelector('#header');
const main = document.querySelector('#main');
const windowHeight = window.innerHeight;
const mainVisualHeight = document.querySelector('.mainVisual').offsetHeight;
const winH_mvH_diff = mainVisualHeight - windowHeight;
const opacityLength = 160/768*wrapWidth;
const desingLength = 0/768*wrapWidth;
let didScroll;
let lastScrollTop = 0;
const delta = 5;
let scrollDirection; // Up = false, Down = true

setTimeout(() => {
    if(winH_mvH_diff >= 0){
        main.style.marginTop = `${winH_mvH_diff+(opacityLength+desingLength)}px`;
    }

    document.body.classList.add('noScroll');
    setTimeout(() => {
    document.body.classList.remove('noScroll');
    main.classList.remove('opacity0');
    }, 1700);

    window.addEventListener('scroll', function(){
        didScroll = true;
    })

    function scrollToMain(){
        if(winH_mvH_diff >= 0){
            setTimeout(() => {
                window.scrollTo(0,winH_mvH_diff+1+(opacityLength+desingLength));
            }, 700);
        } else {
            setTimeout(() => {
                window.scrollTo(0,10);
            }, 700);
        }
    }

    function noScroll_1(){
        if(document.body.classList.contains('checker_1')){
        } else {
            scrollToMain();
            document.body.classList.add('checker_1');
            document.body.classList.add('noScroll');
            setTimeout(() => {
            document.body.classList.remove('noScroll');
            }, 1000);
        }
    }
    function noScroll_2(){
        if(document.body.classList.contains('checker_2')){
        } else {
            document.body.classList.add('checker_2');
            document.body.classList.add('noScroll');
            setTimeout(() => {
            document.body.classList.remove('noScroll');
            }, 1000);
            window.scrollTo({top:0, left:0, behavior: "smooth"});
        }
    }

    function goToHead(){
        header.classList.remove('moveOverTheTop');
        main.classList.remove('fade_in');
        main.classList.add('fade_out');
        noScroll_2();
        document.body.classList.remove('checker_1');
    }

    function goToMain(){
        header.classList.add('moveOverTheTop');
        main.classList.remove('fade_out');
        main.classList.add('fade_in');
        noScroll_1();
        document.body.classList.remove('checker_2');
    }

    function hasScrolled(){
        let nowScrollTop = window.scrollY;
        if(Math.abs(lastScrollTop - nowScrollTop) <= delta){
            return;
        }
        if(nowScrollTop > lastScrollTop){
            //Scroll down
            scrollDirection = true;
            console.log('scroll down');
        }else{
            if(nowScrollTop + window.innerHeight < document.body.offsetHeight){
                //Scroll up
                scrollDirection = false;
            }
        }
        lastScrollTop = nowScrollTop;

        if(winH_mvH_diff >= 0){
            if(window.scrollY > winH_mvH_diff+opacityLength){
                if(document.body.classList.contains('checker_a')){
                } else {
                    goToMain();
                    setTimeout(() => {
                        document.body.classList.add('checker_a');
                        document.body.classList.remove('checker_b');
                    }, 800);
                }
            }
            if (window.scrollY < winH_mvH_diff+opacityLength+desingLength){
                if(document.body.classList.contains('checker_b')){
                } else {
                    goToHead();
                    setTimeout(() => {
                        document.body.classList.add('checker_b');
                        document.body.classList.remove('checker_a');
                    }, 800);
                }
            }

            if(window.scrollY > winH_mvH_diff/*  && window.scrollY <= winH_mvH_diff+(opacityLength) && scrollDirection */){
                docStyle.setProperty('--opacityPerDemp', 1-((window.scrollY-winH_mvH_diff)/(opacityLength)));
            } else {
                docStyle.setProperty('--opacityPerDemp', 1)
            }
        } else {
            if(window.scrollY !== 0){
                if(document.body.classList.contains('checker_a')){
                } else {
                    goToMain();
                    setTimeout(() => {
                        document.body.classList.add('checker_a');
                        document.body.classList.remove('checker_b');
                    }, 800);
                }
            }
            if (window.scrollY < 9){
                if(document.body.classList.contains('checker_b')){
                } else {
                    goToHead();
                    setTimeout(() => {
                        document.body.classList.add('checker_b');
                        document.body.classList.remove('checker_a');
                    }, 800);
                }
            }
        }
        // console.log("scroll " + window.scrollY);
        // console.log(winH_mvH_diff+opacityLength+desingLength)
        // console.log("windowHeight " + windowHeight);
        // console.log("mainVisualHeight " + mainVisualHeight);
    }

    setInterval(function(){
        if(didScroll){
            hasScrolled();
            didScroll = false;
        }
    }, 100);
}, 100);
