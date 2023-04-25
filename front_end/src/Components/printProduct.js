import React, { Component } from 'react';
let oldQuantity;

function ChangeQuantity(id) {    
    let QuantityEle = document.querySelector('#' + id + ' .Quantity');
    let PriceEle = document.querySelector( '#' + id + ' .Price');
    let totalPrice = document.querySelector('#cal .total-price');
    let total = document.querySelector('#cal .total-pay');       
    let totalQuantity = document.querySelector('#cal .total-quantity');
    if(QuantityEle.value === "" || QuantityEle.value <= 0) {     
        QuantityEle.value = 1;
    }
    let minus = parseFloat(PriceEle.value) * oldQuantity;
    let plus = parseFloat(PriceEle.value) * parseInt(QuantityEle.value);
    totalPrice.value = parseFloat(totalPrice.value) - minus + plus;
    total.value = parseFloat(total.value) - minus + plus;
    totalQuantity.value = parseInt(totalQuantity.value) - oldQuantity + parseInt(QuantityEle.value);  
    oldQuantity = parseInt(QuantityEle.value); 
}

function getOldValue(id) {
    let selectQuantityStr = '#' + id + ' .Quantity';
    oldQuantity = document.querySelector(selectQuantityStr).value;    
}

class printProduct extends Component {
    render() {
        return (
            <div className="box-product">             
                <img className="Picture" src={this.props.Link} alt='true'/>
                <label className="Name">{this.props.Name}</label>
                <input className="Quantity" type="number" defaultValue={this.props.Quantity} id={this.props.id} onChange={e => ChangeQuantity(e.target.id)} onFocus={e => getOldValue(e.target.id)}/>
                <input readOnly className="Price" defaultValue={this.props.Price}></input>
                <button className="Delete"><i className="fa-sharp fa-solid fa-trash" /></button>
          </div>
        );
    }
}
export default printProduct;