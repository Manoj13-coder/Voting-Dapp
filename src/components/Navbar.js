import React from 'react'
import $ from "jquery";
import {Link} from 'react-router-dom';
window.jQuery = $;
class Navbar extends React.Component{
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
                        <li><Link className="btn text-decoration-none text-dark" to="/addCandidate">Add Candidate</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navbar