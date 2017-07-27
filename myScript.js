/*This is my script for the open weather API*/

var $theButton = $("#myButton");
$theButton.on("click", getWeather);

function getWeather() {
    var $city = $("#theCity");
    var theAPICall = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +$city.val()+"&mode=json&units=metric&appid=82c31a0ba4bed68c984fc02175d96529&cnt=7";
    $.getJSON(theAPICall)
    .done(function(data){
        console.log(data); 
        $("#imageToday").attr("src", "http://openweathermap.org/img/w/"+data.list[0].weather[0].icon+
        ".png");
        
        //$("#highToday").html("<p class='red'>"+data.list[0].temp.max+"</p>");
        $pHigh = $("<p>");
        $pHigh.text( data.list[0].temp.max );
        $pHigh.addClass("red");
        $("#highToday").append($pHigh);
        
        //$("#lowToday").html("<p class='blue'>"+data.list[0].temp.min+"</p>");
        $pLow = $("<p>");
        $pLow.text(data.list[0].temp.min);
        $pLow.addClass("blue");
        $("#lowToday").append($pLow);
        
        //$("#dayDescription").html("<p class='gray italic'>"+data.list[0].weather[0].description+"</p>");
        $pDesc = $("<p>");
        $pDesc.text(data.list[0].weather[0].description);
        $pDesc.addClass("gray");
        $pDesc.addClass("italic");
        $("#dayDescription").append($pDesc);
        
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var D = [];
        for (var i=1; i<=3; i++) {
            D.push(new Date(data.list[i].dt * 1000));
            var dd = D[i-1];
            $("#r"+(i)+"c1").html(days[dd.getDay()]);
            $("#r"+(i)+"c2").attr("src", "http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+
        ".png");
            $("#r"+(i)+"c3").html(getDegreeString(data.list[i].temp.max));
            $("#r"+(i)+"c3").addClass("red");
            $("#r"+(i)+"c4").html(getDegreeString(data.list[i].temp.min));
            $("#r"+(i)+"c4").addClass("blue");
            
        }
      
    })
    .fail(function(){
        $("#dayDescription").html("Can't load the weather right now, please try it later.");
    });
    
    function getDegreeString(deg) {
        return deg + "&#176;" + "C";
    }
}