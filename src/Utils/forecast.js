const request = require('request')

const forecast = (lat, lon , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=532c5723bb334783bf057c2feee39eae&query=' + lon + ',' + lat + '&units=m'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            const error = 'Unable to connect to weather service!'
            callback(error,undefined)
            } 
            else if (body.error) {
            const error = 'Unable to find location'
            callback(error,undefined)
            } else
            {
              const data = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 
                      ' degrees out.It feels like ' + body.current.feelslike + ' degrees out.' 
            callback(undefined,data)           
            }
}
)
}
module.exports = forecast