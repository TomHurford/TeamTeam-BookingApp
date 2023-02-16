// Front end code of a purchase page to present future events first and the past events of a user use fetch data method to get data from the backend and display it on the page.




import React, {Component} from "react";



export default







class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []}
        this.fetchData();
    }
    
    fetchData() {
        fetch('http://localhost:5001/purchase')
        .then(response => response.json())
        .then(purchasesList => {this.setState({data: purchasesList})})
        .catch(error => console.error(error))
    }

    render(){
        return(
            <div className="purchasePage">
            <h1>Purchase Page</h1>
            <ul className="purchases">
                {this.state.data.map(purchase => (
                    <Purchase key={purchase.id} specificPurchase = {purchase}></Purchase>
                ))}
            </ul>
            </div>
        )
    }
}
