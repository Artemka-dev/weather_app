<template lang="pug">
    #app(:class="typeof weather.degrees !== 'undefined' && +weather.degrees >= 20 ? 'warm' : ''")
    
        section
            Form(@open_weather="keySubmit")
            //- ° - option + о

            .location-weather(v-if="city_name")
                .location {{ city_name }}
                //- .location-date 20 Monday January 2020
                .location-date {{ weather.date }}

                .weather-wrapper
                    .temp {{ weather.degrees }}°c
                
                //- .weather-status {{ status }}
                .weather-status 
                    img(:src="image").status
                    .weather-windSpeed Wind Speed: {{ weather.wind }} m/s
                    .weather-windSpeed Humidity: {{ weather.humidity }}%
</template>

<script>
import Form from "@/components/Form"
import statuses from "./statusesObject"

export default {
    name: 'App',
    components: {Form},
    data: () => ({
        city_name: "",
        weather: {},

        image: null,
        statusesObject: null
    }),
    async mounted() {
        this.statusesObject = statuses
    
        try {
            const res = await fetch("https://api.ipdata.co/?api-key=b3878fae71f27e7aff0da696ad28c54def4ddac56ab6f05c54685a8d")
            const js = await res.json()

            await this.$store.dispatch("fetchWeather", {city_name: js.city + ", " + js.country_code})
            const data = this.$store.getters.getWeather
            this.setData(data)
        } catch (error) {
            throw error
        }
    },
    methods: {
        async keySubmit(city) {
            try {
                await this.$store.dispatch("fetchWeather", {city_name: city})
                const data = this.$store.getters.getWeather

                this.setData(data)
            } catch (error) {}
            
        },
        setData(data) {
            this.city_name = data.name + ", " + data.sys.country
            this.weather = {status: data.weather[0].main, degrees: Math.floor(data.main.temp), wind: (data.wind.speed * 1 / 3.6).toFixed(2), humidity: data.main.humidity, date: this.$store.getters.getDateToday}

            const getImage = this.statusesObject[this.weather.status]
            console.log(data.weather[0].description)

            if (typeof getImage === "object") {
                const image = getImage[data.weather[0].description]

                if (image) { this.image = image } 
                else { this.image = this.statusesObject[this.weather.status]['default'] }

            } else {
                this.image = getImage
            }
        }
    }
}
</script>

<style lang="scss">

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    body {
        font-family: "Montserrat", sans-serif;
    }

    #app {
        background-image: url("./assets/cold-bg.jpg");
        background-size: cover;
        background-position: bottom;
        transition: .4s;
    }


    #app.warm {
        background-image: url("./assets/warm-bg.jpg");

    }

    .warm, .cold {
        background-size: cover;
        background-position: bottom;
        transition: .4s;
    }


    section {
        min-height: 100vh;
        padding: 2rem;

        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
    }

    .location {
        font-size: 35px;
        color: whitesmoke;
        text-align: center;

        margin-top: 40px;
        font-style: normal;
    }

    .location-date {
        color: #ccc;
        font-size: 18px;
        font-style: italic;
        text-align: center;
    }

    .weather-wrapper {
        text-align: center;
        margin-top: 3rem;
    }

    .temp {
        display: inline-block;
        color: #fff;
        font-weight: bold;
        font-size: 105px;

        background-color: rgba(255, 255, 255, .25); 
        padding: 20px 25px;

        border-radius: 20px;

        text-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

    }

    .weather-status {
    
        text-align: center;
    }

    .weather-windSpeed {
        color: #fff;
        font-weight: 400;

        font-size: 20px;
        margin-bottom: 10px;
        font-style: italic;
    }

    .status {
        width: 150px;
        height: auto;

        margin: 30px auto;
    }

</style>
