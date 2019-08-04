request = require('request')
const forecast = (latitude,longitude,callback) =>
{
    const url = 'https://api.darksky.net/forecast/42a3fdd7f106edd83dbcea4b62148195/'+ latitude +','+ longitude + '?units=si'
    request({url, json: true},(error, {body} = response)=>{

        if(error)
        {
            callback('Unable to connect to the web service',undefined)
        }
        else if(body.error)
        {
            callback('Wrong input',undefined)
        }
        else{
                 
            callback(undefined, body.daily.data[0].summary  + ' It is currently ' + body.currently.temperature + ' degree temperature. There is ' + body.currently.precipProbability   + '% chance of rain.')
            
            
        }
    
    
    })
}
module.exports = forecast
