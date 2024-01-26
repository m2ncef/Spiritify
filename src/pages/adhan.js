import { useEffect } from "react"
import { Tab } from "framework7-react"
export default () => {
    return (
        <Tab id="adhan">
        {useEffect(()=>{
          fetch(`https://api.aladhan.com/v1/timingsByCity?city=${localStorage.getItem("city")}&country=${localStorage.getItem("country")}`)
          .then(response => response.json())
          .then(data => {
            document.querySelector("#fajr").innerHTML = data.data.timings.Fajr
            document.querySelector("#sunrise").innerHTML = data.data.timings.Sunrise
            document.querySelector("#dhuhr").innerHTML = data.data.timings.Dhuhr
            document.querySelector("#asr").innerHTML = data.data.timings.Asr
            document.querySelector("#maghrib").innerHTML = data.data.timings.Maghrib
            document.querySelector("#isha").innerHTML = data.data.timings.Isha
          })
        })}
        <h2>Prayer Times</h2>
        
        <div>
          <h4>Fajr: <font id='fajr'></font></h4>
          <h4>Sunrise: <font id='sunrise'></font></h4>
          <h4>Dhuhr: <font id='dhuhr'></font></h4>
          <h4>Asr: <font id='asr'></font></h4>
          <h4>Maghrib: <font id='maghrib'></font></h4>
          <h4>Isha: <font id='isha'></font></h4>
        </div>
      </Tab>
    )
}