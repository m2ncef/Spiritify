import { useEffect } from 'react'
import packageJson from '../../package.json'
export default () => {
    useEffect(()=>{
        setTimeout(function(){
            document.querySelector(".FSloader").style.display = "none"
        }, 2000)
    })
    return (
        <div className="FSloader">
            <h2>{packageJson.name}</h2>
            <h5>بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h5>
        </div>
    )
}