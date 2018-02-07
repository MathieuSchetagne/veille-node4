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
 res.end('<a title="Voir les membres" href="http://127.0.0.1:8081/membres"> Voir les membres</a>');

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


       
       let html = "<html>";
       html += "<head>";
       html += "<style> td{border : 1px solid black;}";
       html += "</style>";
       html += "</head>";
       html += "<table>";
       for(let nom in membres )   {
           html += "<tr>";
           html += "<td>";
           html += membres[nom].prenom;
           html += "</td>";
           html += "<td>";
           html += membres[nom].nom;
           html += "</td>";
           html += "<td>";
           html += membres[nom].telephone;
           html += "</td>";
           html += "<td>";
           html += membres[nom].courriel;
           html += "</td>";
           html += "</tr>";
       }
      
      
       html += "</table>";
       html += '<a title="Vers le formulaire" href="http://127.0.0.1:8081/formulaire"> Vers le formulaire</a>'
       html += "</html>";
       res.end(html);

       });
    
      
    }

);



var server = app.listen(8081,  () => {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})