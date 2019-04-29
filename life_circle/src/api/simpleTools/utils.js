export function randomColors(){
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    const endcolor = 'background:rgba('+ r +','+ g +','+ b +',0.8)';
    return endcolor;
}