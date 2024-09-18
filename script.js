let weather={
    apikey: "9685d744857af0e2a71f4829a75e54ec",

    fetchweather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apikey + "&units=metric")        
            .then((response) => {
            if(!response.ok){
                alert("NO Weather Found");
                return;
            }
            return response.json();

        })
        .then((data) => this.displayweather(data));
    },

    displayweather: function(data){
       console.log(data);
       const {name} = data;
       const {temp, humidity} = data.main
       const {icon, description} = data.weather[0];
       const {speed} = data.wind;

       document.querySelector(".city").innerText ="weather in " + name;
       document.querySelector(".temp").innerText =temp + " °C ";
       document.querySelector(".weather_icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

       document.querySelector(".description").innerText = description;
       document.querySelector(".humidity").innerText ="Humidity:" + humidity +"%";
       document.querySelector(".wind").innerText ="Wind-Speed: " + speed +"km/h";

       //------------------------------------------------------------------//
       var apiUrl = "https://pixabay.com/api/?key=45995185-fd8cc87c64d5de5b7d4f62374&q=" + name+"&image_type=photo";
       fetch(apiUrl)
       .then(response =>{
        if(!response.ok){
            alert("NO Response");
            return;
        }
        return response.json();

       })
       .then((data) => {
        console.log(data);
        const imageUrl = data.hits[0].largeImageURL;
        document.body.style.backgroundImage = "URL("+imageUrl+")";
       });
    },

    search: function(){
        this.fetchweather(document.querySelector(".search-bar").value);
    },
};
document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});
weather.fetchweather("goa");