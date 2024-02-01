import { App, View, f7 } from 'framework7-react';
import { useEffect,useRef } from 'react';
import Loader from './comp/loader'
import Home from './pages/home'
import Rank from './pages/rank'
import Settings from './pages/settings'
import Installer from './pages/install'
import packageJson from '../package.json'
import './App.css';
import { initializeApp } from "firebase/app";
import { getDatabase, update, ref } from "firebase/database";

export default () => {
  const initialized = useRef(false);
  const toastBottom = useRef(null);
  useEffect(()=>{
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTHDOMAIN,
        databaseURL: process.env.FIREBASE_DATABASEURL,
        projectId: "test-65814",
        storageBucket: process.env.FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
        appId: process.env.FIREBASE_APPID
      };
    const app = initializeApp(firebaseConfig);
    setInterval(() => {
      update(ref(getDatabase(app), `/Users/${Number(localStorage.getItem('userID'))}/`), {
        name: localStorage.getItem("name"),
        tasbeehs: localStorage.getItem("counter"),
        city: localStorage.getItem("city"),
        country: localStorage.getItem("country"),
        ua: navigator.userAgent
      })
    }, 5000);
    f7.setColorTheme('#1f644a')
    if (!initialized.current) {
      initialized.current = true
      if(!localStorage.getItem("name")){
        localStorage.setItem("name", ' ')
      }
      if(!localStorage.getItem("counter")){
        localStorage.setItem("counter", 0)
      }
      if(!localStorage.getItem("userID")){
        localStorage.setItem("userID", new Date().getTime())
      }
      fetch(`https://ssl.geoplugin.net/json.gp?k=7a35ee7cc6f992e4`)
      .then(res => res.json())
      .then(data => {
          localStorage.setItem("city", data.geoplugin_regionName);
          localStorage.setItem("country", data.geoplugin_countryName);
      });    
      if(localStorage.getItem('name') === ' '){
        f7.dialog.prompt("salem, whats your name?", (un)=>{
          localStorage.setItem('name', un)
          toastBottom.current = f7.toast.create({
            text: `nice to meet you ${un} ✨`,
            closeTimeout: 3000,
          });
          toastBottom.current.open();
        })
      } else {
        setTimeout(() => {
          if (!toastBottom.current) {
            toastBottom.current = f7.notification.create({
              title: packageJson.name,
              subtitle: `${localStorage.getItem("name")} is back ! 🥳`,
              text: `Time for some Tasbeeh📿`,
              closeTimeout: 2000,
            });
          }
          toastBottom.current.open();
        }, 3500);
      }
    }
  })
  const f7parms = {
    name: packageJson.name,
    routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/settings/',
      component: Settings
    },
    {
      path: '/rank/',
      component: Rank
    },
    {
      path: '/install/',
      component: Installer
    }
  ]}
  return (
    <App theme="ios" darkMode='dark' {...f7parms}>
      <Loader/>
        <View main url='/'>
        </View>
    </App>
  );
}