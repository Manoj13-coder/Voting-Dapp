const Voting = artifacts.require("./Voting.sol");
require("chai").use(require("chai-as-promised")).should();

contract("Voting",([deployer,author]) =>{
	let vote;
	before(async()=>{
		vote = await Voting.deployed();
	})
	describe("Deployment",async ()=>{
		it("Deployed Successfully",async()=>{
			const address = await vote.address;
			assert.notEqual(address, 0x0);
			assert.notEqual(address , '');
			assert.notEqual(address , null);
			assert.notEqual(address , undefined);
		});
		it('Candidates Currently Enrollled',async()=>{
			let count = await vote.total();
			count = count.toNumber();
			assert.equal(count,0);
		});
		it('Total Number Of Votes Collected',async()=>{
			let count = await vote.till();
			count = count.toNumber();
			assert.equal(count,0);
		});
	});
	describe("Votes Collecting",async()=>{
		it("Check Emit For Add",async()=>{
			let result = await vote.add("Manoj Kumar",'QmTwPbfmZu8iiZS3GM4Ys4ioXfgqim4AjEGkt7NVvL9FAQ',{from : deployer});
			let count = await vote.total();
			count = count.toNumber();
			assert.equal(count,1);
			const event = result.logs[0].args;
			assert.equal(event.name,"Manoj Kumar");
			assert.equal(event.votes.toNumber(),0);
			assert.equal(event.profile,'QmTwPbfmZu8iiZS3GM4Ys4ioXfgqim4AjEGkt7NVvL9FAQ');
		});
		it("Check Emit For Vote",async()=>{
			let create = await vote.Vote("Manoj Kumar",{from : author});
			let elect = await vote.till();
			elect = elect.toNumber();
			assert.equal(elect,1);
			const event = create.logs[0].args;
			assert.equal(event.user,author);
			assert.equal(event.selected.toString(),"Manoj Kumar");
		});
	});
});
