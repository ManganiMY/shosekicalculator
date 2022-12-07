function empty_input(){
    const dataTable = document.getElementById("dataTable");
    let name_search = document.createElement("INPUT");
    name_search.setAttribute("type","text");
    name_search.setAttribute("id","name_filter");
    name_search.setAttribute("class","filter_input");
    name_search.setAttribute("onkeyup","filterfunction('name_filter')");
    name_search.setAttribute("placeholder","Enter series name... (only JP supported for now)");

    dataTable.before(name_search);

    let pub_search = document.createElement("INPUT");
    pub_search.setAttribute("type","text");
    pub_search.setAttribute("id","pub_filter");
    pub_search.setAttribute("class","filter_input");
    pub_search.setAttribute("onkeyup","filterfunction('pub_filter')");
    pub_search.setAttribute("placeholder","Enter publisher name... (only JP supported for now)");

    dataTable.before(pub_search);

    let date_search = document.createElement("INPUT");
    date_search.setAttribute("type","text");
    date_search.setAttribute("id","date_filter");
    date_search.setAttribute("class","filter_input");
    date_search.setAttribute("onkeyup","filterfunction('date_filter')");
    date_search.setAttribute("placeholder","Enter Date in YYYY-MM-DD format (partial date supported)");

    dataTable.before(date_search);
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
        filter_table_main();
    }
  
  }
check_page_type();