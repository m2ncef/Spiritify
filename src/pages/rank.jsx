import { initializeApp } from "firebase/app";
import { getDatabase, get, child, ref } from "firebase/database";
import { Block, BlockFooter, Page, Card, CardContent, Link, BlockHeader } from 'framework7-react'
import Nav from '../comp/nav'
import RankingCard from "../comp/RankingCard";
import { useEffect, useRef, useState } from "react";

export default () => {
    const initialized = useRef(false)
    const [arr, setArr] = useState([])
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
    useEffect(()=>{
        if(document.getElementById(localStorage.getItem("userID"))){
            var id = document.getElementById(localStorage.getItem("userID")).children[0].textContent
            localStorage.setItem("index", id)
            document.querySelector("#userRanking").innerHTML = localStorage.getItem("index")
            document.querySelector(".rankingSkeleton").style.display = 'none'
        }
    })
    var competitors = [];
    if(!initialized.current){
        initialized.current = true
        get(child(ref(getDatabase(app)),'/Users/')).then((snapshot)=>{
            var data = snapshot.val()
            for(const key in data){
                if(data[key].name != " " && Number(data[key].tasbeehs) >= 10 && parseInt(data[key].time) > 0){
                    competitors.push(
                    {
                        'name': data[key].name,
                        'city': data[key].city,
                        'country': data[key].country,
                        'tasbeehs': data[key].tasbeehs,
                        'time': data[key].time,
                        'id':key
                    })
                }
                else {
                    competitors.push(
                        {
                            'name': data[key].name,
                            'city': data[key].city,
                            'country': data[key].country,
                            'tasbeehs': data[key].tasbeehs,
                            'time': data[key].time,
                            'id':key,
                            'unranked': true
                        })
                }
            }
            setArr(competitors)
        })
    }
    return (
        <>
        <Page name='rank'>
        <Nav ShowGear='0' ShowBack='1' Fixed />
            <Block strong>
                <div style={{padding:"2vh", top:'3vh', position:'relative', display:'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-around'}}>
                    <img style={{ borderRadius:'50%', height:'10vh', width:"10vh", alignSelf:"center" }} alt="avatar" src={process.env.PUBLIC_URL + '/avatar.jpeg'} />
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', fontFamily:'Secular One', flexBasis:'40%'}}>
                        <div style={{ marginLeft:"2vh",marginTop:"1vh",position:"relative" }}>
                            <h2>{localStorage.getItem("name")}</h2>
                            <h5>Tasbeehs</h5>
                            <h4>{localStorage.getItem("counter")}</h4>
                        </div>
                    </div>
                    <div id="userRanking"></div>
                    <div className="rankingSkeleton skeleton-text skeleton-effect-wave">▉▉</div>
                </div>
                <BlockFooter>Get a minimum of 10 Tasbeehs & 1 minute to enter to the ranking list</BlockFooter>
            </Block>
            <Block className="RankList">
                <RankingCard sklt ></RankingCard>
                <RankingCard sklt ></RankingCard>
                <RankingCard sklt ></RankingCard>
                {
                    arr.sort((a, b) => b.tasbeehs - a.tasbeehs).map((item, index) => {
                        document.querySelectorAll(".skeleton-text").forEach((el) => (el.style.display = "none"));
                        const formattedIndex = (index).toString().padStart(3, '0');
                        return <RankingCard class={!item.unranked ? '' : 'hideCard'} id={item.id} Index={formattedIndex} Name={item.name} City={item.city} Country={item.country} Score={parseInt(item.tasbeehs)} />;  
                    })
                }
                <div>
                    <br/>
                </div>
            </Block>
        </Page>
        </>
        )
}