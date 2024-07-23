$(document).ready(function() {

	var $pagination = $('#AdsPagination');
	var inpSearchAdsPosition = '';
	// Init twbsPagination with defaultOpts /assets/global.settings.js)
	$pagination.twbsPagination(defaultOpts);

	// Listener event onChange when user typing on input search.
	this.onSearchByName = function() {
		// Get value from input search.
		inpSearchAdsPosition = $('#inpSearchAdsPosition').val();
		// Call function search filter value from input.
		this.getAds(0, defaultPageSize, inpSearchAdsPosition);
	}

	// Function search and pagination Ads. 
	this.getAds = function(page = 0, size = defaultPageSize, name = '') {
		// Use Ajax call API search Ads (/assets/http.js).
		Http.get(`${domain}/admin/api/ads?type=filter&page=${page}&size=${size}&name=${name}`)
			.then(res => {
				let appendHTML = '';
				// Clear all elements in table content.
				$('#tblAds').empty();
				// Reset pagination.
				$pagination.twbsPagination('destroy');
				// Check api error or no data response.
				if (!res.success || res.data.totalRecord === 0) {
					// Append text No Data when records empty;
					$('#tblAds').append(`<tr><td colspan='9' style='text-align: center;'>No Data</td></tr>`);
					// End function.
					return;
				}

				// Build table content from data responses.
				for (const record of res.data.records) {
					appendHTML += '<tr>';
					appendHTML += `<td>${record.id}</td>`;
					appendHTML += `<td>${record.position}</td>`;
					appendHTML += `<td>${record.width}</td>`;
					appendHTML += `<td>${record.height}</td>`;
					appendHTML += `<td>${record.url}</td>`;
					appendHTML += `<td>${record.images}</td>`;
					appendHTML +=
						`<td>
						<span class='badge ${record.status.toLocaleLowerCase() === 'active' ? 'bg-success' : 'bg-danger'}'>
							${record.status}
						</span>
					</td>`;
					appendHTML += `<td>${record.createdBy}</td>`;
					appendHTML += `<td>${record.createdDate}</td>`;
					appendHTML += `<td>${record.updatedBy}</td>`;
					appendHTML += `<td>${record.updatedDate}</td>`;

					// Append action button Edit & Delete.
					appendHTML +=
						`<td class='text-right'>
							<a class='btn btn-info btn-sm' onclick='swicthViewAds(false, ${record.id})'>
								<i class='fas fa-pencil-alt'></i>
							</a>
							<a class='btn btn-danger btn-sm' onclick='deleteAds(${record.id})'>
								<i class='fas fa-trash'></i>
							</a>
						</td>`;
					appendHTML += '</tr>';
				}

				// Build pagination with twbsPagination.
				// More detail: https://josecebe.github.io/twbs-pagination/
				$pagination.twbsPagination($.extend({}, defaultOpts, {
					startPage: res.data.page + 1,
					totalPages: Math.ceil(res.data.totalRecord / res.data.size)
				}));
				// Add event listener when page change.
				$pagination
					.on('page', (event, num) => {
						this.getAds(num - 1, defaultPageSize, inpSearchAdsPosition);
					});

				// Append html table into tBody.
				$('#tblAds').append(appendHTML);
			})
			.catch(err => {
				toastr.error(err.errMsg);
			})
	}

	// Function delete Ads by id.
	this.deleteAds = function(id) {
		// Use Ajax call API get Ads by id (/assets/http.js).
		if (confirm('Are you sure you want to delete this advertisement?')) {

			Http.delete(`${domain}/admin/api/ads?id=${id}`)
				.then(res => {
					if (res.success) {
						this.swicthViewAds(true);
						toastr.success('Delete Ads success !')
					} else {
						toastr.error(res.errMsg);
					}
				})
				.catch(err => {
					toastr.error(err.errMsg);
				})
		}
	}

	// Call API get Ads by id.
	this.getAdsById = function(id) {
		// Use Ajax call API get Ads by id (/assets/http.js).
		Http.get(`${domain}/admin/api/ads?type=getOne&id=${id}`)
			.then(res => {
				if (res.success) {
					// Set value from response on update form.
					$('#inpAdsId').val(id);
					$('#"inpAdsPosition"').val(res.data.position);
					$('#"inpAdsWitdh"').val(res.data.witdh);
					$('#inpAdsHeight').val(res.data.height);
					$('#inpAdsImages').val(null);
					$('#inpAdsUrl').val(res.data.url);
				} else {
					toastr.error(res.errMsg);
				}
			})
			.catch(err => {
				toastr.error(err.errMsg);
			})
	}

	// Function create/edit Ads.
	this.saveAds = function() {
		const currentId = $('#inpAdsId').val();
		// Get value from input and build a JSON Payload.
		const payload = {
			'witdh': $('#inpAdsWitdh').val(),
			'height': $('#inpAdsHeight').val(),
			'position': $('#inpAdsPosition').val(),
			'url': $('#inpAdsUrl').val(),
		}
		// Create FormData and append files & JSON stringify.
		// More detail: https://viblo.asia/p/upload-file-ajax-voi-formdata-LzD5dL2e5jY
		// More detail with Postman: https://stackoverflow.com/questions/16015548/how-to-send-multipart-form-data-request-using-postman
		var formData = new FormData();
		// Append file selected from input.
		if ($('#inpAdsImages')[0]) {
			formData.append('images', $('#inpAdsImages')[0].files[0]);
		}
		// Append payload Ads info.
		formData.append('payload', JSON.stringify(payload));
		if (currentId) {
			// Read detail additional function putFormData in file: /assets/http.js
			Http.putFormData(`${domain}/admin/api/ads?id=${currentId}`, formData)
				.then(res => {
					if (res.success) {
						this.swicthViewAds(true);
						toastr.success(`Update Ads success !`)
					} else {
						toastr.error(res.errMsg);
					}
				})
				.catch(err => {
					toastr.error(err.errMsg);
				});
		} else {
			// Read detail additional function postFormData in file: /assets/http.js
			Http.postFormData(`${domain}/admin/api/ads`, formData)
				.then(res => {
					if (res.success) {
						this.swicthViewAds(true);
						toastr.success(`Create Ads success !`)
					} else {
						toastr.error(res.errMsg);
					}
				})
				.catch(err => {
					toastr.error(err.errMsg);
				});
		}
	};
	// TODO: Handle after.
	this.draftAds = function() {
		alert("Làm biếng chưa có code");
	}
	// Using select2 query data categories.
	// More detail: https://select2.org/data-sources/ajax

	// Action change display screen between Table and Form Create/Edit.
	this.swicthViewAds = function(isViewTable, id = null) {
		if (isViewTable) {
			$('#Ads-table').css('display', 'block');
			$('#Ads-form').css('display', 'none');
			this.getAds(0, defaultPageSize);
		} else {
			// Init summernote (Text Editor).
			$('#inpPostContent').summernote({ height: 150 });
			// Init select2 (Support select & search value).
			$('#Ads-table').css('display', 'none');
			$('#Ads-form').css('display', 'block');
			if (id == null) {
				$('#"inpAdsPosition"').val(null);
				$('#"inpAdsWitdh"').val(null);
				$('#inpAdsHeight').val(null);
				$('#inpAdsImages').val(null);
				$('#inpAdsUrl').val(null);
			} else {
				this.getAdsById(id);
			}
		}
	};

	// Fix issues Bootstrap 4 not show file name.
	// More detail: https://stackoverflow.com/questions/48613992/bootstrap-4-file-input-doesnt-show-the-file-name
	$('#inpAdsImages').change(function(e) {
		if (e.target.files.length) {
			// Replace the "Choose a file" label
			$(this).next('.custom-file-label').html(e.target.files[0].name);
		}
	});

	// Set default view mode is table.
	this.swicthViewAds(true);

});