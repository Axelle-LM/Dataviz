//----------Map crée via mapbox.com-------------------
//Accès au token
mapboxgl.accessToken = 'pk.eyJ1IjoibmF0aGFsaWVkcCIsImEiOiJjbDh4NjBqOWkwMXE3M3dwY292bDNzcDVoIn0.hxFDPbpzjCLJ3ZpIji1SJQ';
//Initialisation de la map 
const map = new mapboxgl.Map({
    container: 'map',
    //Application du style 
    style: 'mapbox://styles/nathaliedp/cla2xdem9002f14pcpyzv0zd3',
    center: [3.483, 46.205], // starting position [lng, lat],
    zoom: 4.5, // Controle du zoom
    // Position de la camera
    pitch: 46,
    bearing: 20,
});


//Pour le changement de date 
let datechange = function datechangement() {
    document.getElementById("suivante").click();
}

//-------------Animation de la carte---------------
// Fonction pour lancer la lecture
function play() {
    intervaldate = setInterval(datechange, 2000);
}

// Fonction pour arrêter la lecture
function pause() {
    clearInterval(intervaldate);
    intervaldate = null;
}

// Quand je clique sur l'id Play, il devient en display none et c'est l'Id Pause qui s'affiche
document.getElementById("Play").addEventListener("click", function() {
    document.getElementById("Play").style.display = "none";
    document.getElementById("Pause").style.display = "block";
    play();
});

// Quand je clique sur l'id Pause, il devient en display none et c'est l'Id Play qui s'affiche
document.getElementById("Pause").addEventListener("click", function() {
    document.getElementById("Pause").style.display = "none";
    document.getElementById("Play").style.display = "block";
    pause();
});

// Quand on arrive à 2022, on repasse à 2002
document.getElementById("suivante").addEventListener("click", function() {
    if (document.getElementById("date").value == 2022) {
        document.getElementById("date").value = 2002;
        document.getElementById("submit").click();
        // Quand on clique sur suivant, ça met la valeur du slider à la valeur de la date
        document.getElementById("slider").value = document.getElementById("date").value;
    } else {
        document.getElementById("date").value++;
        document.getElementById("submit").click();
        // Quand on clique sur suivant, ça met la valeur du slider à la valeur de la date
        document.getElementById("slider").value = document.getElementById("date").value;
    }
});

// Même chose dans l'autre sens
document.getElementById("précédente").addEventListener("click", function() {
    if (document.getElementById("date").value == 2002) {
        document.getElementById("date").value = 2022;
        document.getElementById("submit").click();
        document.getElementById("slider").value = document.getElementById("date").value;
    } else {
        document.getElementById("date").value--;
        document.getElementById("submit").click();
        document.getElementById("slider").value = document.getElementById("date").value;
    }
});

// Mettre la valeur de l'input avec l'id slider avec la même valeur que l'input avec l'id date
document.getElementById("slider").addEventListener("input", function() {
    document.getElementById("date").value = document.getElementById("slider").value;
    document.getElementById("submit").click();
});

// Mettre la valeur de l'input avec l'id date avec la même valeur que l'input avec l'id slider
document.getElementById("date").addEventListener("input", function() {
    document.getElementById("slider").value = document.getElementById("date").value;
    document.getElementById("submit").click();
});

// ---------------- Fin de l'animation-------------



document.getElementById('submit').addEventListener('click', function() {

    document.querySelectorAll('.marker').forEach(el => el.parentNode.removeChild(el));
    let date = document.getElementById('date').value;
    //On va ici charger ici le contenu du fichier JSON dans une variable data en utilisant fetch Javascipt
    fetch('fire_archive_M-C61_301806.json').then(function(response) {
        response.json().then(function(data) {

            function feu(data) {
                data.forEach(function(f) {
                    //Si acq_date de notre json correspond au conditions ci dessous alors : 
                    //On met en condition l'année selectionnée + les mois d'été 
                    if (f.acq_date.substring(0, 4) == date && (f.acq_date.substring(5, 7) == 06 || f.acq_date.substring(5, 7) == 07 || f.acq_date.substring(5, 7) == 08 || f.acq_date.substring(5, 7) == 09)) {
                        //creation des markeurs ( les feux )
                        let el = document.createElement('div')
                        el.className = 'marker';
                        el.style.width = '3px';
                        el.style.height = '3px';

                        new mapboxgl.Marker(el)
                            .setLngLat([f.longitude, f.latitude])
                            //On les rajoute a la map
                            .addTo(map);
                    }
                });
            }

            feu(data)
        })
    })
})

