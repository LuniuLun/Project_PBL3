import Axios from 'axios';  
import react from 'react';  

const printRootProduct = () => {       
    const [product, setProduct] = react.useState([]);
    react.useEffect(()=>{
        const loadProduct = async() => {
            const repsonse = await Axios.get("http://localhost:4000/product");
            setProduct(repsonse.data.result);
        }
        loadProduct();
    }, []); 
    return (  
        <>{product.map((p) => 
            <div key={p.IDProduct} id={"G" + p.IDProduct}></div>
        )}</>
  
    );
    }

export default printRootProduct;