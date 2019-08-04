const request = require('request')

const geocode = (address,callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiMTdiY3MyODAwIiwiYSI6ImNqeWoxY3R4MzBlenEzbHFpaDVtMjd3dzkifQ.ODtWgt1PQcaCC24EhzV6tA'
    request({url,json: true},(error,{body} = response) =>
    {
        if(error)
        {
            callback('Unable to connect to the web server')
        }
        else if(body.features.length === 0)
        {
            callback('Location is not found')
        }
        else{
            callback(undefined,{
                latitude:  body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            })
        }
    })
}

module.exports = geocode