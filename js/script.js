var APIEndPoint = 'https://test.purplecosmos.co.za/api/api.aspx';
let details = '';
$(document).ready(() => {
	zeros = 'PC0000';
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: APIEndPoint + '/ListAllJobs',
		contentType: 'application/json; charset=utf-8',
		success: function (data) {
			info = data.d;
			info.forEach((data) => {
				if (data.Status == 2) {
					return;
				} else {
					if (data.JobNumber > 9) {
						zeros = 'PC000';
					} else if (data.JobNumber > 99) {
						zeros = 'PC00';
					}

					details += `<tr>
				                        <td>${data.ClientName}</td>
				                        <td class='job_number'>${zeros}${data.JobNumber}</td>
				                        <td>${data.Title}</td>
				                        <td><a id='btnUpdate' class='text-primary'>edit</a> / <a id='btnDelete' class='text-primary'>delete</a></td>
						 </tr>`;
				}
			});

			document.getElementById('table-body').innerHTML = details;

			$('#table-body').on('click', '#btnDelete', (e) => {
				let row = e.target.closest('tr');
				let getJobNumber = $(row).find(`.job_number`).text();
				getJobNumber = getJobNumber.match(/(?=[1-9]).*/g);
				let id;
				info.forEach((data) => {
					if (getJobNumber == data.JobNumber) {
						id = data.Id;
					}
				});
				$.ajax({
					type: 'POST',
					crossDomain: true,
					url: APIEndPoint + '/DeleteJob',
					data: `{"JobId": ${id} }`,
					contentType: 'application/json; charset=utf-8',
					success: function (data) {
						$('#myform').load('editJob.html');
					},
				});
			});

			$('#table-body').on('click', '#btnUpdate', (e) => {
				let row = e.target.closest('tr');
				let getJobNumber = $(row).find(`.job_number`).text();
				getJobNumber = getJobNumber.match(/(?=[1-9]).*/g);
				let id;
				info.forEach((data) => {
					if (getJobNumber == data.JobNumber) {
						id = data.Id;
					}
				});
				window.location.href = `./editJob.html?id=${id}`;
			});
		},
		error: function (jqXHR, msg, erro) {
			console.log(JSON.stringify(jqXHR));
		},
	});
});
