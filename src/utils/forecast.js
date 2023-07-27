const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e3c05d66d74be68eec6f32fdf5e2d376&query=${latitude},${longitude}&units=m`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]} it's currently ${body.current.temperature} degree out. it feels like ${body.current.feelslike} degrees out.`)
        }
    })
};

module.exports = forecast;