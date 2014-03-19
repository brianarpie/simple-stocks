/*
 * pC: SimpleStockUI : main.js
 * Version: 0.0.0.1
 * Company: Parsed Cache
 * Author: Brian David Arpie
 * Date Created: 3/15/2014
 * Date Updated: 3/19/2014
 */

var str,
	html,
	url,
	title,
	price,
	headDOM,
	dataDOM,
	head,
	data,
	query;

function TableController($scope) {

	$scope.trElements = [{}];

	$scope.addElement = function() {

		$scope.trElements = [{}];

		var symbol = $scope.stockInput,
			ticker = document.getElementById('ticker_symbol'),
			company = document.getElementById('company_info');


		url = 'http://www.parsedcache.com/simple-proxy/' +
			'ba-simple-proxy.php?url=http%3A%2F%2F' +
			'finance.yahoo.com%2Fq%2Fks%3Fs%3D' +
			symbol +
			'&full_headers=1&full_status=1';

		// synchronous ajax call
		$.ajax({
			url: url,
			dataType: 'json',
			async: false,
			success: function(data) {
				str = JSON.stringify(data, null, 2);
				html = $.parseHTML(str);
				query = html[12];
				headDOM = query.getElementsByClassName('\\\"yfnc_tablehead1\\\"');
				dataDOM = query.getElementsByClassName('\\\"yfnc_tabledata1\\\"');
				title = $(query).find('div > div > div > div > h2');
				price = $(query).find('#\\\\\\\"yfs_l84_' + symbol + '\\\\\\\"');
				ticker.value = "$" + price.html();
				company.value = title.html();

			}
		});

		for (var i = 0; i < headDOM.length; i++) {
			head = headDOM[i].innerHTML;
			data = dataDOM[i].innerHTML;

			if (head.indexOf("<") != -1) {
				head = head.substring(0, head.indexOf("<"));
			}
			head = head.replace("amp;", "");
			if (data.indexOf("<") != -1) {
				data = data.substring(data.indexOf(">") + 1, data.lastIndexOf("<"));
			}

			$scope.trElements.push({
				text: head,
				value: data
			});
			
			$scope.stockInput = '';

		}
	}
}
