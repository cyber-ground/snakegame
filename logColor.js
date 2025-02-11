'use strict';

export {console_color, console_red, console_orange, console_yellow,  
	console_green, console_blue, console_purple, console_magenta, console_cyan}
function console_red(arg) {console.log(`\u001b[31m${arg}`)}
function console_orange(arg) {console.log('%c'+''+arg,`color:#ffa500;font-size:11px;`)}
function console_yellow(arg) {console.log(`\u001b[33m${arg}`)}
function console_green(arg) {console.log(`\u001b[32m${arg}`)}
function console_blue(arg) {console.log('%c'+''+arg,`color:#00aaff;font-size:11px;`)}
function console_purple(arg) {console.log('%c'+''+arg,`color:#b282ff;font-size:11px;`)}
function console_magenta(arg) {console.log('%c'+''+arg,`color:#ff4cff;font-size:11px;`)}
function console_cyan(arg) {console.log('%c'+''+arg,`color:#00ffffca;font-size:11px;`)}
function console_color(clr,fz,arg,fs,fw,tt) {
	if(fs==='i'){fs='italic'} if(fs==='b'){fw='bold'}
	if(fs==='u'){tt='uppercase'} if(fs==='l'){tt='lowercase'}
	if(fs==='ib'){fs='italic';fw='bold'}
	if(fs==='iu'){fs='italic';tt='uppercase'} 
	if(fs==='il'){fs='italic';tt='lowercase'}
	if(fs==='bu'){fw='bold';tt='uppercase'}
	if(fs==='bl'){fw='bold';tt='lowercase'}
	if(fs==='ibu'){fs='italic';fw='bold';tt='uppercase'}
	if(fs==='ibl'){fs='italic';fw='bold';tt='lowercase'}
	console.log('%c'+ arg + ' ',`color:${clr};font-size:${fz};
	font-style:${fs};font-weight:${fw};text-transform:${tt};`)}




	