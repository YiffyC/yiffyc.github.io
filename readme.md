## Site de l'agenda du sommeil

### Données 
Les données de sommeil sont à charger dans le fichier *apachecal.js* sous la forme suivante, dans le bon *if (y == année) {...}* :
`[echarts.format.formatTime('yyyy-MM-dd', (echarts.number.parseDate('2020-01-26'))), 9.75],`

### Thème
Une fois le fichier javascript du thème enregistré dans le dossier *js/theme*, le changement du thème se fait à deux endroits dans le code, un premier appel dans le *index.html*, dans cet exemple, le thème est _purple-passion_:
`<script type="text/javascript" src="js/themes/purple-passion.js"></script>` 

et dans le *apachecal.js* :
`var myChart = echarts.init(dom, 'purple-passion', {`

### Issues github
Les issues s'affichent dans la balise `<div id="github-issues"></div>`. Le code qui génère le texte et pull depuis github se trouve dans le *index.html*:

```javascript
<script>
    //récupérer les issues
    var urlToGetAllOpenBugs = "https://api.github.com/repos/YiffyC/Agenda-du-so/issues?state=open";

    $(document).ready(function () {
        $.getJSON(urlToGetAllOpenBugs, function (allIssues) {
            $("div#github-issues").append("<h5>Il y a  " + allIssues.length + "  issues en cours actuellement:</h5></br>");
            $.each(allIssues, function (i, issue) {


                // Get assignee (if applicable)
                var assigneeName = "YiffyC";
                if (issue.assignee) {
                    assigneeName = issue.assignee.login;
                }


                // Calculate number of days ago created
                var today = new Date();
                var timeDifference = today - Date.parse(issue.created_at);
                var daysAgo = (timeDifference / (1000 * 3600 * 24)).toFixed();


                $("div#github-issues")
                    .append("<div style=\"margin-bottom:20px;\">")
                    .append("<strong><a class='grad' href=\"" + issue.html_url + "\">" + issue.title + "</a></strong></br>")
                    .append(" Ouvert il y a  " + daysAgo + " Jours, ")
                    .append("assign&eacute; &agrave;: " + assigneeName)
                    .append("</div>");
            });
        });
    });
</script>
``` 

### Responsive

Le responsive du site est géré par les classes *W3*. Pour le calendrier, je modifie la hauteur du contenneur en fonction de la hauteur de l'écran :

```javascript
/* largeur d'écan minimale pour que le calendrier s'affiche normalement */
const minScreenWidth = 700;

/* la taille de la balise*/
 if (screen.width < minScreenWidth ) {
        document.getElementById("container").style.height="3500px";
        /*var c = screen.width/7; //on centre comme un connard
        var s = c+"px"
        document.getElementById("container").style.left = s;*/
    }
    else
    {
        document.getElementById("container").style.height="1200px";
        
    }
```

### A faire
[] Dark mode
[]  