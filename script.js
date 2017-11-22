
var score=0;
var formule;
var nbEtape=0;
function bloc(){
	this.debut=0;
	this.fin=0;	
}
function randomGame(){
  var tab = new Array();
  tab[0]="!(p-((p-q)-q))";
  tab[1]="!(p-(!q-!(p-q)))";
  tab[2]="!((!p-!q)-(q-p))";
  tab[3]="!((p&(p-q)&((p-q)-r))-p&q&r))";
  tab[4]="!((p-q)-((q-r)-(p-r)))";
  tab[5]="!((((s&p)-(q&r))&(!r|!q)&p)-!s)";
  tab[6]="!(((p-q)&((r&s)-p)&(t-r)&(s&t))-q)";
  tab[7]="!((p-(q-r))-((p-q)-(p-r)))";
  tab[8]="!((q-p)-((!q-p)-p))";
  tab[9]="!(p-(q-r)-((p-r)|(q-r)))";
  tab[10]="!(((p-r)|(q-r))-(p-(q-r)))";
  tab[11]="!(((p-q)&(q-p))|(p&!p)|(!p&q))";
  tab[12]="!((!(a&b)-(!a|!b)))";
  tab[13]="!(((!a|!b)-!(a&b)))";
  tab[14]="!(((a|b|!c)&(&|b|c)&(a|!b))-a)";
  tab[15]="!((u&(w-v)&(t-v)&(u-(w|t)))-v)";
  tab[16]="!(r|((p&(p-q)&((p-q)&r))-(p&q&r))&(t-!r))";
  tab[17]="!((p|(q-!p))|((p&(p-q)&((p-q)-r))-(p&q&r)))";
  tab[18]="!(((p-(q-r))-((q-r)|(q-r)))-((!(!q-!p))|!q|q))";
  tab[19]="!(((((s&p)-(q&r))&(!r|!q)&p)&(t&(s-!t)))-!s)";
  var x = Math.floor((Math.random() * 20) );
  document.getElementById("f1").innerHTML = tab[x];

}

function verif(id){
/* id bouton v�rif == nombre de bouton(nb sous formules) + num
ex: 1. avb / !b  id button v�rif = v21

2. a / !b  id button v�rif = v22

3. b / !b id button v�rif = v23

*/
var tab= new Array();
var verif=false;
for( var i=0; i<id.charAT(1); i++ ){
	idformule="f"+id.charAT(2)+i;
	tab[i]= idformule.innerHTML;
}
for(var j=0; j<tab.length;j++){
	for(var k=0; k<tab.length;k++){
var compare1="!"+tab[j];
var compare2= "!"+tab[k];
if(compare1==tab[k] || compare2==tab[j]){
	verif=true;
}
	}

}
return verif;

}
function game(id, nbDiv){
	nbEtape++;
	formule = id.innerHTML;
	var ParcourTableau = 0;
	var symbole;
	var affichage='<button id="f'+nbEtape+'" type="button">';
	for (var i; i<formule.length; i++){
		symbole=formule.charAT(i);
		
		if (symbole=="("){ //trouve les diff�rentes parties de l'expression
			if (i>0&&formule.charAt(-1)=='!'){
				
			}
			var b = new bloc();
			b.debut= i+1;
			var cpt =1;
			while (cpt>0){
				i++;
				if(formule.charAt(i)==")"){cpt--;}
				if(formule.charAt(i)=="("){cpt++;}				
			}
			b.fin=i-1;
			for (var j=b.debut; j<i;j++){
				affichage= affichage+formule.charAt(j);
			}
			
			
		}
		
		if (symbole== "-"){ //implication
			nbEtape++;
			affichage = "!("+affichage+')</button>			<button id="f'+nbEtape+'" type="button">';
			i++
			while(i<formule.length){
				affichage=affichage+formule.charAt(i);
				i++;
			}
			affichage=affichage+'</button><br><br><div id="d'+nbEtape-1+'><\div> 		<div id="d'+nbEtape+'><\div>';
			
		}

		if(symbole== "&"){
			affichage=affichage+'</button><br><button id="f'+nbEtape+'" type="button">';
			while(i<formule.length){
				affichage=affichage+formule.charAt(i);
				i++;
			}
			affichage=affichage+'</button><br><br><div id="d'+nbEtape+'><\div>';
		}
		
		if(symbole== "|"){
			affichage=affichage+'</button>		<button id="f'+nbEtape+'" type="button">';
			while(i<formule.length){
				affichage=affichage+formule.charAt(i);
				i++;
			}
			affichage=affichage+'</button><br><br><div id="d'+nbEtape-1+'><\div> 		<div id="d'+nbEtape+'><\div>';
		}
		
		else{
			affichage=affichage+formule.charAt(i);
		}
		
	}
		
		
		
		
		
		
	}
	
}

