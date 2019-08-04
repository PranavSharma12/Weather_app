const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =  require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


app.set('view engine', 'hbs')
app.set('views' ,viewsPath)
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Pranav'

    })
})

app.get('/about',(req,res) =>
{
    res.render('about',{
        title: 'About Me',
        name: 'Pranav'
    })
})

app.get('/help',(req,res) =>
{
    res.render('help',{
        title: 'Help me',
        name: 'Pranav'
    })
})


app.get('/weather',(req ,res) =>
{
    if(!req.query.address)
    {
        return res.send({
            error: "Please provide the address"
    })
}
geocode(req.query.address,(error,{latitude, longitude, location} = {})=>
{
  if(error){
      return res.send({error})
  }
  forecast(latitude,longitude,(error, forecastData)=>{
      if(error)
      {
          return res.send({error})
      }
      res.send(
          {
              forecast: forecastData,
              location,
              address: req.query.address
          }
      )
  })
})
})



app.get('*', (req,res)=>
{
    res.render("404",{
        title: '404',
        name: 'Pranav',
        errormessage: 'Page not found'
    })
})

app.listen(3000,()=>
{
    console.log('Server is up in 3000 port')
})