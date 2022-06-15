import React from 'react';
import {ethers} from 'ethers'
import abi from './abi.json'

const Home = () => {


    const contractAddress = "0x5ef3e7bb4E97b010b63bd1E85a3cF0A252161f8B"
    const [errorMsg, setErrorMsg] = React.useState(null)
    const [defaultAcc, setDefaultAcc] = React.useState(null)
    

    const [currentContractVal ,setCurrentContractVal] = React.useState(null)

    const [provider, setProvider] = React.useState(null)
    const [signer, setSigner] = React.useState(null)
    const [contract, setContract] = React.useState(null)
    
    const [connButtonText, setConnButtonText] = React.useState("Connect Wallet");
    const connectWalletHAndler = () => {
        console.log("conn")
        if(window.ethereum){
            window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMsg(error.message);
			
			});
        }
        else{
            setErrorMsg("Install Metamask")
        }
    }

    const accountChangedHandler = (newAccount) => {
		setDefaultAcc(newAccount);
        updateEthers()
	}

    const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, abi, tempSigner);
		setContract(tempContract);	
	}

    const getCurrentVal = async () => {
		let val = await contract.getData();
		setCurrentContractVal(val);
	}

    const [input, setInput] = React.useState("")
    const setHandler = (event) => {
		event.preventDefault();
		console.log('sending ' + input + ' to the contract');
		contract.setData(input);
	}

    return (
        <div>
            <p>Home To The Senior Developer Page</p>
            <button onClick={connectWalletHAndler}>{connButtonText}</button>
            <h3>Default Address: {defaultAcc}</h3>
            <input value={input} onChange={(e) => setInput(e.target.value)}/>
            <button onClick={setHandler}> Set Data To Contract </button>
            <br/>
            <button onClick={getCurrentVal}> Get Current Data</button>
            <h4>: {currentContractVal}</h4>
            {
                errorMsg && <h2>{errorMsg}</h2>
            }
        </div>
    )
}
export default Home;