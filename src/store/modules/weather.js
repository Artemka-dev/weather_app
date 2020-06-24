export default {
    actions: {
        async fetchWeather({commit}, {city_name}) {
            const api_key = "296a5c3ac5d08b752f0ac07c91bee57a"

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}&units=metric`)
                const data = await response.json()

                commit("setWeather", data)
            } catch (error) {
                throw error
            }
        }
    },
    state: {
        weatherObj: null,
        today: null,
        monthes: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    mutations: {
        setWeather(state, response) {
            state.weatherObj = response
        }
    },
    getters: {
        getWeather(state) {
            return state.weatherObj
        },
        getDateToday(state) {
            // 20 Monday January 2020
            const dateObj = new Date()

            state.today = `${dateObj.getDate()} ${state.days[+dateObj.getDay()]} ${state.monthes[+dateObj.getMonth()]} ${dateObj.getFullYear()}`
            return state.today
        }
    }
}