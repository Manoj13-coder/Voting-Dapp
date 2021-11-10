import React,{Component} from 'react';
import './App.css';
class AddCandidate extends Component{
    func = () =>{
        const var1 = document.getElementById('photo').value;
        const var2 = document.getElementById('name').value;
        if(!var1.trim() || !var2.trim()){
            alert('Please provide proper information required');
        }else{
            this.props.Collect(var2.trim());
        }
    }
    render(){
        return(
            <div className="mt-5 mb-5">
                <div className="card mx-auto w-75 text-center">
                    <div>
                        <h3 className="mt-3">Information Required</h3>
                        <input id="photo" className="mx-auto form-control w-75 mt-3 mb-3" type="file" required placeholder="Candidate Photo" onChange={this.props.captureFile}/>
                        <input id="name" className="mx-auto form-control w-75 mt-3 mb-3" type="text" required placeholder="Candidate Name"/>
                        <button className="mb-3 btn btn-secondary" type="button" onClick={()=>this.func()}>Add Candidate</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddCandidate;