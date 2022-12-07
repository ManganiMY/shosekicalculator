function empty_input(){
    const dataTable = document.getElementById("dataTable");
    let table_search = document.createElement("INPUT");
    table_search.setAttribute("type","text");
    table_search.setAttribute("id","myInput");
    table_search.setAttribute("onkeyup","filterfunction()");
    table_search.setAttribute("placeholder","Enter series name... (only JP supported for now)");

    dataTable.before(table_search);
}

function cleanup_page(){
    const page_parent = document.getElementsByClassName('content')[0];
    const page_footer = document.getElementsByClassName('entry_footer')[0];
    const page_pagetop = document.getElementsByClassName('pagetop')[0];

    page_parent.removeChild(page_footer);
    page_parent.removeChild(page_pagetop);

}

function filter_table_main(){
    cleanup_page();
    empty_input();
    var filter_script = document.createElement('script');
    filter_script.src = chrome.runtime.getURL('filter_function.js');
    filter_script.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(filter_script);
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
        filter_table_main()
    }
  
  }
check_page_type()