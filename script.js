var score=0;

var nbEtape=0;

var contradiction1=null;


function bloc(){

	this.debut=0;

	this.fin=0;	

}

function randomGame(){

  var tab = new Array();

  tab[0]="!(p→((p→q)→q))";

  tab[1]="!(p→(!q→!(p→q)))";

  tab[2]="!((!p→!q)→(q→p))";

  tab[3]="!((p˄(p→q)˄((p→q)→r))→(p˄q˄r))";

  tab[4]="!((p→q)→((q→r)→(p→r)))";

  tab[5]="!((((s˄p)→(q˄r))˄(!r˅!q)˄p)→!s)";

  tab[6]="!(((p→q)˄((r˄s)→p)˄(t→r)˄(s˄t))→q)";

  tab[7]="!((p→(q→r))→((p→q)→(p→r)))";

  tab[8]="!((q→p)→((!q→p)→p))";

  tab[9]="!(p→(q→r)→((p→r)˅(q→r)))";

  tab[10]="!(((p→r)˅(q→r))→(p→(q→r)))";

  tab[11]="!(((p→q)˄(q→p))˅(p˄!p)˅(!p˄q))";

  tab[12]="!(!(a˄b)→(!a˅!b))";

  tab[13]="!((!a˅!b)→!(a˄b))";

  tab[14]="!(((a˅b˅!c)˄(a˅b˅c)˄(a˅!b))→a)";

  tab[15]="!((u˄(w→v)˄(t→v)˄(u→(w˅t)))→v)";

  tab[16]="!(r˅((p˄(p→q)˄((p→q)˄r))→(p˄q˄r))˄(t→!r))";

  tab[17]="!((p˅(q→!p))˅((p˄(p→q)˄((p→q)→r))→(p˄q˄r)))";

  tab[18]="!(((p→(q→r))→((q→r)˅(q→r)))→(!(!q→!p)˅!q˅q))";

  tab[19]="!(((((s˄p)→(q˄r))˄(!r˅!q)˄p)˄(t˄(s→!t)))→!s)";

  var x = Math.floor((Math.random() * 20) );

  document.getElementById("f1").innerHTML = tab[x];



}



