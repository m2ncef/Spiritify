import { Card, Link } from "framework7-react"
export default (props) => {
    if(props.sklt){
        return(
            <Card className="skeleton-text skeleton-effect-wave rankCard">
                    <div>
                        <h1>▉▉</h1>
                    </div>
                    <div>
                        <h4>▉▉▉▉▉▉</h4>
                        <h5>▉▉▉▉▉▉▉▉▉▉</h5>
                    </div>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <h4>&nbsp;&nbsp;▉▉▉</h4>
                    </div>
            </Card>
        )
    } else{
        return(
            <Card style={props.style} id={props.id} className={`rankCard ${props.class}`}>
                    <div>
                        <h1>{props.Index}</h1>
                    </div>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:"center"}}>
                        <img style={{width:"6vh", height:"6vh", borderRadius:'50%', margin:"0vh 2vh"}} src={process.env.PUBLIC_URL + '/avatar.jpeg'} ></img>
                        <div>
                            <h4>{props.Name}</h4>
                            <h5>{props.City}<br/>{props.Country}</h5>
                        </div>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <Link style={{fontFamily:'Secular One', fontSize:'large'}} text={props.Score}>
                                <i className="fa fa-praying-hands"></i>
                            </Link>
                        </div>
                    </div>
            </Card>
        )
    }
}