// Compter le nombre de feu par année
document.getElementById('submit').addEventListener('click', function() {
    let date = document.getElementById('date').value;
    fetch('fire_archive_M-C61_301806.json').then(function(response) {
        response.json().then(function(data) {

            function feu(data) {
                let nbfeu = 0;
                data.forEach(function(f) {
                    if (f.acq_date.substring(0, 4) == date && (f.acq_date.substring(5, 7) == 06 || f.acq_date.substring(5, 7) == 07 || f.acq_date.substring(5, 7) == 08 || f.acq_date.substring(5, 7) == 09)) {
                        nbfeu++;
                    }
                });
            }

            feu(data)
        })
    })
})

//Nombre de feu par année 
let nbfeuannee = [{
    A: 2002,
    B: 1426
}, {
    A: 2003,
    B: 2891
}, {
    A: 2004,
    B: 1910
}, {
    A: 2005,
    B: 1448
}, {
    A: 2006,
    B: 1211
}, {
    A: 2007,
    B: 785
}, {
    A: 2008,
    B: 931
}, {
    A: 2009,
    B: 893
}, {
    A: 2010,
    B: 670
}, {
    A: 2011,
    B: 626
}, {
    A: 2012,
    B: 710
}, {
    A: 2013,
    B: 854
}, {
    A: 2014,
    B: 633
}, {
    A: 2015,
    B: 912
}, {
    A: 2016,
    B: 1092
}, {
    A: 2017,
    B: 1082
}, {
    A: 2018,
    B: 812
}, {
    A: 2019,
    B: 930
}, {
    A: 2020,
    B: 667
}, {
    A: 2021,
    B: 934
}, {
    A: 2022,
    B: 2208
}];

//-----------------Graph Histogramme---------------------
// Mise en place d'une échelle pour que nos barrs soient plus petites
let scaleY = 1 / 30;


//Creation des axes pour l'histogramme
const axeG =
    d3.axisLeft(d3.scaleLinear()
        .domain([0, 3000]) // la plage de valeurs possibles 
        .range([100, 0])) // les coordonnées du début et de fin de l'axe
    .ticks(8)
    .tickFormat(d3.format('d'))


const axeB =
    d3.axisBottom(d3.scaleLinear()
        .domain([01, 22]) // la plage de valeurs possibles 
        .range([0, 150])) // les coordonnées du début et de fin de l'axe
    .ticks(21)
    .tickFormat(d3.format('d'));

//Creation du graphique
let svg = d3.select("#histogramme")
    .append("svg")
    .attr("width", 100 + "%")
    .attr("height", 90 + "%")
    .attr("viewBox", "-30 -5 200 130")

// Ajout des axes
svg.append("g")
    .call(axeG)
    .style("color", "white")
    .style("font-size", "0.3em");


svg.append("g")
    .call(axeB)
    .attr("transform", "translate(0, 100)")
    .style("color", "white")
    .style("font-size", "0.3em");

let w = 150 / nbfeuannee.length;


// Création du linear gradient appliqué sur les barres 
let areaGradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", "areaGradient")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", "0%").attr("y2", "100%");

areaGradient.append("stop")
    .attr("offset", "10%")
    .attr("stop-color", "#BE0303")
    .attr("stop-opacity", 1);

areaGradient.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#C05316")
    .attr("stop-opacity", 1);

areaGradient.append("stop")
    .attr("offset", "90%")
    .attr("stop-color", "#DE7A04")
    .attr("stop-opacity", 1);

//Création des barres
d3.select("svg")
    .selectAll(".barres")
    .data(nbfeuannee)
    .enter()
    .append("g")
    .attr("class", "barres")
    .attr("transform", (d, i) => `translate(${i*w},100)`)

d3.selectAll(".barres")
    .append("rect")
    .style("width", w - 1)
    .style("height", d => d.B * scaleY)
    .style("y", d => -d.B * scaleY)
    .style("x", "4")
    .style("fill", "url(#areaGradient)") //On applique le linear gradiant qu'on a crée précédamment 
    .style("stroke", "none");

// Lorsqu'on passe la souris sur une barre, les autres barres deviennent plus transparentes et on créer un texte qui affiche le nombre de feu pour l'année correspondante.
d3.selectAll(".barres")
    .on("mouseover", function(d) {
        d3.selectAll(".barres")
            .style("opacity", 0.3);
        d3.select(this)
            .style("opacity", 1)
            .append("text")
            .attr("class", "label")
            .attr("y", 22)
            .attr("text-anchor", "middle")
            .text(d => d.B + " feux" + " en " + d.A)
            .style("fill", "white")
            .style("position", "absolute")
            .style("font-family", "Montserrat")
            .style("font-size", "0.5em");
    })
    // Quand on retire la souris, tout revient à la normal
    .on("mouseout", function(d) {
        d3.selectAll(".barres")
            .style("opacity", 1);
        d3.select(this)
            .select(".label")
            .remove();
    });


// -------------------Fin de l'histogramme --------------------------

//-------------Création du graph nuage de point relié par les traits--------------------

