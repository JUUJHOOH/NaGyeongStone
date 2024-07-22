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
let didScroll;

setTimeout(() => {
    if(winH_mvH_diff >= 0){
        main.style.marginTop = `${winH_mvH_diff}px`;
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
                window.scrollTo(0,winH_mvH_diff+1);
            }, 700);
        } else {
            setTimeout(() => {
                window.scrollTo(0,1);
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

    function hasScrolled(){
        if(winH_mvH_diff >= 0){
            if(window.scrollY > winH_mvH_diff){
                header.classList.add('moveOverTheTop');
                main.classList.remove('fade_out');
                main.classList.add('fade_in');
                noScroll_1();
                document.body.classList.remove('checker_2');
            } else {
                header.classList.remove('moveOverTheTop');
                main.classList.remove('fade_in');
                main.classList.add('fade_out');
                noScroll_2();
                document.body.classList.remove('checker_1');
            }

            if(scrollY > 1/768*wrapWidth && scrollY){
                
            }
        } else {
            if(window.scrollY !== 0){
                header.classList.add('moveOverTheTop');
                main.classList.remove('fade_out');
                main.classList.add('fade_in');
                noScroll_1();
                document.body.classList.remove('checker_2');
            } else {
                header.classList.remove('moveOverTheTop');
                main.classList.remove('fade_in');
                main.classList.add('fade_out');
                noScroll_2();
                document.body.classList.remove('checker_1');
            }
        }
        // console.log("scroll " + window.scrollY);
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
