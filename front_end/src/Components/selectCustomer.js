import react from 'react'
import Axios from 'axios'

const selectCustomer = () => {            
    const [customer, setCustomer] = react.useState([]);
    const [suggestion, setSuggestion] = react.useState([]);
    const [text, setText] = react.useState('');
    const [id, setId] = react.useState('');
    react.useEffect(()=>{
        const loadProduct = async() => {
            const repsonse = await Axios.get("http://localhost:4000/customer");
            setCustomer(repsonse.data.result);
        }
        loadProduct();
        setId("0");
    }, []);
    
    const onChangeHandler = (text) => {
        let result = [];
        if(text.length > 0) {
            result = customer.filter((keyword) => {
                return (keyword.Name.toLowerCase().includes(text.toLowerCase()) === true || keyword.phoneNumber.includes(text) === true);
            });
        }
        else setId("0");
        setSuggestion(result);
        setText(text);
    }

    const selectCustomer = (customer) => {
        setText(customer.Name + "-" + customer.phoneNumber);
        setId(customer.ID_Customer);
        setSuggestion([]);              
          
        let obj = {check : false}; 
        if(customer.accumulatedPoints > 100 && customer.ID_Customer !== 0) {
            obj.check = true;         
            let total = document.querySelector('#cal .total-pay');     
            let discount = document.querySelector('#cal .discount');
            let totalPrice = document.querySelector('#cal .total-price');
            discount.value = parseFloat(totalPrice.value) * 0.2;            
            total.value =  parseInt(totalPrice.value) - parseFloat(discount.value);
        }
        localStorage.setItem("checkDiscount", JSON.stringify(obj));
    }
    // function display(result) {
    //     const content = result.map((list, i)=> {
    //         return `<li key = ${i} onclick = {selectProduct()}> ${list.Name}  - ${list.SDT} </li>`;
    //     });
    //     resultsBox.innerHTML = "<ul>" + content.join(' ') +"</ul>";
    // }
    return (            
        <div className="find-customer">
        <input type="text" id={id} className="input-box-customer" style={{paddingLeft: '40px'}} placeholder="Tìm khách hàng" onChange={e =>onChangeHandler(e.target.value)} value={text} />
        <span href="true"><i className="icon-find-customer fa-solid fa-magnifying-glass" /></span>
        <div className="result-box-customer">                        
            <ul>
                {suggestion.map((customer) =>
                    <li key={customer.ID_Customer} className='extra-customer' onClick = {() => selectCustomer(customer)}>{customer.Name} - {customer.phoneNumber}</li>
                )}
            </ul>
        </div>
      </div>
    );
} 
export default selectCustomer