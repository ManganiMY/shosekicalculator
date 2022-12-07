function checkpage() {

    const check = document.getElementsByClassName('entry_header')[0];
    const check_split = check.textContent.split(" ");

    if (
        check_split[0].includes("-") ||
        check_split[0].includes("月") ||
        check_split[0].includes("年漫画") ||
        check_split[0].includes("年下半期") ||
        check_split[0].includes("年上半期") ||
        check_split[0].concat(check_split[1]).includes("年漫画")
    )   {
        // console.log("passed"); // debug check
        shoseki();
        }
    else {
            // console.log("not passed"); // debug check
        }
    }


function shoseki() {
        const Entry = document.getElementsByClassName('entry_body')[0];
        let math_anchor = Entry.childNodes;
        const searchText = "※";
        let found = "xempty";
        let found_list;
        let ranges = [];
        let estimates = [];
        let multiplier = [];
        let est_range = [];
        let n;
        let j = 0;
        let k;
        let l;

        for (let i = 0; i < math_anchor.length; i++) { //Find estimates
            if (math_anchor[i].textContent.includes(searchText)) {
                found = math_anchor[i + 2].textContent;
                break;
            }
        };

        if (found == "xempty") { // if no estimates
            // console.log("no estimates found"); // debug check
            return;
        }

        if (found.includes("万")) { // check for 万 symbol
            found_list = found.split("万").join("").split("/").join('|').split("位").join('|').split('|');
            found_list = found_list.map(Number);

            for (let i = 1; i < found_list.length; i += 2) { // and convert
                if (found_list[i] < 1000) {
                    found_list[i] = found_list[i] * 10000;
                } 
                else {
                    found_list[i] = found_list[i];
                }
            }
        } else {
            found_list = found.split("/").join('|').split("位").join('|').split('|');
            found_list = found_list.map(Number);
        }
        // console.log(found_list);
        // console.log(found_list.length);

        for (let i = 0; i < found_list.length; i += 2) { // take every second element
            ranges.push(found_list[i]);
        }
        // console.log(ranges);

        for (let i = 1; i < found_list.length; i += 2) { // take every second element
            estimates.push(found_list[i]);
        }
        // console.log(estimates);

        for (let i = 1; i < found_list.length; i += 2) { // take every second element
            n = (found_list[i] - found_list[i + 2]) / (found_list[i + 1] - found_list[i - 1]);
            multiplier.push(n);
        }
        // console.log(multiplier);
        let x;
        // console.log("calc start");
        k = 0;
        l = Math.max(...estimates).toString().length;

		while (k < ranges.length - 1) {
                for (let i = 1; i < 501; i++) {

                    if (i < ranges[0]) {
                        est_range.push("-".repeat(l));
                        // x = "no estimates"
                    } else {
                        if (i < ranges[k + 1]) {
                            est_range.push(Math.floor(estimates[k] - (multiplier[k] * (i - ranges[k]))));
                            x = Math.floor(estimates[k] - (multiplier[k] * (i - ranges[k])));
                        } else {
                            est_range.push(Math.floor(estimates[k] - (multiplier[k] * (i - ranges[k]))));
                            x = Math.floor(estimates[k] - (multiplier[k] * (i - ranges[k])));
                            k = k + 1;
                        }

                    }
                    // console.log(i + "|" + x + "|" + k + "|" + ranges[k] + "|" + ranges[k + 1]);
                }
            }
        // console.log("calc end");

        for (let i = 0; i < math_anchor.length; i++) {
            if (j === 500) {
                break;
            }
            if (math_anchor[i].nodeName == "BR") {
                if (j <1){ // for first estimate
                if (i < 3 || (math_anchor[i+2].nodeName!="A" || math_anchor[i-1].nodeName=="BR")) {
                    continue;
                }}
                let tag = document.createElement("span");
                    tag.className = "estimates";
                tag.innerHTML = est_range[j].toLocaleString();
                math_anchor[i].before(tag);
                j = j + 1;
                i = i + 1;
            }
        }

    } 

checkpage()
