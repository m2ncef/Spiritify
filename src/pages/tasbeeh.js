import { useEffect,useState } from "react"
import Explosion from "react-canvas-confetti/dist/presets/explosion";
import { Tab, f7, Link } from "framework7-react"
import { getDatabase, set, ref } from "firebase/database";
import { initializeApp } from "firebase/app";

export default () => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    projectId: "test-65814",
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID
  };
  const app = initializeApp(firebaseConfig)
  function SaveDataToFireBase(){
    set(ref(getDatabase(app), `/Users/${localStorage.getItem("userID")}`),{
        name: localStorage.getItem("name"),
        tasbeehs: localStorage.getItem("counter"),
        city: localStorage.getItem("city"),
        country: localStorage.getItem("country"),
    })
  }
  const [conductor, setConductor] = useState()
  const [name, setName] = useState(localStorage.getItem('name') || ' ');
  const [arrayCounter, setArrayCounter] = useState(0)
  const onInit = ({ conductor }) => {
    setConductor(conductor);
  };
    const ResetCounter = () => {
      const customDialog = f7.dialog.create({
        title: 'Reset Tasbeehs Counter',
        text: 'Are you sure you want to reset your Tasbeehs counter?',
        buttons: [
          {
            text: 'No',
            onClick: () => {
              customDialog.close();
            },
          },
          {
            text: 'Yes',
            onClick: () => {
              f7.dialog.alert('Done 😢');
              localStorage.setItem('counter', 0);
              customDialog.close();
            },
          },
        ],
      });
    
      customDialog.open();
    };
  const arrays = ["اللَّهُ أَكْبَرُ <br/> Allahu Akbar", "لاَ إِلَهَ إِلاَّ اللَّهُ <br/> La-ilaha illallah", "الْحَمْدُ لِلَّهِ <br/> Alhamdulillah", " سُبْحَانَ اللَّهِ <br/> SubhanAllah "]
  useEffect(()=>{
    if( Number(document.querySelector("#CounterTEXT").textContent) <= 9999 && /00/.test(document.querySelector("#CounterTEXT").textContent)){
      document.querySelector("#topTEXT").textContent = `Mashallah ${localStorage.getItem('name')}, Keep going !!`
      conductor?.shoot();
    }
    if(arrayCounter === 4){
      setArrayCounter(0)
    }
    if(Number(localStorage.getItem('counter')) >= 9999){
      localStorage.setItem("counter", 0)
    }
    const handleStorageChange = () => {
      setName(localStorage.getItem('name') || ' ');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  })
    return (
      <Tab tabActive id="tasbi7" style={{textAlign: 'center', position:'relative', top:'-3vh'}}>
      <Explosion onInit={onInit} />
        <h2 id="topTEXT">Salam {name} !</h2>
        <p id='InnerTEXT'>You ready to start<br/><font>your tasbeeh?</font></p>
        <br/>
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 300 300">
        <defs>
          <style type="text/css">@import url('https://fonts.cdnfonts.com/css/ds-digital');</style>
        </defs>
            <rect x="15%" y="2.5%" width="70%" height="95%" rx="60" ry="65" stroke="#1f644a" fill="#58b592" strokeWidth="5"/>
            <rect x="85" y="50" width="130" height="80" rx="10" ry="10" fill="#83aa9b" stroke="#333" strokeWidth="2" />
          <text id='CounterTEXT' style={{fontFamily: "'DS-Digital', sans-serif"}} x="150" y="110" fontSize="65" fill="#333" textAnchor="middle">{localStorage.getItem("counter")}</text>
          <circle cx="150" cy="220" r="40" fill="#1f644a" stroke="#333" strokeWidth="0" onClick={()=>{
          SaveDataToFireBase()
          document.querySelector("#InnerTEXT").innerHTML = arrays[arrayCounter]
          setArrayCounter(arrayCounter + 1)
          localStorage.setItem("counter", Number(localStorage.getItem("counter"))+1)
          document.querySelector("#topTEXT").textContent = "Keep repeating..."
        }} />
          <rect x="210" y="160" width="20" height="20" rx="5" ry="5" fill="#1f644a" stroke="#333" strokeWidth="1" onClick={ResetCounter} />
          <text x="220.5" y="155" fontFamily="Arial, sans-serif" fontSize="10" fill="#333" textAnchor="middle">Reset</text>
        </svg>
        <br/><br/><br/>
        <Link href='/rank/' text="Check Your Rank"></Link>
      </Tab>
    )
}