function verouillage(id){
	var parcoursID="";
	var j=0;
	var bout;
	for(var i=1;i<id.length;i++){
		parcoursID=parcoursID+id.charAt(i);
	}
	var test= 0;
	test=eval(parcoursID);
	console.log("test"+test);
	while(document.getElementById("f"+test)!=null){
		console.log("numid" +"f"+test);
		console.log("numid" +document.getElementById("f"+test));
		bout=document.getElementById("f"+test);
		if (bout.innerHTML.length>2){
			bout.removeAttribute("onclick");
		}
		j++;
		test=eval(parcoursID)+j;
	}
	
}
function game2(id,){
	
	nbEtape++;
	console.log(id); 
	
	id.style.backgroundColor="grey";
	verouillage(id.id);
	var formule = id.innerHTML;
	
	
	
	var ParcourTableau = 0;

	var symbole;

		
	var affichage='';
	const nouvelleDiv = document.createElement("div");
	
	//document.getElementById("main").appendChild(nouvelleDiv);
	
	//nouvelleDiv.style.height="22px";
	
	console.log(formule);
	
	for (var i = 0; i<formule.length; i++){
		symbole = formule.charAt(i);
		console.log("i : "+ i);
		

		if (symbole=="("){
			/*var for=parenthese(formule);
			console.log("t : " +t);
			
			CETTE FONCTION PU SA RACE*/
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
				console.log("( : "+ formule.charAt(j) );
				affichage= affichage+formule.charAt(j);
				console.log("( : " + affichage);
			}
			symbole=formule.charAt(i+1);
			i++;
			console.log(symbole);
		}
	

		if (symbole== "→"){
			var f1 = affichage;
			var f2="";
			nbEtape++;		

			
			
			i++;
			while(i<formule.length){
				
				f2=f2+formule.charAt(i);
				console.log(f2);
				i++;
				

			}
			if (f1.charAt(0)=="!"){
				f1=parenthese(f1.substring(1));
			}
			else{
				f1=parenthese(f1);
				f1="!("+f1+")";
				if (f1.length==5){f1=f1.charAt(3);}
				if (f1.length==4){f1="!"+f1.charAt(2);}
			}
			f1=parenthese(f1);
			f2=parenthese(f2);
			disjonction(f1,f2,nbEtape,id);
			//recopie2(id.id,nbEtape);
			return;
		}




		if(symbole== "˄"){
			
			f1=affichage;
			console.log(affichage);
			var f2="";
			
			nbEtape++;

			i++;

			while(i<formule.length){
				f2=f2+formule.charAt(i);
				console.log(f2);
				i++;

			}
			f1=parenthese(f1);
			f2=parenthese(f2);
			conjonction(f1,f2,nbEtape,id);
			//recopie(id.id,nbEtape);
			return;
		}

		

		if(symbole== "˅"){

			var f1 = affichage;
			var f2="";
			
			nbEtape++;

			i++

			while(i<formule.length){

				f2=f2+formule.charAt(i);
				console.log(f2);
				i++;

			}
			f1=parenthese(f1);
			f2=parenthese(f2);
			disjonction(f1,f2,nbEtape,id);
			//recopie2(id.id,nbEtape);
			return;


		}

		
		if (symbole == "!"){
			console.log(affichage);
			var f1=affichage;
			var f2="";
			if (formule.charAt(i+1)=="("){
				j=i+1;
				var cpt =1;

				while (cpt>0){

					j++;

					if(formule.charAt(j)==")"){cpt--;}

					if(formule.charAt(j)=="("){cpt++;}				

				}
				if(j<formule.length-1){
					console.log("cas 1");
					while(i<=j){

					f1=affichage+formule.charAt(i);

					i++;

					}
					i=j;
				}
				else{
					i++;
					i++;
					while(i<formule.length){
						
						if (formule.charAt(i)=="("){
							f1=f1+"("
							cpt=1;
							while(cpt>0){
								i++;
								f1=f1+formule.charAt(i);
								if(formule.charAt(i)==")"){cpt--;}
								if(formule.charAt(i)=="("){cpt++;}
							}
							i++;
						}
						console.log(f1);
						if (formule.charAt(i)=="˄"){
							j=i+1;
							while(j<formule.length-1){
								f2=f2+formule.charAt(j);
								j++;
							}
							f2=parenthese(f2);
							f2="!("+f2+")";
							if(f1.charAt(0)!="!"){f1="!"+f1;}
							else{f1=f1.substring(1);}
							if (f2.length==5){f2=f2.charAt(3);}
							if (f2.length==4){f2="!"+f2.charAt(2);}
							disjonction(f1,f2,nbEtape,id);
							//recopie2(id.id,nbEtape);
							return;
						}
						if (formule.charAt(i)=="˅"){
							j=i+1;
							while(j<formule.length-1){
								f2=f2+formule.charAt(j);
								j++;
							}
							f2=parenthese(f2);
							f2="!("+f2+")";
							if(f1.charAt(0)!="!"){f1="!"+f1;}
							else{f1=f1.substring(1);}
							if (f2.length==5){f2=f2.charAt(3);}
							if (f2.length==4){f2="!"+f2.charAt(2);}
							conjonction(f1,f2,nbEtape,id);
							//recopie(id.id,nbEtape);
							return;
						}
						if (formule.charAt(i)=="→"){
							j=i+1;
							while(j<formule.length-1){
								f2=f2+formule.charAt(j);
								j++;
							}
							if (f2.charAt(0)=="!" && f2.charAt(1)=="("){
								var t=1;
								var cpt =1;

								while (cpt>0){

									t++;

									if(f2.charAt(t)==")"){cpt--;}

									if(f2.charAt(t)=="("){cpt++;}				

								}
								if(t>=f2.length-1){
									f2=parenthese(f2.substring(1));
								}
							}
							else{
								f2=parenthese(f2);
								f2="!("+f2+")";
								if (f2.length==5){f2=f2.charAt(3);}
								if (f2.length==4){f2="!"+f2.charAt(2);}
							}
							
							f1=parenthese(f1);
							conjonction(f1,f2,nbEtape,id);
							//recopie(id.id,nbEtape);
							return;
						}

						else{f1=f1+formule.charAt(i);}
						i++;
					}
				}
				
			}
			
		}

		

		affichage=affichage+formule.charAt(i);
	
		
		console.log("aff :" +affichage +" i" + i);

		
	}
	
	const nouveauContenu = document.createElement("button");
	
	/*console.log(affichage);
	nouveauContenu.innerHTML=affichage;
	
	nouveauContenu.id="f"+nbEtape+"1";
	//nouveauContenu.onclick=game("f"+nbEtape+"1","'" +"d"+nbEtape+"1"+"'");
	nouvelleDiv.appendChild(nouveauContenu);
	var test=document.getElementById("f"+nbEtape+"1");
	console.log(test);
	nouveauContenu.setAttribute("onclick","game("+"f"+nbEtape+"1"+","+"d"+nbEtape+"1"+")");
	//nouveauContenu.onclick= game(document.getElementById("f"+nbEtape+"1"),"'" +"d"+nbEtape+"1"+"'");
*/
}
function recopie(id,nbEtape, div){
	var parcoursID="";
	var j=1;
	var bout;
	for(var i=1;i<id.length-1;i++){
		parcoursID=parcoursID+id.charAt(i);
	}
	var test= 0;
	var compt=3;
	test=parcoursID+1;
	console.log("test"+test);
	console.log("lalalalal" + document.getElementById("f"+13));
	while(document.getElementById("f"+test)!= null){
		if("f"+test!=id){
			console.log("création"+test)
			const nouveauContenu = document.createElement("button");
			//const nouvelleDiv = document.createElement("div");
			nouveauContenu.innerHTML=document.getElementById("f"+test).innerHTML;
			div.appendChild(document.createElement("br"));
			div.appendChild(nouveauContenu);
		//	document.getElementById("main").appendChild(nouvelleDiv);
			console.log("T→T while"+test)
			while(document.getElementById("f"+nbEtape+compt)!= null){
				compt++;
			}
			nouveauContenu.id="f"+nbEtape+compt;
			if(nouveauContenu.innerHTML.length<3){nouveauContenu.setAttribute("onclick","verif(this)");}
			else { nouveauContenu.setAttribute("onclick","game2(this)");}
			compt++;
		}
		j++;
		test=parcoursID+j;
		console.log("T→T while"+test)
	}
	
}
function recopie2(id,nbEtape,div){
	var parcoursID="";
	var j=1;
	var bout;
	for(var i=1;i<id.length-1;i++){
		parcoursID=parcoursID+id.charAt(i);
	}
	var test= 0;
	var compt=1;
	test=parcoursID+1;
	console.log("test"+test);
	console.log("lalalalal" + document.getElementById("f"+13));
	while(document.getElementById("f"+test)!= null){
		if("f"+test!=id){
			console.log("création"+test)
			const nouveauContenu = document.createElement("button");
			//const nouvelleDiv = document.createElement("div");
			nouveauContenu.innerHTML=document.getElementById("f"+test).innerHTML;
			div.appendChild(document.createElement("br"));
			div.appendChild(nouveauContenu);
		//	document.getElementById("main").appendChild(nouvelleDiv);
			console.log("T→T while"+test)
			while(document.getElementById("f"+nbEtape+compt)!= null){
				compt++;
			}
			nouveauContenu.id="f"+nbEtape+compt;
			if(nouveauContenu.innerHTML.length<3){nouveauContenu.setAttribute("onclick","verif(this)");}
			else { nouveauContenu.setAttribute("onclick","game2(this)");}
			compt++;
		}
		j++;
		test=parcoursID+j;
		console.log("T→T while"+test)
}}
/*function implique(f1,f2,nbEtape){
	var nbet=nbEtape-1;
	console.log(f1);
	console.log(f2);
	const nouveauContenu = document.createElement("button");
	const nouveauContenu2 = document.createElement("button");
	const nouvelleDiv = document.createElement("div");
	const nouvelleDiv2 = document.createElement("div");
	document.getElementById("main").appendChild(nouvelleDiv);
	document.getElementById("main").appendChild(nouvelleDiv2);
	nouvelleDiv.style.textAlign='center';
	nouvelleDiv2.style.textAlign='center';
	nouvelleDiv.style.position="relative";
	nouvelleDiv2.style.position="relative";
	nouvelleDiv.style.right="30px";
	nouvelleDiv2.style.left="30px";
	nouvelleDiv2.style.bottom="21px";
	nouvelleDiv.appendChild(nouveauContenu);
	nouvelleDiv2.appendChild(nouveauContenu2);
	nouvelleDiv.id="d"+nbet+"1";
	nouvelleDiv2.id="d"+nbEtape+"1";
	nouveauContenu.innerHTML="!"+f1;
	nouveauContenu2.innerHTML=f2;
	nouveauContenu.id="f"+nbet+"1";
	nouveauContenu2.id="f"+nbEtape+"1";
	nouveauContenu.setAttribute("onclick","game2("+"f"+nbet+"1"+","+"d"+nbet+"1"+")");
	nouveauContenu2.setAttribute("onclick","game2("+"f"+nbEtape+"1"+","+"d"+nbEtape+"1"+")");
	}
function impliqueAtomique(f1,f2,nbEtape){
	var nbet=nbEtape-1;
	console.log(f1);
	console.log(f2);
	const nouveauContenu = document.createElement("button");
	const nouveauContenu2 = document.createElement("button");
	const nouvelleDiv = document.createElement("div");
	const nouvelleDiv2 = document.createElement("div");
	document.getElementById("main").appendChild(nouvelleDiv);
	document.getElementById("main").appendChild(nouvelleDiv2);
	nouvelleDiv.style.textAlign='center';
	nouvelleDiv2.style.textAlign='center';
	nouvelleDiv.style.position="relative";
	nouvelleDiv2.style.position="relative";
	nouvelleDiv.style.right="30px";
	nouvelleDiv2.style.left="30px";
	nouvelleDiv.appendChild(nouveauContenu);
	nouvelleDiv2.appendChild(nouveauContenu2);
	nouvelleDiv.id="d"+nbet+"1";
	nouvelleDiv2.id="d"+nbEtape+"1";
	nouveauContenu.innerHTML="!"+f1;
	nouveauContenu2.innerHTML=f2;
	nouveauContenu.id="f"+nbet+"1";
	nouveauContenu2.id="f"+nbEtape+"1";
	nouveauContenu.setAttribute("onclick","game2("+"f"+nbet+"1"+","+"d"+nbet+"1"+")");
	nouveauContenu2.setAttribute("onclick","game2("+"f"+nbEtape+"1"+","+"d"+nbEtape+"1"+")");
	
}*/
function conjonction(f1,f2,nbEtape, pere){
	console.log(f1);
	console.log(f2);
	const nouveauContenu = document.createElement("button");
	const nouveauContenu2 = document.createElement("button");
	const nouvelleDiv = document.createElement("div");
	//nouvelleDiv.style.textAlign='center';
	//nouvelleDiv2.style.textAlign='center';
	pere.parentNode.appendChild(nouvelleDiv);
	nouvelleDiv.appendChild(nouveauContenu);
	nouvelleDiv.appendChild(document.createElement("br"));
	nouvelleDiv.appendChild(nouveauContenu2);
	nouvelleDiv.appendChild(document.createElement("br"));
	nouvelleDiv.appendChild(document.createElement("br"));
	recopie(pere.id,nbEtape, nouvelleDiv);
	nouvelleDiv.id="d"+nbEtape+"1";
	nouveauContenu.innerHTML=f1;
	nouveauContenu2.innerHTML=f2;
	nouveauContenu.id="f"+nbEtape+"1";
	nouveauContenu2.id="f"+nbEtape+"2";
	if(f1.length<3){ nouveauContenu.setAttribute("onclick","verif(this)");}
	else { nouveauContenu.setAttribute("onclick","game2(this)");}
	if(f2.length<3){nouveauContenu2.setAttribute("onclick","verif(this)");}
	else { nouveauContenu2.setAttribute("onclick","game2(this)");}
	}
