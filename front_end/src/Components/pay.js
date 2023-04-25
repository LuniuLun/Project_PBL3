function show() {    
    let TrangThaiDonHang = "Hoan thanh";
    let TrangThaiThanhToan = "true";
    let cusElement = document.querySelector('.input-box-customer');
    let clientElement = document.querySelector('.input-box-client');
    //let total_quantity = document.querySelector('.total-quantity').value;
    const now = new Date();
    const time_bill = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    let total_priceElement = document.querySelector('.total-price');
    let discountElement = document.querySelector('.discount');
    let extra_payElement = document.querySelector('.extra-pay');
    let total_payElement = document.querySelector('.total-pay');
    if (parseFloat(total_priceElement.value) !== 0) {
        let object = {
            TrangThaiDonHang: TrangThaiDonHang,
            TrangThaiThanhToan: TrangThaiThanhToan,
            ID_User: parseInt(clientElement.id),
            ID_KhachHang: parseInt(cusElement.id),
            NgayLap: time_bill,
            ThanhTien: parseFloat(total_priceElement.value),
            GiamGia: parseFloat(discountElement.value),
            ChiecKhau: parseFloat(extra_payElement.value),
            TongCong: parseFloat(total_payElement.value)
        }
        fetch('http://localhost:4000/bill', {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response) {
            console.log(response);
            console.log(JSON.stringify(object));
            return response.json();
        });         
    }
   
}

const pay = () => {  
    return (                  
        <button className="pay" onClick={() => show()}>THANH TOÁN</button>
    );
} 
export default pay