//On utilise ici les données du json des moyennes de températures de 2002 à 2022
d3.json('temperature.json').then(function(d) {

    let scaley = d3.scaleLinear()
        .domain([21, 27]) // la plage de valeurs possibles 
        .range([100, 0])

    // Création des axes
    const axeY =
        d3.axisLeft(scaley) // les coordonnées du début et de fin de l'axe
        .ticks(5) // Nombre de step 
        .tickFormat(d3.format('d'))


    let scalex = d3.scaleLinear()
        .domain([2000, 2022]) // la plage de valeurs possibles 
        .range([0, 150]) // les coordonnées du début et de fin de l'axe

    const axeX =
        d3.axisBottom(scalex) // les coordonnées du début et de fin de l'axe
        .ticks(10) // Nombre de step 
        .tickFormat(d3.format('d')); // Pour enlever la virgule


    console.log("test")

    let svgnuage = d3.select("#nuagepoint")

    // Création du graphique
    svgnuage
        .append("svg")
        .attr("class", "svgndp")
        .attr("width", 100 + "%")
        .attr("height", 90 + "%")
        .attr("viewBox", "-30 -5 200 130")

    // Ajout des axes
    d3.select(".svgndp")
        .append("g")
        .call(axeY)
        .style("color", "white")
        .style("font-size", "0.3em");


    d3.select(".svgndp")
        .append("g")
        .call(axeX)
        .attr("transform", "translate(0, 100)")
        .style("color", "white")
        .style("font-size", "0.3em");

    // Création de la ligne qui relie les points
    d3.select(".svgndp")
        .append("path")
        .datum(d)
        .attr("fill", "none")
        .style("stroke", "url(#areaGradient)")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(function(d) {
                return scalex(d.annee)
            })
            .y(function(d) {
                return scaley(d.temp_moy)
            })
        )

    // Création des groupes pour les points et le texte
    d3.select(".svgndp")
        .selectAll(".point")
        .data(d)
        .enter()
        .append("g")
        .attr("class", "point");

    // Création des points
    d3.selectAll(".point")
        .append("circle")
        .attr("class", "rond")
        .attr("width", "100px")
        .attr("height", "100px")
        .style("fill", "orange")
        .style("stroke", "none")
        .attr("r", 2)
        .attr("transform", (d, i) => `translate(${scalex (d.annee)}, ${scaley (d.temp_moy)})`);

    // Création du texte quand on passe la souris sur un point
    d3.selectAll(".point")
        .on("mouseover", function(d) {
            d3.select(this)
                .append("text")
                .attr("y", 122)
                .attr("x", 70)
                .attr("class", "labelpoint")
                .attr("text-anchor", "middle")
                .text(d => d.temp_moy + "°C" + " en " + d.annee)
                .style("position", "absolute")
                .style("font-family", "Montserrat")
                .style("fill", "white")
                .style("font-size", "0.5em");
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .select(".labelpoint")
                .remove();
        });

    // Changement de taille des ronds quand on passe la souris dessus
    d3.selectAll(".rond")
        .on("mouseover", function(d) {
            d3.selectAll(".rond")
                .style("opacity", 0.3);
            d3.select(this)
                .style("opacity", 1)
                .attr("r", 5)
                .on("mouseout", function(d) {
                    d3.selectAll(".rond")
                        .style("opacity", 1);
                    d3.select(this)
                        .attr("r", 2)
                });
        })
});

//------------- Fin du graph nuage de point --------------------

//-------------Les mentions légales -------------------

document.querySelector('.volet-invisible').addEventListener('click', function(click) {
    //Afficher le mot "click" dans la console quand on a cliqué sur l'élément ayant pour classe volet-invisible
    console.log("click")

    //L'élement ayant pour ID "volet" sera animé après 800ms sur une hauteur de 33em 
    document.getElementById('volet').animate([{
        height: '33em'
    }], {
        duration: 800
    })

    //On attribue ici la classe volet-visible en supprimant la classe volet-invisible
    //Ainsi les mentions légales pourront se dérouler 
    setTimeout(function() {
        document.querySelector('.volet-invisible').classList.add('volet-visible');
        document.querySelector('.volet-invisible').classList.remove('volet-invisible');
    }, 800);
})

// Pour refermer le volet des mentions légales : 

document.getElementById('volet').addEventListener('click', function(click) {
        // afficher le mot « click » dans la console quand on a cliqué sur l’élément ayant pour classe volet-invisible
        console.log("click")

        // Animation au bout de 800 millisecondes après le clic
        document.querySelector('.volet-visible').animate([{
                height: '5em'
            }], {
                duration: 800
            })
            // Attribution de la classe volet-invisible en supprimant la classe volet-visible
            //La classe volet-invisible étant remise, la partie des mentions légales est caché 
        setTimeout(function() {
            document.getElementById('volet').classList.remove('volet-visible');
            document.getElementById('volet').classList.add('volet-invisible');
        }, 800);

    })
    //------------- Fin des mentions légales -------------------