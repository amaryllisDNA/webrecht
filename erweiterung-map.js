class land {
    constructor(name,spell,id,erweiterung){
        this.name=name;
        this.spell=spell;
        this.id=id;
        this.erweiterung=erweiterung;
    }
}

const landArray=[
 fr = new land ("Frankreich","frankreich", "fr2","gruender"),
 de = new land ("Deutschland","deutschland", "de2","gruender"),
 be = new land ("Belgien","belgien", "be2","gruender"),
 nl = new land ("Niederlande","niederlande", "nl2","gruender"),
 it = new land ("Italien","italien", "it2","gruender"),
 lu = new land ("Luxemburg","luxemburg", "lu2","gruender"),
 gb = new land ("Großbritannien","(gross|groß)?britannien", "gb2","nord"),
 ie = new land ("Irland","irland", "ie2","nord"),
 dk = new land ("Denmark","denmark", "dk2","nord"),
 gr = new land ("Griechenland","griechenland", "gr2","sued"),
 pt = new land ("Portugal","portugal", "pt2","sued"),
 es = new land ("Spanien","spanien", "es2","sued"),
 fi = new land ("Finland","finland", "fi2","efta"),
 se = new land ("Schweden","schweden", "se2","efta"),
 at = new land ("Österreich","(ö|oe)?sterreich", "at2","efta"),
 pl = new land ("Polen","polen", "pl2","ostI"),
 hu = new land ("Ungarn","ungarn", "hu2","ostI"),
 cz = new land ("Tscheschien","tscheschien", "cz2","ostI"),
 mt = new land ("Malta","malta", "mt2","ostI"),
 cy = new land ("Zypern","zypern", "cy2","ostI"),
 ee = new land ("Estonien","estonien", "ee2","ostI"),
 lv = new land ("Litauen","litauen", "lv2","ostI"),
 lt = new land ("Lettland","lettland", "lt2","ostI"),
 sk = new land ("Slowakien","slowakien", "sk2","ostI"),
 si = new land ("Slowenien","slowenien", "si2","ostI"),
 bg = new land ("Bulgarien","bulgarien", "bg2","ostII"),
 ro = new land ("Rumänien","rumänien", "ro2","ostII"),
 hg = new land ("Kroatien","kroatien", "hr2","ostIII"),
]

var countries = [];
var count_ew=0;
var erweiterung_title;
const erweiterung = ["gruender", "nord", "sued","efta","ostI","ostII","ostIII" ]
let selectedArray= landArray.filter(land=> land.erweiterung === erweiterung[count_ew])
const buttonMapGame = document.getElementById("button-map-game")
const erweiterungSummary = document.getElementById("erweiterung-summary")
const mapGameSection = document.getElementById("map-game-section")
const testErweiterung = document.getElementById("test-erweiterung")

testErweiterung.addEventListener("click", ()=>{
    mapGameSection.classList.toggle("hide");
    erweiterungSummary.classList.toggle("hide")
})
buttonMapGame.addEventListener("click", ()=>{
    mapGameSection.classList.toggle("hide");
    erweiterungSummary.classList.toggle("hide")   
})

function countSelectedCountries() {
    const regex_countries = new RegExp ("\\b("+selectedArray.map(obj=>obj.spell).join("|")+")\\b","gi");
    const matchingElements = countries.filter(item=>item.match(regex_countries));
    const uniqueCountries= new Set(matchingElements)
    const count_countries=uniqueCountries.size
    if (count_countries==selectedArray.length){
      count_ew ++;
      selectedArray=landArray.filter(land=>land.erweiterung===erweiterung[count_ew]);
      console.log(count_countries)
      countries=[]
}
}
  

function submitOnSpace(event){
    if(event.keyCode==32){
        event.preventDefault();
        var inputField =event.target;
        if (inputField.value.trim()!==''){
            countSelectedCountries()
            addCountries(inputField.value);
            inputField.value="";
        }
    }
}

function addCountries(country) {
    for (var i = 0; i < selectedArray.length; i++) {
      let regex = RegExp(selectedArray[i].spell, "i");
      if (count_ew === 1 && i === 0) {
        if (regex.test(country)) {
          var firstElementId = "gb2-nir";
          var secondElementId = "gb2-main";
          var firstElement = document.getElementById(firstElementId);
          var secondElement = document.getElementById(secondElementId);
          firstElement.setAttribute("style", "fill: var(--fill-" + count_ew + "-) !important;");
          secondElement.setAttribute("style", "fill: var(--fill-" + count_ew + "-) !important;");
          
          if(!countries.includes(selectedArray[i].spell)){
          countries.push(selectedArray[i].spell);
          const div = document.createElement("li");
          div.innerText= selectedArray[i].name
          erweiterung_title=document.getElementById(erweiterung[count_ew]+"-li");
          erweiterung_title.appendChild(div)
          
          
          if(countries.length==1){
          erweiterung_title.classList.remove("hide")
            }
          }  
        }
      } else {
        if (regex.test(country)) {
          countrySelect = document.getElementById(selectedArray[i].id);
          countrySelect.setAttribute("style", "fill: var(--fill-" + count_ew + "-) !important;");
          erweiterung_title=document.getElementById(erweiterung[count_ew]+"-li");
          
          if (!countries.includes(selectedArray[i].spell)) {
            const div = document.createElement("li");
            div.innerText= selectedArray[i].name
            erweiterung_title.appendChild(div)
            countries.push(selectedArray[i].spell);
            console.log(countries);
          if (countries.length==1){
          erweiterung_title.classList.remove("hide")
           }
          }
        }
      }
    }
  }

