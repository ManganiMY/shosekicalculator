var check = document.getElementsByClassName('entry_title')[0];

if (check.textContent.split(" ")[0].includes("-") == true || check.textContent.split(" ")[0].includes("月") == true ||  check.textContent.split(" ")[0].includes("年漫画") == true||check.textContent.split(" ")[0].includes("年下半期") == true || check.textContent.split(" ")[0].includes("年上半期") == true || check.textContent.split(" ")[0].concat(check.textContent.split(" ")[1]).includes("年漫画") == true) {

var Entry = document.getElementsByClassName('entry_body')[0];
var math_anchor = Entry.childNodes;
var searchText = "※";
var found = "xempty";
var found_list;
var estimates = [];
var multiplier = [];
var est_range = [];
var insert_list = [];
var results = [];
var n;
var j = 0;
var k;


for (var i = 0; i < math_anchor.length; i++) {
  if (math_anchor[i].textContent.includes(searchText)) {
    found = math_anchor[i+2].textContent;
    break;
  }
};

if (found == "xempty"){
	}
	
else{
	if (found.includes("万")) {
		found_list = found.split("万").join("").split("/").join('|').split("位").join('|').split('|');
		found_list = found_list.map(Number);
		for (var i = 1; i < found_list.length; i+= 2) {
			if (found_list[i] < 1000) {
			found_list[i] = found_list[i] * 10000
			}
			else 
			found_list[i] = found_list[i]
		}
	}
	else {
		found_list = found.split("/").join('|').split("位").join('|').split('|');
		found_list = found_list.map(Number);
	}


	for(var i = 1; i < found_list.length; i += 2) {  // take every second element
		estimates.push(found_list[i]);
		}
	estimates;

	for(var i = 1; i < found_list.length-2; i += 2) {  // take every second element
		n = (found_list[ i ] - found_list[ i + 2]) / (found_list[ i + 1 ] - found_list[ i - 1 ])
		multiplier.push(n)
		}

	if (check.textContent.split(" ")[0].includes("年下半期") == true || check.textContent.split(" ")[0].includes("年上半期") == true ||check.textContent.split(" ")[0].includes("年漫画") == true|| check.textContent.split(" ")[0].concat(check.textContent.split(" ")[1]).includes("年漫画") == true) {
		for (var i= 1; i < 501; i++) {
			if (i < 100 ) {
				est_range.push("no estimates")
				}
			else if(i < 200 ) {
				est_range.push(Math.floor(estimates[0] - (multiplier[0] * (i - 100))))
				}
			else if(i < 300 ) {
				est_range.push(Math.floor(estimates[1] - (multiplier[1] * (i - 200))))
				}
			else if(i < 400 ) {
				est_range.push(Math.floor(estimates[2] - (multiplier[2] * (i - 300))))
				}		
			else if(i < 501 ) {
				est_range.push(Math.floor(estimates[3] - (multiplier[3] * (i - 400))))
				}
			}	
	}
	else {		
		for (var i= 1; i < 501; i++) {
			if (i < 30 ) {
				est_range.push("no estimates")
				}
			else if(i < 50 ) {
				est_range.push(Math.floor(estimates[0] - (multiplier[0] * (i - 30))))
				}
			else if(i < 100 ) {
				est_range.push(Math.floor(estimates[1] - (multiplier[1] * (i - 50))))
				}
			else if(i < 200 ) {
				est_range.push(Math.floor(estimates[2] - (multiplier[2] * (i - 100))))
				}
			else if(i < 300 ) {
				est_range.push(Math.floor(estimates[3] - (multiplier[3] * (i - 200))))
				}
			else if(i < 400 ) {
				est_range.push(Math.floor(estimates[4] - (multiplier[4] * (i - 300))))
				}		
			else if(i < 501 ) {
				est_range.push(Math.floor(estimates[5] - (multiplier[5] * (i - 400))))
				}
			}	
	}

	var j = 0;


	for (var i=0; i < math_anchor.length; i++) {
		if (j === 500) {
			break;
		}
		if (math_anchor[i].nodeName == "BR") {
			if (i<3) {
				continue
			}
		var tag = document.createElement("span")
		tag.className = "estimates";
		tag.innerHTML = " | " + est_range[j].toLocaleString() + " | ";
		math_anchor[i].before(tag);
		j = j + 1
		i = i + 1
			}		
	}
	}
}