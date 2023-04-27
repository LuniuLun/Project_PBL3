const {cnn, sql} = require('../../connect'); 
module.exports = function() {
    this.create = async function(newData, result) {
        let pool = await cnn;
        let sqlString = "Insert into tb_ChiTietHoaDon(ID, MaHangHoa, SoLuong) values (@ID, @MaHangHoa, @SoLuong)";
        return await pool.request()
        .input('ID', sql.Int, newData.ID)
        .input('MaHangHoa', sql.Int, newData.MaHangHoa)
        .input('SoLuong', sql.Int, newData.SoLuong)
        .query(sqlString, function(err, data) {
            if(err == false) {
                result("errol", null);
            }else {
                result(null, newData.TrangThaiDonHang);
            }
        });
    };
}