function disjonction(f1,f2,nbEtape, pere){
	var nbet=nbEtape-1;
	console.log(f1);
	console.log(f2);
	const nouveauContenu = document.createElement("button");
	const nouveauContenu2 = document.createElement("button");
	const nouvelleDiv = document.createElement("div");
	const nouvelleDiv2 = document.createElement("div");
	pere.parentNode.appendChild(nouvelleDiv);
	pere.parentNode.appendChild(nouvelleDiv2);
	//nouvelleDiv.style.textAlign='center';
	//nouvelleDiv2.style.textAlign='center';
	nouvelleDiv.style.position="relative";
	nouvelleDiv2.style.position="relative";
	nouvelleDiv.style.right="90px";
	nouvelleDiv2.style.left="90px";
	nouvelleDiv.appendChild(nouveauContenu);
	nouvelleDiv2.appendChild(nouveauContenu2);
	nouvelleDiv.id="d"+nbet+"1";
	nouvelleDiv2.id="d"+nbEtape+"1";
	nouveauContenu.innerHTML=f1;
	nouveauContenu2.innerHTML=f2;
	nouveauContenu.id="f"+nbet+"1";
	nouveauContenu2.id="f"+nbEtape+"1";
	if(f1.length<3){ nouveauContenu.setAttribute("onclick","verif(this)");}
	else { nouveauContenu.setAttribute("onclick","game2(this)");}
	if(f2.length<3){nouveauContenu2.setAttribute("onclick","verif(this)");}
	else { nouveauContenu2.setAttribute("onclick","game2(this)");}
	recopie2(pere.id,nbet, nouvelleDiv);
	recopie2(pere.id,nbEtape, nouvelleDiv2);
	
}

