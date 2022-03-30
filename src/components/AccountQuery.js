import React,{  Component } from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap';
import algosdk from 'algosdk'

const baseServer = "https://testnet-algorand.api.purestake.io/idx2"
const port = ""
const token = {
    'X-API-key' : "589RkfTHZpNCyjDk6crY38SZnskwUiY4MoUjTlg3",
}
const algodclient = new algosdk.Algodv2(token, baseServer, port)

export default class AccountQuery extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            address: null,
            amount: null,
            status: null,
            assets: []
        }

        this.targetAccount = React.createRef()

    }


    Query = async () => {

        // get the account address
        let targetAddr = this.targetAccount.current.value
        
        // get account balance
        await algodclient.accountInformation(targetAddr).do().then((info) => {

            this.setState({
                address: info.account.address,
                amount: algosdk.microalgosToAlgos(info.account.amount),
                status: info.account.status,
                assets: info.account.assets

            })

            
            
            
            console.log(this.state.assets[0])
        }).catch((err) =>{
            alert(err)
        })


        this.state.assets.forEach(asset => {
            
                 algodclient.getAssetByID(asset["asset-id"]).do().then((info) => {
                    asset['name'] = info.asset.params.name
                }).catch((err) =>{
                    alert(err)
                })
                return true
        
            
        });


    }


    RenderAssets = () => {
        if (!this.state.assets[0]) return
        console.log(this.state.assets)
            // loop the assets array
            return this.state.assets.map((a) =>{
                console.log(a["name"])
    
                return(
                <ListGroup key={a["asset-id"]} style={{marginTop:"10px"}}>
                    <ListGroup.Item variant="success">Asset ID: {a["asset-id"]}</ListGroup.Item>
                    <ListGroup.Item variant="success">Amount: {a["amount"]}</ListGroup.Item>
                    
                </ListGroup> )
            })

        
    }


    GetAssetInfo = async (asset) => {
        // if (!asset) return

        // await algodclient.getAssetByID(asset["asset-id"]).do().then((info) => {
        //     asset['name'] = info.asset.params.name
        // }).catch((err) =>{
        //     alert(err)
        // }
    }



    render() {
        return (
            <div>
                <Card className="text-center" style={{maxWidth: '50%', margin: 'auto', marginTop: '0px'}}>
                    <Card.Header><img style={{maxWidth: '10%'}} alt="" src="https://pbs.twimg.com/profile_images/962068712772616196/eYwuB0TO_400x400.jpg" /></Card.Header>
                    <Card.Body>
                        <Card.Title>Query Algorand Test Net Wallet Address</Card.Title>
                        <Form.Control ref={this.targetAccount} type="text" placeholder="Enter Address" />

                        <Button variant="primary" onClick={this.Query} style={{marginTop: '10px'}}>Search</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <p>Address: {this.state.address}</p>
                        <p>Balance: {this.state.amount} ALGO</p>
                        <p>Status: {this.state.status}</p>
                        <p>Assets:</p>
                        {this.RenderAssets()}
                    </Card.Footer>
                </Card>

            </div>
        )
    }
}
