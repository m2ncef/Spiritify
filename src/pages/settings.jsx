import { f7, Page, Block, BlockTitle, List, ListInput, Link, Button, ListItem, Toggle, BlockHeader, BlockFooter } from 'framework7-react'
import packageJson from '../../package.json'
import { useEffect } from 'react'
import { getDatabase, set, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import Nav from '../comp/nav'

export default () => {
    const ResetAll = () => {
        const customDialog = f7.dialog.create({
            title: 'Reset All Settings',
            text: 'Are you sure you want to reset all your settings ? this includes all your data.',
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
                  localStorage.clear()
                  setTimeout(function(){
                    window.location.reload();
                  }, 3000)
                },
              },
            ],
          });
        customDialog.open();
    }
    const Soon = () => {
        const dialog = f7.dialog.create({
            text: 'this function will be added to Spiritify soon, currently working on it 👍',
            buttons: [{
                text: 'Okay',
                onClick: ()=>{
                    dialog.close()
                }
            }]
        })
        dialog.open()
    }
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: "test-65814.firebaseapp.com",
        databaseURL: "https://test-65814-default-rtdb.firebaseio.com",
        projectId: "test-65814",
        storageBucket: "test-65814.appspot.com",
        messagingSenderId: "501710770819",
        appId: "1:501710770819:web:a6f1894d9e443138ef01b6"
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
    useEffect(()=>{
        document.querySelector("#pName").querySelector("input").value = localStorage.getItem("name")
        document.querySelector("#pCity").querySelector("input").value = localStorage.getItem("city")
        document.querySelector("#pCountry").querySelector("input").value = localStorage.getItem("country")
    })
    return(
        <Page name='settings'>
            <Nav ShowText='0' ShowGear='0'/>
            <Block className='dev'>
                <img alt='Logo' src={process.env.PUBLIC_URL + '/icon.jpg'}/>
                <h2>{packageJson.name}</h2>
                <h4>v{packageJson.version} - Developed by <Link external href='https://instagram.com/m2ncef'>moncef</Link></h4>
                <div className='SocialSettings'>
                    <Link external href='mailto:moncxf@icloud.com'><i className="fa fa-envelope-o"></i></Link>
                    <Link external href='https://github.com/m2ncef'><i className='fa fa-github'></i></Link>
                    <Link external href='https://instagram.com/m2ncef'><i className='fa fa-instagram'></i></Link>
                    <Link external href='https://telegram.me/moncxf'><i className='fa fa-telegram'></i></Link>
                    <Link external href='https://wa.me/+213793480662'><i className='fa fa-whatsapp'></i></Link>
                </div>
                <BlockHeader>Allocated size of the localStorage is {Object.keys(localStorage).reduce((size, key) => size + ((localStorage[key].length * 2) / 1024), 0).toFixed(2)}KB</BlockHeader>
            </Block>
            <Block className='profileBlock' title='Your Profile'>
                <BlockTitle>Your Profile</BlockTitle>
                <List strongIos dividersIos insetIos>
                    <ListInput label={'Your Name'} id={'pName'} type='text' placeholder='Your Name' clearButton></ListInput>
                    <ListInput label={'Your City'} id={'pCity'} type='text' placeholder='Your City (For Prayer Time)' clearButton></ListInput>
                    <ListInput label={'Your Country'} id={'pCountry'} type='text' placeholder='Your Country (For Prayer Time)' clearButton></ListInput>
                    <ListInput label={'Your ID'} value={localStorage.getItem("userID")} type='text' disabled></ListInput>
                    <ListInput label={'Total Tasbeehs'} value={localStorage.getItem("counter")} type='text' disabled></ListInput>
                    <br></br>
                <Button back href='/home/' tonal onClick={()=>{
                        localStorage.setItem("name", document.querySelector("#pName").querySelector("input").value)
                        localStorage.setItem("city", document.querySelector("#pCity").querySelector("input").value)
                        localStorage.setItem("country", document.querySelector("#pCountry").querySelector("input").value)
                        SaveDataToFireBase()
                }}>Save</Button>
                </List>
            </Block>
            <Block>
                <BlockTitle>General</BlockTitle>
                <List strongIos dividersIos insetIos>
                    <ListItem onClick={Soon} href='/settings/' title={'Language'} after={'English'} ></ListItem>
                    <ListItem onClick={Soon} >
                        <span>Dark Mode</span>
                        <Toggle disabled checked></Toggle>
                    </ListItem>
                    <ListItem onClick={Soon} href='/settings/' title={'Color Themes'} after='Green'></ListItem>
                </List>
            </Block>
            <Block>
                <BlockTitle>Reset</BlockTitle>
                <List style={{ color:'red' }} simpleList strongIos dividersIos insetIos>
                    <ListItem onClick={()=>{
                        localStorage.setItem("counter", 0)
                        window.location.reload()
                    }} title={'Reset Tasbeeh counter'}/>
                    <ListItem onClick={()=>{
                        localStorage.setItem("city", " ")
                        localStorage.setItem("country", " ")
                        window.location.reload()
                    }} title={'Reset Adhan Location'}/>
                    <ListItem onClick={ResetAll} title={'Reset All Settings'}/>
                <BlockFooter>If you lost your data and you want it back, feel free to <Link external target='_blank' href='https://instagram.com/m2ncef'>dm me</Link></BlockFooter>
                </List>
            </Block>
        </Page>
    )
}