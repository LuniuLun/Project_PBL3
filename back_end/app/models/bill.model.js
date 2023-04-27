const {cnn, sql} = require('../../connect'); 
module.exports = function() {
    this.create = async function(newData, result) {
        let pool = await cnn;
        let sqlString = "Insert into tb_HoaDon(TrangThaiDonHang, TrangThaiThanhToan, ID_User, ID_KhachHang, NgayLap, ThanhTien, GiamGia, ChiecKhau, TongCong, GhiChu) output inserted.ID_HoaDon values (@TrangThaiDonHang, @TrangThaiThanhToan, @ID_User, @ID_KhachHang, @NgayLap, @ThanhTien, @GiamGia, @ChiecKhau, @TongCong, @GhiChu)";
        return await pool.request()
        .input('TrangThaiDonHang', sql.NVarChar, newData.TrangThaiDonHang)
        .input('TrangThaiThanhToan', sql.Bit, newData.TrangThaiThanhToan)
        .input('ID_User', sql.Int, newData.ID_User)
        .input('ID_KhachHang', sql.Int, newData.ID_KhachHang)
        .input('NgayLap', sql.DateTime, newData.NgayLap)
        .input('ThanhTien', sql.Decimal, newData.ThanhTien)
        .input('GiamGia', sql.Decimal, newData.GiamGia)
        .input('ChiecKhau', sql.Decimal, newData.ChiecKhau)
        .input('TongCong', sql.Decimal, newData.TongCong)
        .input('GhiChu', sql.NVarChar, newData.GhiChu)
        .query(sqlString, function(err, data) {
            if(err == false) {
                result("errol", null);
            }else {
                result(null, data.recordset[0].ID_HoaDon);
            }
        });
    };
}