const express = require('express');
const app = express();
app.use(express.static('public'));
const fs = require('fs');


////////////////////////////////////////////////////////////////Reoute /html/formulaire.html
app.get('/formulaire',  (req, res) => {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/" + "formulaire.html" );
})

///////////////////////////////////////////////////////////////// Route /
app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

///////////////////////////////////////////Route /traiter_get
app.get('/traiter_get',  (req, res) => {
 // Preparer l'output en format JSON
console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel:req.query.courriel,
 };
console.log(reponse);
 res.end(JSON.stringify(reponse));

 fs.readFile('membres.json', "utf8", (err,data) => {
    if (err) throw err;
    let liste = JSON.parse(data)
    liste.push(reponse);
    console.log('Sauvegardé');
    
    fs.writeFile ("membres.json", JSON.stringify(liste), (err) => {
        if (err) throw err;
        });

  });


})

/////////////////////////////////////////////////////////// Route membre
app.get("/membres", (req,res) => {

    fs.readFile('membres.json', 'utf8', (err, data) => {
        if (err) throw err;
       let membres = JSON.parse(data);
       console.log(membres[1].nom);

       });
    
      
    }

);



var server = app.listen(8081,  () => {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})