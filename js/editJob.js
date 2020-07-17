var APIEndPoint = 'https://test.purplecosmos.co.za/api/api.aspx';
if (location.href.split('id=').length >= 2) {
	$(document).ready(() => {
		let jobtitle = document.getElementById('jobtitle');
		let jobnumber = document.getElementById('jobnumber');
		let client = document.getElementById('client');
		let status = document.getElementById('status');
		let prodURL = document.getElementById('prodURL');
		let QAURL = document.getElementById('QAURL');
		let repoURL = document.getElementById('repoURL');
		let Id = location.href.split('id=')[1];
		$.ajax({
			type: 'POST',
			crossDomain: true,
			url: APIEndPoint + '/LoadJob',
			data: `{"JobId": ${Id}}`,
			contentType: 'application/json; charset=utf-8',
			success: function (data) {
				data = data.d;
				jobtitle.value = data.Title;
				jobnumber.value = data.JobNumber;
				client.value = data.Client;
				prodURL.value = data.LiveUrl;
				QAURL.value = data.TestUrl;
				repoURL.value = data.RepoUrl;
			},
		});
	});
}

$('#btnSave').on('click', () => {
	let jobtitle = document.getElementById('jobtitle').value;
	let jobnumber = document.getElementById('jobnumber').value;
	let client = document.getElementById('client').value;
	let status = document.getElementById('status').value;
	let prodURL = document.getElementById('prodURL').value;
	let QAURL = document.getElementById('QAURL').value;
	let repoURL = document.getElementById('repoURL').value;
	let clientid = 0;

	if (jobnumber == '') {
		$.ajax({
			type: 'POST',
			crossDomain: true,
			url: APIEndPoint + '/GetNextJobNumber',

			contentType: 'application/json; charset=utf-8',
			success: function (data) {
				jobnumber = data.d;

				$.ajax({
					type: 'POST',
					crossDomain: true,
					url: APIEndPoint + '/ListClients',
					contentType: 'application/json; charset=utf-8',
					success: function (data) {
						data = data.d;

						data.forEach((element) => {
							if (element.Name == client) {
								clientid = element.Id;
							}
						});

						var JobDetails = {
							Id: Id,
							ClientId: clientid,
							JobNumber: jobnumber,
							Title: jobtitle,
							RepoUrl: repoURL,
							LiveUrl: prodURL,
							TestUrl: QAURL,
						};
						$.ajax({
							type: 'POST',
							crossDomain: true,
							url: APIEndPoint + '/SaveJob',
							data: JSON.stringify(JobDetails),
							contentType: 'application/json; charset=utf-8',
							success: function (data) {
								alert('Job added!');
								window.location.href = './index.html';
							},
							error: function (jqXHR, msg, erro) {
								console.log(JSON.stringify(jqXHR));
							},
						});
					},
					error: function (jqXHR, msg, erro) {
						console.log(JSON.stringify(jqXHR));
					},
				});
			},
		});
	}
});

$('#btnProdURL').on('click', () => {
	let prodURL = document.getElementById('prodURL').value;
	window.location.href = prodURL;
});
$('#btnQAURL').on('click', () => {
	let QAURL = document.getElementById('QAURL').value;
	window.location.href = QAURL;
});
$('#btnRepoURL').on('click', () => {
	let repoURL = document.getElementById('repoURL').value;
	window.location.href = RepoURL;
});
