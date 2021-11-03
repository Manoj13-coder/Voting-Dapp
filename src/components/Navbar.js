import React from 'react'
import $ from "jquery";
import {Link} from 'react-router-dom';
window.jQuery = $;
class Navbar extends React.Component{
    componentDidMount(){
        $("#Modal").hide();
        $("#Vote-Success").hide();
        $("#Vote-Failed").hide();
        $(document).ready(function(){
            $("#Add").click(function(){
                $("#Modal").fadeIn();
                $("li").hide();
            });
            $("#cancel").click(function(){
                $("#Modal").fadeOut();
                $("li").show();
            });
        });
    }
    Collect = () =>{
        const image = document.getElementById('upload').value;
        const name = document.getElementById('name').value;
        if(!image || !name){
            window.alert("Insufficient Data");
            return;
        }
        this.props.access.methods.add(name,image).send({from : this.props.account,gas: 1500000,gasPrice: 100}).on('confirmation',(reciept) =>{
            window.location.reload()
	    })
    }
    render(){
        return(
            <div>
                <nav>
                    <h3>Voting Dapp</h3>
                    <label className="fa fa-bars" htmlFor="bars" id="Label"></label>
                    <input type="checkbox" id="bars"/>
                    <ul>
                        <li><Link className="btn text-decoration-none text-dark" to="/Home">Home</Link></li>
                        <li><Link className="btn text-decoration-none text-dark" to="/Candidates">Candidates</Link></li>
                        <li><Link className="btn text-decoration-none text-dark" to="/History">History</Link></li>
                        <li><Link className="btn text-decoration-none text-dark" id="Add">Add Candidate</Link></li>
                    </ul>
                    <div id="Modal" className="mx-auto text-center">
                        <div className="text-center">
                            <form>
                                <label htmlFor="upload">Candidate Image</label>
                                <input type="text" id="upload" placeholder="Image Link" required className="form-control mx-auto w-75"/>
                                <label htmlFor="name" className="mt-5">Candidate Name</label><br/>
                                <input type="text" id="name" placeholder="Name" required className="form-control mx-auto w-75"/>
                                <button className="btn btn-outline-success mt-4" type="button" onClick={this.Collect}>Add Candidate</button>
                                &nbsp;&nbsp;<button className="btn btn-outline-danger mt-4" type="button" id="cancel">Cancel</button>
                            </form>
                        </div>
                    </div>
                    <div className="alert alert-success w-75 mx-auto text-center" id="Vote-Success">
                        <strong>Success!</strong> Thanks for being the part of voting community &hearts; .
                    </div>
                    <div className="alert alert-danger w-75 mx-auto text-center"id="Vote-Failed">
                        <strong>Failed!</strong> Don't try to vote twice please .
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar