const wrapWidth = document.querySelector('#wrap').offsetWidth;
let StylefontSize = document.createElement('style');
FS = {};
for(let i = 1; i <= 50; i++){
    let dynamicVarPrefix = "v_";
    let dynamicVarIndex = i;
    let dynamicVarName = dynamicVarPrefix + dynamicVarIndex;
    FS[dynamicVarName] = i*wrapWidth/768;
    // console.log(FS[dynamicVarName]);
    StylefontSize.innerHTML +=`.fontSize${i}{font-size:${FS[dynamicVarName]}px}`
}
document.body.appendChild(StylefontSize);

document.querySelectorAll('h2').forEach((h2)=>{
    h2.classList.add('fontSize45');
})