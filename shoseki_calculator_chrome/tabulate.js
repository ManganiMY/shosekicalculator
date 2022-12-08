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
      return 5;
      }
  else {
    return 4;
      }
  }


function extract() {
  const page_parent = document.getElementsByClassName('content')[0];
  const Entry = document.getElementsByClassName('entry_body')[0];
  let math_anchor = Entry.childNodes;
  let j=0;
  let full_data = [];
  let single_data =[];
  let k = checkpage();
  for ( let i=0; i<math_anchor.length; i++) {
    if (math_anchor[i].nodeName != "BR") {
      j = j +1 ;
      if (j>k){
        full_data.push(single_data);
        break;
      }
      else if (math_anchor[i].nodeName == "SCRIPT"){
        full_data.push(single_data);
        break;
      }
      else if (math_anchor[i].nodeName == "DIV"){
        if (math_anchor[i].classList.contains("google-auto-placed")){
          j = j-1;
          continue;
        } else {
        full_data.push(single_data);
        break;
        }
      }
      else if (math_anchor[i].nodeName == "IMG"){
        continue;
      }
      single_data.push(math_anchor[i].textContent);
    }
    else {
      if (j <3 && i > 100){
        break;
      }
      else if(j>2){
        full_data.push(single_data);
      }
      // console.log(single_data); // check for each table
      single_data = [];
      j = 0;
    }
  }
  // console.log(full_data); //check for final table
  page_parent.removeChild(Entry);
  createTable(full_data, page_parent);

}

function createTable(tableData, page_parent) {
  let table = document.createElement('table');
  table.setAttribute("id","dataTable");
  let tableBody = document.createElement('tbody');
//   let columngroup = document.createElement("COLGROUP");

  tableData.forEach(function(rowData) {
    let row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

//   table.appendChild(columngroup);
  table.appendChild(tableBody);
  page_parent.appendChild(table);
}

function check_page_type(){
  if (
      window.location.href.indexOf("blog-date") != -1 || 
      window.location.href.indexOf("blog-category") != -1 || 
      window.location.href.indexOf("blog-entry-32.html") != -1
  ){
    return
  }
  else {
    extract()
  }

}
 check_page_type()
