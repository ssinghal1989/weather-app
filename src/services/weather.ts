import httpService from './httpService'
const OpenWeatherAPIKey = 'c021858c7a879df843710ccb688a2966'
const getWeatherInfo = async (coords: any) => {
  return httpService.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&cnt=20&exclude=minutely&units=metric&appid=${OpenWeatherAPIKey}`
  )
}
export const getCityWeather = async (name: string) => {
  return httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${OpenWeatherAPIKey}`)
}
export default getWeatherInfo
