function filterfunction(filter_id) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(filter_id);
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    name_flag = false;
    date_flag = false;
    pub_flag = false;

    switch (filter_id) {
      case "name_filter": 
        filter_col = 2
        name_flag = true;
        date_filter = document.getElementById('date_filter').value.toUpperCase();
        pub_filter = document.getElementById('pub_filter').value.toUpperCase();

        break;
      case "date_filter": 
        filter_col = 5
        date_flag = true
        name_filter = document.getElementById('name_filter').value.toUpperCase();
        pub_filter = document.getElementById('pub_filter').value.toUpperCase();

        break;
      case "pub_filter": 
        filter_col = 3
        pub_flag = true;
        date_filter = document.getElementById('date_filter').value.toUpperCase();
        name_filter = document.getElementById('name_filter').value.toUpperCase();

        break;
      default:
        break;
    }
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[filter_col];
      td_name = name_flag ? 'skip' : tr[i].getElementsByTagName("td")[2].textContent;
        name_check = td_name === 'skip' ? true : td_name.toUpperCase().indexOf(name_filter) > -1;
      td_date = date_flag ? 'skip' : tr[i].getElementsByTagName("td")[5].textContent;
        date_check = td_date === 'skip' ? true : td_date.toUpperCase().indexOf(date_filter) > -1;
      td_pub = pub_flag ? 'skip' : tr[i].getElementsByTagName("td")[3].textContent;
        pub_check = td_pub === 'skip' ? true : td_pub.toUpperCase().indexOf(pub_filter) > -1;
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 && name_check && date_check && pub_check) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }

    sum_current(table)
  }




  function sum_current(table) {
    cols = table.rows[0].cells.length;
    if (cols > 6) {
      console.log('enter');
      total = 0;
      let subTotal = Array.from(table.rows).reduce((total, row) => {
        if(!row.getAttribute("style")){
          
          row_val = parseFloat(row.cells[6].innerHTML.replace(',', '').replaceAll('-',"0"));
           if (row_val !==  "undefined") { 

            
           total += row_val;
           }
       
        }
        return total;
      }, 0);
    
      document.getElementById("span_val").innerHTML = subTotal.toLocaleString();

    } else {
      console.log('nope');
    }
    
  }