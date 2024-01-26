import { useEffect } from "react"
import { Tab, Button } from "framework7-react"
export default () => {
    return (
      <Tab id="ayat">
        {useEffect(()=>{
          const randomNumber = Math.floor(Math.random() * 1000) + 1;
          fetch(`https://api.alquran.cloud/v1/ayah/${randomNumber}/ar.asad`)
          .then(response => response.json())
          .then(response => {
            document.querySelector("#ayah").innerHTML = response.data.text
            document.querySelector("#surah").innerHTML = response.data.surah.name
            document.querySelector("#surahEN").innerHTML = response.data.surah.englishName
          })
        })}
        <h2>Random Ayah</h2><br/>
        <h3 id='ayah'></h3><br/>
        <p><font id='surah'></font> / <font id='surahEN'></font></p>
        <br/>
        <Button style={{maxWidth:'50%', display:'inline-block'}} fill onClick={()=>{
          const randomNumber = Math.floor(Math.random() * 1000) + 1;
          fetch(`https://api.alquran.cloud/v1/ayah/${randomNumber}/ar.asad`)
          .then(response => response.json())
          .then(response => {
            document.querySelector("#ayah").innerHTML = response.data.text
            document.querySelector("#surah").innerHTML = response.data.surah.name
            document.querySelector("#surahEN").innerHTML = response.data.surah.englishName
          })
        }}>New Ayah</Button>
      </Tab>
    )
}