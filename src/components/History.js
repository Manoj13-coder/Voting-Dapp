import React from 'react';
class History extends React.Component{
    render(){
        return(
            <div>
                <main className="text-center mt-5 mb-5">
			        <h4 className="mb-4">History</h4>
			        <div>
				        <div>
					        {
								this.props.history.map((his,key)=>{
									return(
										<p>
						        			<i className="fa fa-user"></i> &nbsp;&nbsp;&nbsp;&nbsp;User with account address {his.user} voted for {his.selected}.
											<hr className="w-75"/>
					        			</p>
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

export default History