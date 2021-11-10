import React,{Component} from "react";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import "./App.css";
import AddCandidate from "./AddCandidate";
import ipfs from "./ipfs";
import VoteHome from "./voting";
import Candidates from './candidates';
import Navbar from './Navbar';
import NotFound from './NotFound';
import History from './History';
import $ from "jquery";
import Web3 from 'web3';
import Voting from '../abis/Voting.json';
window.jQuery = $;
class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			account : null,
			contract:null,
			Loading:true,
			access:null,
			buffer:null,
			count:0,
			candidates:[],
			total:0,
			history:[],
			percentage:[],
			ipfsHash:null
		}
	}
	async componentWillMount(){
	    await this.loadWeb3()
	    await this.loadBlockchainData()
	}
	async loadWeb3() {
	    if (window.ethereum) {
	      window.web3 = new Web3(window.ethereum)
	      await window.ethereum.enable()
	    }
	    else if (window.web3) {
	      window.web3 = new Web3(window.web3.currentProvider)
	    }
	    else {
	      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
	    }
	}
	async loadBlockchainData() {
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      this.setState({account : accounts[0]})
      const networkId = await web3.eth.net.getId()
      const networkData = Voting.networks[networkId]
      if(networkData) {
      	this.setState({Loading : false})
        const access = web3.eth.Contract(Voting.abi, networkData.address)
        this.setState({access : access})
		let count = await access.methods.total().call()
		let total = await access.methods.till().call()
		total = total.toNumber()
        count = count.toNumber()
        this.setState({count : count})
		this.setState({total : total})
		for (var i = 0; i < count; i++) {
			const individual = await access.methods.arr(i).call()
			let x = individual.votes.toNumber()
			let y = total
			if(y != 0){
				this.setState({
					percentage : [...this.state.percentage,Math.floor((x/y)*100)]
				})
			}else{
				this.setState({
					percentage : [...this.state.percentage,0]
				})
			}
			this.setState({
			  candidates : [...this.state.candidates, individual]
			})
		}
		for (var i = 0; i < total; i++) {
			const individual_h = await access.methods.History(i).call()
			this.setState({
			  history : [...this.state.history, individual_h]
			})
		}
      }else{
      	alert("Connect it to your localhost (Ganache) !!")
      }
    }
	captureFile = (event) =>{
		event.preventDefault();
		const file = event.target.files[0]
		const reader = new window.FileReader()
		reader.readAsArrayBuffer(file)
		reader.onloadend = () =>{
		  this.setState({buffer : Buffer(reader.result)})
		}
	}
	Collect = (name) =>{
      	ipfs.files.add(this.state.buffer , (error , result) =>{
        	if(error || this.state.buffer === null){
            	window.alert("Insufficient Data !!")
            	return;
			}
			this.setState({ipfsHash : result[0].hash})
        	this.state.access.methods.add(name,this.state.ipfsHash).send({from : this.state.account,gas: 1500000,gasPrice: 100}).on('confirmation',(reciept) =>{
            	window.location.reload()
	    	})
        })
    }
	render(){
		return (
			this.state.Loading ? <div id="spinner">
									<div className="spinner-border"></div>
		  						 </div>:<div>
        									<Router>
            									<Navbar/>
												<Switch>
													<Route exact path="/Home" render={props => 
  													(<VoteHome {...props} account={this.state.account} access={this.state.access} candidates={this.state.candidates} Loading={this.state.Loading}/>)}/>
													<Route exact path="/History" render={props => 
  													(<History {...props} history={this.state.history}/>)}/>
													<Route exact path="/addCandidate" render={props => 
  													(<AddCandidate {...props} Collect={this.Collect} captureFile={this.captureFile}/>)}/>
													<Route exact path="/Candidates" render={props => 
  													(<Candidates {...props} candidates={this.state.candidates} total={this.state.total} percentage={this.state.percentage}/>)}/>
													<Route exact path="/" render={props => 
  													(<VoteHome {...props} account={this.state.account} access={this.state.access} candidates={this.state.candidates} Loading={this.state.Loading}/>)}/>
													<Route path="*"><NotFound/></Route>
												</Switch>
											</Router>
      									</div>
		);
	}
}
export default App;