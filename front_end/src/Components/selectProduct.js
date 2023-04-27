import react from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom/client';
import PrintProduct from './printProduct';
window.addEventListener('beforeunload', function() {
    localStorage.clear();
});

const selectProduct = () => {         
    const [product, setProduct] = react.useState([]);
    const [suggestion, setSuggestion] = react.useState([]);
    const [text, setText] = react.useState('');
    let totalQuantity = document.querySelector('#cal .total-quantity');
    let totalPrice = document.querySelector('#cal .total-price');
    let discount = document.querySelector('#cal .discount');
    let extra_pay = document.querySelector('#cal .extra-pay');
    let total = document.querySelector('#cal .total-pay');       
    react.useEffect(()=>{
        const loadProduct = async() => {
            const repsonse = await Axios.get("http://localhost:4000/product");
            setProduct(repsonse.data.result);
        }
        loadProduct();
    }, []);

    function disFunc() {
        total.value = parseFloat(totalPrice.value) - parseFloat(discount.value);
        console.log(total.value);
    }       
    discount.addEventListener("change", disFunc);

    function extraFunc() {
        total.value = parseFloat(total.value) + parseFloat(extra_pay.value);
    }       
    extra_pay.addEventListener("change", extraFunc);


    function createProduct(MaHang, TenHang, GiaHang, Link, SoLuong) { 
        let listIdProduct = JSON.parse(localStorage.getItem("myData"));
        let list = [];
        let isExit;
        if(listIdProduct !== null) {
            listIdProduct.forEach((product) => {
                list.push(product);
            }) 
        }
        console.log(list);
        if (list === '') isExit = false;
        else isExit = list.some(function(product) {
            return product.id === MaHang;
        });
        if(isExit === true) {
            const quantity = document.querySelector("#G" + MaHang +  " .Quantity");
            quantity.value = parseFloat(quantity.value) + 1;
            listIdProduct.forEach((obj) => {
                if(obj.id === MaHang) {
                    obj.quantity++;
                } 
            });    
            localStorage.setItem("myData", JSON.stringify(list));    
        }
        else{
            let printProduct = ReactDOM.createRoot(document.getElementById("G" + MaHang));        
            printProduct.render(
                <react.StrictMode>        
                    <PrintProduct Name={TenHang} Price={GiaHang} Quantity={1} Link={Link} id={("G" + MaHang)}/>     
                </react.StrictMode>
            );     
            let newObject = {id: MaHang, quantity: 1, max_quantity: SoLuong};
            list.push(newObject);
            localStorage.setItem("myData", JSON.stringify(list));
        }   
    }    
    const selectProduct = (product) => {
        let selectQuantity = 1; 
        setSuggestion([]); 
        setText('');

        totalQuantity.value = parseInt(totalQuantity.value) + parseInt(selectQuantity);
        totalPrice.value = parseInt(totalPrice.value) + product.GiaHang * parseFloat(selectQuantity);
        total.value =  parseInt(totalPrice.value) + parseFloat(extra_pay.value) - parseFloat(discount.value);
        
        createProduct(product.MaHang, product.TenHang, product.GiaHang, product.Anh, product.SoLuong);
    }

    const onChangeHandler = (text) => {
        let result = [];
        if(text.length > 0) {
            result = product.filter((keyword) => {
                return keyword.TenHang.toLowerCase().includes(text.toLowerCase());
            });
            console.log(result);
        }
        setSuggestion(result);
        setText(text);
    }

    return (                  
        <div className="find-product">                    
            <input type="text" id="input-box" className="input" style={{paddingLeft: '30px'}} placeholder="Tìm sản phẩm" autoComplete="off" onChange={e =>onChangeHandler(e.target.value)}
        value={text}/>
            <i className="icon-Find1 fa-solid fa-magnifying-glass" />
            <div className="result-box">       
                {suggestion.map((product) =>
                    <li key={product.MaHang} className='extra-product' onClick = {() => selectProduct(product)}>{product.TenHang}</li>
                )}
            </div>
        </div>
    );
} 
export default selectProduct

// const App = () => {
//   const [data, setData] = useState();
//   const getData = async function () {
//     const response = await Axios.get("http://localhost:4000/product/id");
//     setData(response.data);
//   }
//   useEffect(()=> {
//     getData();
//   },[])
//   return (
//     <div>
//       <h1>Product list</h1>
//       <ul>
//         {data.map((product, index) => (
//           <li key={index}>{product.TenHang}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default App

// const App = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     Axios.get('http://localhost:4000/product')
//       .then(response => setData(response.data))
//       .catch(error => console.error(error));
//   }, []);
  
//   let availableKeywords = [];
//   data.map((product, index) => (
//     availableKeywords.push(product.TenHang)
//   ));

//   const resultsBox = document.querySelector(".result-box");
//   const inputBox = document.getElementById("input-box");

//   inputBox.onkeyup = function() {
//       let result = [];
//       let input = inputBox.value;
//       if(input.length) {
//           result = availableKeywords.filter((keyword) => {
//               return keyword.toLowerCase().includes(input.toLowerCase());
//           });
//           console.log(result);
//       }
//       display(result);

//       if(!result.length) {
//           resultsBox.innerHTML = ' ';
//       }
//   }

//   function display(result) {
//       const content = result.map((list)=> {
//           return "<li onclick=selectInput(this)>"+ list +"</li>";
//       });

//       resultsBox.innerHTML = "<ul>" + content.join(' ') +"</ul>";
//   }

//   function selectInput(list) {
//       inputBox.value = list.innerHTML;
//       resultsBox.innerHTML = '';
//   }
// }
// export default App
