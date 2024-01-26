import { Link } from "framework7-react"
import PackageJson from '../../package.json'
export default (props) => {
    return (
        <div className={`nav ${props.Fixed && 'navFixed'}`}>
            <div>
                <Link href='/' back style={{ opacity: `${props.ShowBack}` }} iconIos="f7:arrow_left"></Link>
            </div>
            <h2 style={{ opacity:`${props.ShowText}` }}>{PackageJson.name}</h2>
            <div>
                <Link href='/settings/' style={{ position:'relative', left:'1vh', opacity:`${props.ShowGear}` }} iconIos="f7:gear"></Link>
            </div>
        </div>
    )
}