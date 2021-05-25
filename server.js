const express    = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const app        = express();


//Koneksi ke mysql database
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_nodejs'
});

//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Koneksi berhasil');
});

app.use(bodyParser.json());
app.listen(4000, () => console.log('Server berjalan di port 4000'));
app.use(express.static('public'));

//Baca Semua Data
app.get('/read',(req, res) => {

  let sql = "SELECT * FROM karyawan";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});

//Baca Data Berdasarkan nip
app.get('/readbynip/:nip', async (req, res) =>{
	const nip = req.params.nip;
	console.log(nip);

	let sql = "SELECT * FROM karyawan Where nip = "+ nip +"";
  	let query = conn.query(sql, (err, results) => {
    	if(err) throw err;
    	res.json(results);
  	});
});

//route untuk insert data
app.post('/api', (req, res) => {
	let action = req.body.action;
	let data = {nip: req.body.nip, nama: req.body.nama, alamat: req.body.alamat, role: req.body.role};
	let sql;

	if(action === 'Simpan'){
		sql = "INSERT INTO karyawan SET ?";	
	}else{
		sql = `UPDATE karyawan SET nama='`+req.body.nama+`', 
		        alamat='`+req.body.alamat+`', role='`+ req.body.role +`' 
		        WHERE nip='`+req.body.nip+`';`
	}
	
	console.log(sql);
	let query = conn.query(sql, data,(err, results) => {
	   if(err) throw err;
	   res.json(results);
	   console.log(results);
	});
});

//Baca Data Berdasarkan nip
app.get('/hapus/:nip', async (req, res) =>{
	const nip = req.params.nip;
	console.log(nip);

	let sql = `DELETE FROM karyawan Where nip = '`+ nip +`';`
  	let query = conn.query(sql, (err, results) => {
    	if(err) throw err;
    	res.json(results);
  	});
});
