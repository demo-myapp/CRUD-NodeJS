
getData();
async function getData(){
	const response = await fetch('/read');
	const json = await response.json();
	console.log(json);
	showData(json);
}

const btnSave = document.getElementById('btn_save');
btnSave.addEventListener('click', async event => {

	const action = btnSave.textContent;

	const nip    = document.getElementById('nip').value;
	const nama   = document.getElementById('nama').value;
	const alamat = document.getElementById('alamat').value;
	const role   = document.getElementById('role').value;

	let data = {
		nip : nip,
		nama : nama,
		alamat : alamat,
		role : role,
		action : action
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};
	const response = await fetch('/api', options);
	const json = await response.json();
	console.log(json);
	
	getData();

	$('#exampleModal').modal('hide');

	if(action === 'Simpan'){
		$.alert('Data Berhasil ditambah!');
	}else{
		$.alert('Data Berhasil dirubah!');
	}
});

function showData(json){
	let tr = '';
	$('#databody').html('');
	let no;
	for (let i = 0; i < json.length; i++) {
		no = i + 1;
		tr = $('<tr/>');
		tr.append("<td>" + no + "</td>");
		tr.append("<td>" + json[i].nip + "</td>");
		tr.append("<td>" + json[i].nama + "</td>");
		tr.append("<td>" + json[i].alamat + "</td>");
		tr.append("<td>" + json[i].role + "</td>");
		tr.append(`
			<td>
				<button type="button" class="btn btn-sm btn-primary btnEdit" data-nip="`+ json[i].nip +`">
					Edit
				</button>
				<button type="button" class="btn btn-sm btn-danger btnHapus" data-nip="`+ json[i].nip +`">
					Hapus
				</button>
			</td>`
		);
		$('#databody').append(tr);
	}

	//Jquery Selector
	$(function(){
		$('.btnTambahData').on('click', function(){
			document.getElementById('nip').readOnly = false;
			document.getElementById('nip').value = '';
			document.getElementById('nama').value = '';
			document.getElementById('alamat').value = '';
			document.getElementById('role').value = '';

	        $('#exampleModalLabel').html('Tambah Data karyawan');
	        $('.modal-footer button[id=btn_save]').html('Simpan');
	    });

		$('.btnEdit').on('click', async function(){
		    let nip = $(this).data('nip');
		    console.log(nip);


		    const url = `readbynip/${nip}`;
			const response = await fetch(url);
			const json = await response.json();
			console.log(json[0].nip);

			document.getElementById('nip').readOnly = true;
			document.getElementById('nip').value = json[0].nip;
			document.getElementById('nama').value = json[0].nama;
			document.getElementById('alamat').value = json[0].alamat;
			document.getElementById('role').value = json[0].role;

		    $('#exampleModalLabel').html('Ubah Data karyawan');
        	$('.modal-footer button[id=btn_save]').html('Ubah Data');
		    $('#exampleModal').modal('show');
		});

		$('.btnHapus').on('click', async function(){
			let nip = $(this).data('nip');

			$.confirm({
			    title: 'Hapus Data karyawan',
			    content: 'Apakah Anda Yakin...???',
			    buttons: {
			        ya: {
			        	text: 'YA',
			            btnClass: 'btn-blue',
			            action: async function(){
			                const url = `hapus/${nip}`;
							const response = await fetch(url);
							const json = await response.json();
			            	$.alert('Data Berhasil dihapus!');
			            	getData();
			            }
			        },
			        tidak: function () {
			            
			        }
			    }
			});
		});
	})
}