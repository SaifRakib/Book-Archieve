// Declare variable
const bookList = document.getElementById('book');
const totalDataDisplay = document.getElementById('total-search');
const errorMsg = document.getElementById('error-msg');

// Display Result
const displayResult = () => {
    let searchtxt = document.getElementById('search-input');
    let searchValue = searchtxt.value.trim();

    // fetch the api
    fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
    .then(response => response.json())
    .then(data => {
        let TotalSearch = `
        <h3>Total Search Result: <span class="text-success">${data.numFound}</span></h3>
        `;
        totalDataDisplay.innerHTML = TotalSearch;

        let html='';
        if(data.docs.length > 0){
            data.docs.forEach(book => {
                 html += `
                 <div class="book-info text-center">
                    <div class="book-image">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="center" alt="Book Image">
                    </div>
                    <div>
                    <h3>${book.title}</h3>
                    <h6><span>by </span>${book.author_name}</h6>
                    <p>First publish in ${book.first_publish_year}</p>
                    </div>
                </div>
                `;
            });
        }else{
            // display error message
            let error = `
            <h2 class='text-center text-danger'>Sorry! We didn't found any book of "${searchValue}"</h2>
            `;
            errorMsg.innerHTML = error;
        }
        bookList.innerHTML = html;
    })
    // clear input field
   searchtxt.value = ''; 
};