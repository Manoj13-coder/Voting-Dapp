import React,{Component} from "react"
class NotFound extends Component{
    render(){
        return(
        <div>
            <div className="card" style={{height : "80vh" , width : "100vw" , border : "none"}}>
               <div className="card my-auto mx-auto" style={{border : "none"}}>
                    <img style={{height : "50vh"}} className="card-img" src="https://media.giphy.com/avatars/404academy/kGwR3uDrUKPI.gif"/>
               </div>
            </div>
        </div>
        );
    }
}
export default NotFound;