/* le code de mon jeux, je le garde en guise de pense bete pour quelques syntaxe (et petit memo au debut)

memo: negation ¬ alt+0172
	 et ˄ 
	 ou ˅
	 implique →
	 
var myString = 'Pauline';

var first = myString.charAt(0); // P
var last = myString.charAt(myString.length - 1); // e

<button onclick="game(f1)">f1</button> 






function boite(){
	this.x=0;
	this.y=0;
	this.w=0;
	this.h=0;
}

function joueur(){
	this.tete= new boite();
	this.corps=new boite();
}

function genereID(){
	var t=id;
	id++;
	return t;
	
}

function ennemi(){
	this.idf=genereID();
	this.b=new boite();
	this.i=document.getElementById(this.idf);
}//id ennemi, unique , incrementer id, reinitialiser remove child à partir du moment ou il atteind un des bords

function init(){
	s = document.getElementById('surface');
	bloc = document.getElementById('bloc');
	initSurf();
	initJoueur();
	//generationEnnemi();
	document.addEventListener('keydown', move);
	unit=1;
	partie();
}

function initSurf(){
	surf= new boite();
	surf.x=s.style.left;
	surf.y=s.style.top;
	surf.w=s.width;
	surf.h=s.height;	
}

function initJoueur(){
	//coordonnee alea dans la plage de def, x, y, w, h avec w h fixe
	//var unit= s.width/20;
	var taille= s.clientWidth/11;
	
	var j = document.getElementById('joueur');
	j1=new joueur();
	j1.tete.x =s.clientWidth/2;
	j1.tete.y =s.clientHeight - (taille*1.38);
	j1.tete.w =taille*0.6;
	j1.tete.h =taille*1.38*0.2;
	j1.corps.x =j1.tete.x;
	j1.corps.y =j1.tete.y+j1.tete.h;
	j1.corps.w =taille;
	j1.corps.h =taille*1.38*0.8;

	
	
	j.style.width=taille+"px";
    j.style.height=(taille*1.38)+"px";
  
	j.style.position="absolute";
	j.style.left=j1.tete.x+"px";
	j.style.top=j1.tete.y+"px";
}

function initEnnemi(){
	var e = new ennemi();
	e.y=15;
	e.w=s.clientWidth/15;
	e.h=s.clientHeight/10;
	
	var mr=Math.random() * s.clientWidth-(s.clientWidth/15);
	while(mr<(posepre+e.w+5) && mr>(posepre-e.w-5)){
		mr=Math.random() * s.clientWidth-(s.clientWidth/15);
	}
	e.x=mr;
	
	
	
	var img=document.createElement("img")
	bloc.appendChild(img);
	img.id=e.idf;
	img.src="image/ennemi.png";
	e.i=document.getElementById(e.idf);
	e.i.style.position="absolute";
	e.i.style.left=e.x+"px";
	e.i.style.top=e.y+"px";
	e.i.style.width=e.w+"px";
    e.i.style.height=e.h+"px";
	
	return e;
	
}

function modifPos(obj, t, l) { 
   	obj.style.top =obj.offsetTop+parseInt(t)+"px";
   	obj.style.left =obj.offsetLeft +parseInt(l)+"px";
      }
	  
function collision(box1, box2){
	//déjà fait modifier..
	 if((box2.x >= box1.x + box1.w)      // trop à droite
	|| (box2.x + box2.w <= box1.x) // trop à gauche
	|| (box2.y >= box1.y + box1.h) // trop en bas
	|| (box2.y + box2.h <= box1.y))  // trop en haut
          return false; 
   else
          return true; 
}
	  
async function move(k) {
    var key = k.keyCode ? k.keyCode : k.which;
   
    //unité de déplacement en fonction de la taille de l'image
    position = document.getElementById('joueur');
    for(var i=0; i<12; i++){
		if (key == 40) {//bas
      if (collision(surf, j1.tete) && collision(surf, j1.corps)) {
        j1.tete.y+=unit;
		j1.corps.y+=unit;
      	modifPos(position, unit,0);
      }
	  else{
		j1.tete.y-=unit*7;
		j1.corps.y-=unit*7;
      	modifPos(position, -unit*7,0);
		}
    }
    if (key == 38) { //haut
      if (collision(surf, j1.tete) && collision(surf, j1.corps)) {
        j1.tete.y-=unit;
		j1.corps.y-=unit;
      	modifPos(position, -unit,0);
      }
	  else{
		j1.tete.y+=unit*7;
		j1.corps.y+=unit*7;
      	modifPos(position, +unit*7,0);
		}
    }
    if (key == 37) { //gauche
      if (collision(surf, j1.tete) && collision(surf, j1.corps)) {
        j1.tete.x-=unit;
		j1.corps.x-=unit;
        modifPos(position, 0,-unit);
      }
	  else{
		j1.tete.x+=unit*7;
		j1.corps.x+=unit*7;
      	modifPos(position, 0,unit*7);
		}
    }
    if (key == 39) { //droite
      if (collision(surf, j1.tete) && collision(surf, j1.corps)) {
       j1.tete.x+=unit;
	   j1.corps.x+=unit;
       modifPos(position, 0, unit);
				 // déplacement ICONE
      }
	 else{
		j1.tete.x-=unit*7;
		j1.corps.x-=unit*7;
      	modifPos(position, 0,-unit*7);}
	}
	await sleep(10);
	}
	
}

async function partie(){
	while(niveau<11){
		if(ennemiPasse==maxennemi){
			niveau++;
			var mess=document.getElementById("niveau");
			mess.textContent="Niveau "+(niveau-1);
			maxennemi=parseInt(maxennemi*1.5);
			nbennemi=0;
			ennemiPasse=0;
			deroulementNiveau();
		}
		
		await sleep(10000);
	}
	
	alert("felicitation vous avez gagné")
	return null;
}

async function deroulementNiveau(){
	var reserve = new Array(maxennemi);
	while(ennemiPasse<=maxennemi){
		if(Math.random()<(niveau/500)&&nbennemi<maxennemi){
			reserve[nbennemi]=initEnnemi();
			nbennemi++;
		}
		for(var i=0; i<6; i++){
			for (var cpt=0; cpt<reserve.length; cpt++){
				if(reserve[cpt]!=undefined){
					if(collision(surf,reserve[cpt])){
						if(!collision(j1.tete,reserve[cpt]) && !collision(j1.corps,reserve[cpt])){
							reserve[cpt].y++;
							modifPos(reserve[cpt].i, 1,0);	
						}
						else{
							bloc.removeChild(position);
							alert("tué par un poisson pané, vous n'avez pas honte?!");
							return null;
						}
					}
					else{
						bloc.removeChild(reserve[cpt].i);
						ennemiPasse++
						reserve[cpt]=undefined;
					}
						
				}
				//await sleep(0);
			}
			await sleep(1);
		}
	}
}
*/


  
  

