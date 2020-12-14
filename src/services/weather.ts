import httpService from './httpService'
const OpenWeatherAPIKey = '5a536589f320bf1dde279d8eb46f6f94'
const getWeatherInfo = async (coords: any) => {
  return httpService.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&cnt=20&exclude=minutely&units=metric&appid=${OpenWeatherAPIKey}`
  )
}
export const getCityWeather = async (name: string) => {
  return httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${OpenWeatherAPIKey}`)
}
export default getWeatherInfo
