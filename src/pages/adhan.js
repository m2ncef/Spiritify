import { useEffect, useState } from "react"
import { List, Tab } from "framework7-react"
export default () => {
  const [adhans, setAdhans] = useState([])
  const [today, setToday] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(()=>{
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  },[])
    return (
        <Tab id="adhan">
        {useEffect(()=>{
          fetch(`https://api.aladhan.com/v1/timingsByCity?city=${localStorage.getItem("city")}&country=${localStorage.getItem("country")}`)
          .then(response => response.json())
          .then(data => {
            setToday(`${data.data.date.hijri.weekday.en} ${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`)
            const Adhans = []
            for(const key in data.data.timings){
              Adhans.push({
                Adhan: key,
                time: data.data.timings[key]
              })
            }
            setAdhans(Adhans)
          })
        }, [localStorage.getItem("city"), localStorage.getItem("country")])}
        <div className="AdhanTab">
          <div className="AdhanBG">
            <img src="https://svgsilh.com/svg/2069853.svg"></img>
          </div>
          <div className="adhanTopContainer">
              <h4>{localStorage.getItem("city")}</h4>
              <h1>{currentTime.toLocaleTimeString('en-US', { hour12: false })}</h1>
          </div>
          <div className="Today">
              <h4>Today</h4>
              <h5>{today}</h5>
            </div>
          <div className="adhanCardsContainer">
            {adhans.map((adhan)=>{
              return <div className="AdhanCard">
                      <h3>{adhan.Adhan}</h3>
                      <h4>{adhan.time}</h4>
                    </div>
            })}
            <br/>
            <br/>
          </div>
        </div>
      </Tab>
    )
}