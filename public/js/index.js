let docStyle = document.documentElement.style;
const wrapWidth = document.querySelector('#wrap').offsetWidth;
docStyle.setProperty('--pxPerWrap', 1/768*wrapWidth);

const moreBtn = document.querySelector('.moreBtn');
$('.moreGallery').slideUp();
moreBtn.addEventListener('click', function(){
    $('.moreGallery').slideDown(500);
    this.style.display = 'none';
})

let clipboard = new ClipboardJS('.linkCopyWrap');
const linkCopyWrap = document.querySelector('.linkCopyWrap');
let url = window.location.href;
const textarea = document.querySelector("#textArea");
textarea.innerHTML = url;
linkCopyWrap.addEventListener('click', function(){
    alert("링크가 복사되었습니다.");
})