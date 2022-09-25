let searchInputEle = document.getElementById("searchInput");
let searchResultContainer = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //creating Result item --- div container
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultContainer.appendChild(resultItemEl);
    // creating title element --- anchor title 
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);
    // creating break element --- title break 
    let breakEl = document.createElement("br");
    resultItemEl.appendChild(breakEl);
    // creating url element --- anchor url 
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);
    // creating break element --- line break 
    let linebreakEl = document.createElement("br");
    resultItemEl.appendChild(linebreakEl);
    // creating description element --- paragraph description
    let paraEl = document.createElement("p");
    paraEl.classList.add("line-description");
    paraEl.textContent = description;
    resultItemEl.appendChild(paraEl);
}

function displayResults(searchResults) {
    //let result = searchResults[0];
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultContainer.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEle.value;
        //console.log(searchInput);
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                //console.log(jsonData);
                let {
                    search_results
                } = jsonData;

                displayResults(search_results);
            });
    }
}
searchInputEle.addEventListener("keydown", searchWikipedia);