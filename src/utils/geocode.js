const request = require('request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic29udS0xMjMiLCJhIjoiY2xnNTBsZHA1MDF6ZTNmcDZsazViN2I3cCJ9.LFdK2InWp6O1j_cBPII_gA&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find Location. Try again search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
};


module.exports = geocode;