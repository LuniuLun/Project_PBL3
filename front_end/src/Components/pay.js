import React from 'react';
import ReactDOM from 'react-dom/client';
import RootProduct from './printRootProduct';
import Warning from './warningBox'
function addBill() {    
    let check = true;
    let TrangThaiDonHang = "Hoan thanh";
    let TrangThaiThanhToan = "true";
    let cusElement = document.querySelector('.input-box-customer');
    let clientElement = document.querySelector('.input-box-client');
    const now = new Date();
    const time_bill = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    let total_quantityElement = document.querySelector('.total-quantity');
    let total_priceElement = document.querySelector('.total-price');
    let discountElement = document.querySelector('.discount');
    let extra_payElement = document.querySelector('.extra-pay');
    let total_payElement = document.querySelector('.total-pay');
    let note = document.querySelector('#note');
    let listIdProduct = JSON.parse(localStorage.getItem("myData"));
    console.log(listIdProduct);
    if(listIdProduct === '') check = false;
    else listIdProduct.forEach((product) => {
        if (product.quantity > product.max_quantity) {
            check = false;
        }
    });
    
    if (parseFloat(total_priceElement.value) !== 0) { 
        if (check === true) {
            let object = {
                TrangThaiDonHang: TrangThaiDonHang,
                TrangThaiThanhToan: TrangThaiThanhToan,
                ID_User: parseInt(clientElement.id),
                ID_KhachHang: parseInt(cusElement.id),
                NgayLap: time_bill,
                ThanhTien: parseFloat(total_priceElement.value),
                GiamGia: parseFloat(discountElement.value),
                ChiecKhau: parseFloat(extra_payElement.value),
                TongCong: parseFloat(total_payElement.value),
                GhiChu: note.value
            }
            fetch('http://localhost:4000/bill', {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response) {
                response.json().then((res) => {
                    if(res.result !== '') {                    
                        listIdProduct.forEach(element => {
                            let objDetailBill = {
                                ID: res.result,
                                MaHangHoa: element.id,
                                SoLuong: element.quantity
                            }
                            fetch('http://localhost:4000/detailBill', {
                                method: 'POST',
                                body: JSON.stringify(objDetailBill),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(function(response_detail) {
                                return response_detail.json();
                            });                        
                            let objUpdateProduct = {
                                SoLuongBan: element.quantity,
                                MaHang: element.id
                            }
                            fetch('http://localhost:4000/product', {
                                method: 'PUT',
                                body: JSON.stringify(objUpdateProduct),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then((response_product) => {
                                return response_product.json();
                            });
                        });        
                        const rootProduct = ReactDOM.createRoot(document.getElementById('listProduct'));
                        rootProduct.render(
                        <React.StrictMode>
                            <RootProduct/>
                        </React.StrictMode>
                        );
                        total_quantityElement.value = 0;
                        total_priceElement.value = 0;
                        discountElement.value = 0;
                        extra_payElement.value = 0;
                        total_payElement.value = 0;
                        cusElement.value = '';
                        clientElement.value = '';
                        localStorage.setItem("myData", JSON.stringify([]));
                        console.log(listIdProduct);
                    }
                });
            });   
        }  else {
            let warningBox = ReactDOM.createRoot(document.getElementById('warning'));
            warningBox.render(
                <React.StrictMode>
                    <Warning content='Vượt quá số lượng tồn kho !!!' name_class='warningBox'></Warning>
                </React.StrictMode>
            )
        }
    } 
}

const pay = () => {  
    return (                  
        <button className="pay" onClick={() => addBill()}>THANH TOÁN</button>
    );
} 
export default pay