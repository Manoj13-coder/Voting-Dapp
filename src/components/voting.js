import React,{Component} from "react";
import Toppers from './Topper.jpg';
import $ from "jquery";
window.jQuery = $;
class voting extends Component{
    Elect = (event) =>{
        event.preventDefault();
        const x = document.getElementById('SELECT').value
        if(!x){
            alert("Please select candidate !!");
            return;
        }
        this.props.access.methods.Vote(x).send({from : this.props.account,gas: 1500000,gasPrice : 100}).on('confirmation',(receipt) =>{
	    	this.setState({Loading : false})
            window.location.reload()
	    })
    }
    render(){
        return(
            <div>
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-12 text-center justify-content-center mt-5 mb-5">
                                <div className="alert alert-warning alert-dismissible w-75 mx-auto">
                                    <strong>Use Ropsten test faucets if you want to vote . Only Owner can add candidates . User only allowed to vote ones .</strong>
                                </div>
                                <h4>Select Candidate</h4>
                                <small><i className="fa fa-user" data-toggle="tooltip" title="Current Account"></i> : {this.props.account}</small><br/>
                                <select className="w-75 mt-5" id="SELECT" required>
                                    {
                                        this.props.candidates.map((names,key)=>{
                                            return(
                                                <option key={key}>{names.name}</option>
                                            );
                                        })
                                    }
                                </select><br/>
                                <button className="btn btn-secondary mt-4 w-25" type="button" id="vote" onClick={this.Elect}>Vote</button>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="bg-light text-center">
                    <div>
                        <h3>Contact Me</h3>
                        <div id="Socials">
                            <a href="https://www.linkedin.com/in/manoj-kumar-200170197" className="fa fa-linkedin text-decoration-none text-dark"></a>
                            <a href="https://github.com/Manoj13-coder" className="fa fa-github text-decoration-none text-dark"></a>
                        </div>
                    </div>
                    <p>Thanks for your nice visit and I hope you like my project.<br/>
                        <q>Have a nice day</q></p>
                </footer>
            </div>
        );
    }
}
export default voting