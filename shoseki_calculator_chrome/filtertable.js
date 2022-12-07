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

cleanup_page()
empty_input()
var s = document.createElement('script');
s.src = chrome.runtime.getURL('filter_function.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);