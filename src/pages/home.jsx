import Nav from '../comp/nav'
import Adhan from '../pages/adhan'
import Ayat from '../pages/ayat'
import Tasbeeh from '../pages/tasbeeh'
import Adhkar from '../pages/adhkar'
import {Page, Link, Tabs, Toolbar, f7} from 'framework7-react'

export default ()=>{
    return(
    <>
    <Page name='home'>
        <Nav ShowBack='0' />
        <Toolbar tabbar icons bottom>
          <Link text='Tasbeeh' tabLinkActive iconIos='f7:speedometer' tabLink="#tasbi7"></Link>
          <Link text='Ayat' iconIos='f7:book' tabLink="#ayat"></Link>
          <Link text='Adhan' iconIos='f7:alarm' tabLink="#adhan"></Link>
          <Link text='Adhkar' iconIos='f7:snowflake' tabLink="#adhkar"></Link>
        </Toolbar>
        <Tabs>
          <Tasbeeh />
          <Ayat />
          <Adhan />
          <Adhkar />
        </Tabs>
    </Page></>
    )
}