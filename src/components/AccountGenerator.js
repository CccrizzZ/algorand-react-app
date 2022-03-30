import React, { Component } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import algosdk from 'algosdk'


export default class AccountGenerator extends Component {
  
    constructor(props) {
        super(props)

        this.state = {
            newAccount: null,
            Addr: null,
            sk: null
        }

    }

    
    Gen = () => {
        let newAccount = algosdk.generateAccount()
        let Addr = newAccount.addr
        let sk = algosdk.secretKeyToMnemonic(newAccount.sk)

        console.log(newAccount)
        console.log(Addr)
        console.log(sk)

        this.setState({
            newAccount: newAccount,
            Addr: Addr,
            sk: sk
        })

    }
  

    render() {
    return (
        <div>
            <Card className="text-center" style={{maxWidth: '50%', margin: 'auto', marginTop: '40px'}}>
                <Card.Body>
                    <Card.Title>Generate Algorand Test Net Wallet</Card.Title> 
                    <p>Address: {this.state.Addr}</p>
                    <p>Secret Key: {this.state.sk}</p>
                    <p>Algorand faucet: </p>
                    <p>   
                        <a href="https://dispenser.testnet.aws.algodev.network/" target="_blank">https://dispenser.testnet.aws.algodev.network/</a>
                    </p>
                    <Button variant="primary" onClick={this.Gen} style={{marginTop: '10px'}}>Generate</Button>
                </Card.Body>
            </Card>
        </div>
    )
  }
}
