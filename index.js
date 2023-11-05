let inputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let resultEl = document.getElementById("searchResults");
let bookContainerEl = document.createElement("div");
resultEl.appendChild(bookContainerEl);

function createAndAppend(object) {
    let {
        title,
        imageLink,
        author
    } = object;

    spinnerEl.classList.add("d-none");

    resultEl.classList.remove("d-none");



    let bookEl = document.createElement("div");
    bookEl.classList.add("m-3");
    bookContainerEl.appendChild(bookEl);

    let imageEl = document.createElement("img");
    imageEl.classList.add("m-3");
    imageEl.src = imageLink;
    bookEl.appendChild(imageEl);

    let authorEl = document.createElement("p");
    authorEl.textContent = author;
    authorEl.classList.add("ml-3")
    bookEl.appendChild(authorEl);
}



function bookResponse(event) {
    if (event.key === "Enter") {
        let inputValue = inputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + inputValue;

        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(respone) {
                return respone.json()
            })
            .then(function(jsonData) {
                console.log(jsonData.search_results);
                if (jsonData.search_results === "") {
                    let noresultEl = document.createElement("h1");
                    noresultEl.textContent = "No results found";
                    noresultEl.classList.add("text-center");
                    resultEl.classList.remove("d-none");
                    resultEl.appendChild(noresultEl);
                } else {
                    for (let each of jsonData.search_results) {
                        spinnerEl.classList.remove("d-none");
                        createAndAppend(each);
                    }
                }
            });

    }
}


inputEl.addEventListener("keydown", bookResponse);
