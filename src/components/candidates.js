import React,{Component} from 'react'
class candidates extends Component{
    render(){
        return(
            <div>
                <main className="mt-5 mb-5 text-center">
                    <div className="container-fluid">
                        <div className="row">
                            {
                                this.props.candidates.map((man,key)=>{
                                    return(
                                        <div className="col-lg-3 col-md-4 col-12" key={key}>
                                            <div className="card w-100 mx-auto mt-3 mb-3"  style={{border:"none"}}>
                                                <div className="card-body">
                                                    <img width="150" height="150" className="border border-secondary rounded-circle" src={man.profile}/>
                                                    <h4 className="card-title mt-3">{man.name}</h4>
                                                    <div className="progress w-75 mx-auto">
                                                        <div className="progress-bar bg-secondary" style={{width:`${this.props.percentage[key]}%`}}>{this.props.percentage[key]}%</div>
                                                    </div>
                                                    <p className="card-text mt-2">Votes Collected : {man.votes.toNumber()} / {this.props.total}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
export default candidates