function parenthese(formule){
	console.log("loutre");
	var affichage="";
	j=0;
	var cpt =1;
	if (formule.charAt(0)!="("){cpt=0;}
	while (cpt>0){

		j++;

		if(formule.charAt(j)==")"){cpt--;}

		if(formule.charAt(j)=="("){cpt++;}				

	}
	if(j==formule.length-1 && formule.charAt(0)=="("){
		var b = new bloc();		
		b.debut=1;
		var i =0;
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
		return affichage;
	}
	else{ return formule;}
	
}


function verif(id){
	if(id.innerHTML.length<3){
		if (contradiction1==null){
			contradiction1=id;
		}
		else { 
			if (contradiction1.parentNode == id.parentNode){
				if (contradiction1.innerHTML.charAt(0)=="!") {
					if (contradiction1.innerHTML.charAt(1)==id.innerHTML.charAt(0)) {
						score=score+15;
						alert("bien joué! +15 points");
						id.removeAttribute("onclick");
						contradiction1.removeAttribute("onclick");
					}
					else { score=score-5;
						alert("mauvaise reponse, -5 points");
					}
				}
				if (id.innerHTML.charAt(0)=="!") {
					if (contradiction1.innerHTML.charAt(0)==id.innerHTML.charAt(1)) {
						score=score+15;
						alert("bien joué! +15 points");
						id.removeAttribute("onclick");
						contradiction1.removeAttribute("onclick");
					}
					else { score=score-5;
						alert("mauvaise reponse, -5 points");
					}
				}
				else { score=score-5;
					alert("mauvaise reponse, -5 points");
				}
			}
			else { alert("il faut que ce soit dans le meme groupe, sinon c'est trop simple!");}
			contradiction1=null;
			document.getElementById("score").innerHTML="score : "+score+"pts";
			return;
		}
	
	
	}
	else { alert("il faudrait decomposer un peut plus, sinon c'est de la triche!");
		contradiction1=null;
		return;
	}
}


	/*function verif(id){
	 //id bouton vérif == nombre de bouton(nb sous formules) + num
	ex: 1. avb / !b  id button vérif = v21
	2. a / !b  id button vérif = v22
	3. b / !b id button vérif = v23
	*/

	/*var tab= new Array();
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
} */

		

		
/*function game(id, idDiv){
	nbEtape++;
	var formule = id.innerHTML;
	var ParcourTableau = 0;
	var symbole;
	var affichage='<button onclick="game(this,'+"d"+nbEtape+"1"+')" id="f'+nbEtape+"1"+'" type="button">';
	for (var i; i<formule.length; i++){
		symbole=formule.charAT(i);
		
		if (symbole=="("){
			if (i>0){
				
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
		
		if (symbole== "→"){
			nbEtape++;
			affichage = "!("+affichage+')</button>			<button onclick="game(this,'+"d"+nbEtape+"2"+')" id="f'+nbEtape+"2"+'" type="button">';
			i++
			while(i<formule.length){
				affichage=affichage+formule.charAt(i);
				i++;
			}
			affichage=affichage+'</button><br><br><div id="d'+nbEtape+"1"+'"><\div> 		<div id="d'+nbEtape+"2"+'"><\div>';
			
		}
		if(symbole== "&"){
			affichage=affichage+'</button><br><button onclick="game(this,'+"d"+nbEtape+"1"+')" id="f'+nbEtape+"2"+'" type="button">';
			while(i<formule.length){
				affichage=affichage+formule.charAt(i);
				i++;
			}
			affichage=affichage+'</button><br><br><div id="d'+nbEtape+"1"+'"><\div>';
		}
		
		if(symbole== "|"){
			affichage=affichage+'</button>		<button onclick="game(this,'+"d"+nbEtape+"2"+')" id="f'+nbEtape+"2"+'" type="button">';
			i++;
			while(i<formule.length){
				affichage=affichage+formule.charAt(i);
				i++;
			}
			affichage=affichage+'</button><br><br><div id="d'+nbEtape+"1"+'"><\div> 		<div id="d'+nbEtape+"2"+'"><\div>';
		}
		if (symbole == "!"){
			if (formule.charAt(i+1)=="("){
				j=i+1;
				var cpt =1;
				while (cpt>0){
					j++;
					if(formule.charAt(j)==")"){cpt--;}
					if(formule.charAt(j)=="("){cpt++;}				
				}
				if(j<formule.length-1){
					while(i<formule.length){
					affichage=affichage+formule.charAt(i);
					i++;
					}
					
				}
				else{
					
					while(i<formule.length){
						i++
						if (formule.charAt(i)=="("){
							j=i+1;
							cpt=1;
							while(cpt>0){
								j++;
								if(formule.charAt(j)==")"){cpt--;}
								if(formule.charAt(j)=="("){cpt++;}
							}
							if(formule.charAt(j)!="→"){
								affichage=affichage+'!(';
							}
							while(cpt>0){
								i++;
								affichage=affichage+formule.charAt(i);
								if(formule.charAt(i)==")"){cpt--;}
								if(formule.charAt(i)=="("){cpt++;}
							}
						}
						if (formule.charAt(i)=="&"){
							affichage=affichage+'|';
						}
						if (formule.charAt(i)=="|"){
							affichage=affichage+'&';
						}
						if (formule.charAt(i)=="→"){
							affichage=affichage+'&';
						}
						else{affichage=affichage+"!"+charAt(i);}
					}
					affichage=affichage+'</button><br><br><div id="d'+nbEtape+"2"+'"><\div>';
				}
				
			}
			
			if (formule.charAt(i+1)=="!"){
				i+=2;
			}
			
			else{
				affichage=affichage+'!';
			}
		}
		else{
			affichage=affichage+formule.charAt(i);
		}
		
	}
	
	
	document.getElementById(idDiv).innerHTML = affichage;
	
}*/		

		

		

		



	



/* le code de mon jeux, je le garde en guise de pense bete pour quelques syntaxe (et petit memo au debut)
memo: negation ¬ alt+0172
	 et ^ 
	 ou ?
	 implique ?
	 
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