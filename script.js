let url = "https://books-backend.p.goit.global/books/top-books";
let url2 = "https://books-backend.p.goit.global/books/category-list";
let categoryUrl = "https://books-backend.p.goit.global/books/category?category=";

document.addEventListener("DOMContentLoaded", () => {
    const profile = document.getElementById("profile");
    const logoutBtn = document.getElementById("logout-btn");

    
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        profile.textContent = loggedInUser;  
        logoutBtn.style.display = "inline";  
    } else {
        profile.textContent = "Profile";  
    }

    
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");  
        window.location.href = "index.html";  
    });
});

async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        showBooks(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function fetchCategories(url2) {
    try {
        let response = await fetch(url2);
        let data = await response.json();
        displayCategories(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

let categories = document.querySelector("#type");

function displayCategories(book) {
    categories.innerHTML = "";
    book.forEach(category => {
        let p = document.createElement("p");
        p.classList.add("category-item");
        p.textContent = category.list_name;
        categories.appendChild(p);

        p.addEventListener("click", async function() {
            const formattedCategory = category.list_name.replaceAll(" ", "+"); 
            const res = await fetch(categoryUrl + formattedCategory);
            const data = await res.json();
            showBooksCategories(data);
        });
    });
}

let showBookContainer = document.querySelector(".all-book");

function showBooks(bookArray) {
    showBookContainer.innerHTML = "";
    bookArray.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book-container");
        bookDiv.innerHTML = `
            <h2>${book.list_name}</h2>
            <div class="book-card"></div>
            <button class="see-more" data-category="${book.list_name}">See more</button>
        `;
        showBookContainer.appendChild(bookDiv);
        let bookCard = bookDiv.querySelector(".book-card");

        book.books.forEach(bookItem => {
            let bookImage = document.createElement("div");
            bookImage.classList.add("book-item");
            bookImage.innerHTML = `
                <img src="${bookItem.book_image}" alt="${bookItem.title}" width="200" height="250" />
                <h3 style="font-size: 12px;">${bookItem.title}</h3>
                <p>${bookItem.author}</p>
                <div class="quickView" style="display: none;">
                    <p>Quick view</p>
                </div>
            `;
            bookCard.appendChild(bookImage);

            
            bookImage.addEventListener("mouseenter", function() {
                const quickView = bookImage.querySelector(".quickView");
                quickView.style.display = "flex";
            });

            bookImage.addEventListener("mouseleave", function() {
                const quickView = bookImage.querySelector(".quickView");
                quickView.style.display = "none";
            });

            
            const quickView = bookImage.querySelector(".quickView");
            quickView.addEventListener("click", function() {
                showBookInfo(bookItem);
            });
        });

        const seeMoreButton = bookDiv.querySelector(".see-more");
        seeMoreButton.addEventListener("click", async function() {
            const category = this.getAttribute("data-category");
            const formattedCategory = category.replaceAll(" ", "+");
            const res = await fetch(categoryUrl + formattedCategory);
            const data = await res.json();
            showBooksCategories(data);
        });
    });
}


function showBookInfo(bookItem) {
    console.log(bookItem);
    
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    
    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.classList.add("book-info");
    bookInfoDiv.innerHTML = `
        <button class="close-btn">X</button>
        <div  class="left-book">
        <img src="${bookItem.book_image}" alt="${bookItem.title}" width="200" height="250" />
        
        </div>
        <div  class="right-book">
        <h2>${bookItem.title}</h2>
        <p>Author: ${bookItem.author}</p>
        <div class="buy-link">
        <a href="${bookItem.amazon_product_url}" target="_blank" rel="noopener noreferrer">
        <img src="./img/amazon.png" alt="Amazon Icon" />
        </a>
        <a href="${bookItem.buy_links[1].url}" target="_blank" rel="noopener noreferrer">
        <img src="./img/apple.png" alt="apple Icon"  />
        </a>
        <a href="${bookItem.buy_links[2].url}" target="_blank" rel="noopener noreferrer">
        <img src="./img/barnes.png" alt="barnes Icon"  />
        </a>
        </div>

        </div>
    `;

    
    document.body.appendChild(bookInfoDiv);

    
    overlay.style.display = "block";
    bookInfoDiv.style.display = "flex";

    
    const closeBtn = bookInfoDiv.querySelector(".close-btn");
    closeBtn.addEventListener("click", function() {
        overlay.style.display = "none";
        bookInfoDiv.style.display = "none";
        document.body.removeChild(overlay);
        document.body.removeChild(bookInfoDiv);
    });
}

const toggleDarkMode = document.querySelector(".toggle");

toggleDarkMode.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");  
        document.getElementById('book-logo').style.color = "#000"; 
        document.getElementById('profile').style.color = "#000"; 
        document.getElementById('right-header').style.color = "#4f2ee8";
    } else {
        document.body.classList.add("dark-mode");  
        document.getElementById('book-logo').style.color = "#fff"; 
        document.getElementById('right-header').style.color = "goldenrod"; 
        document.getElementById('profile').style.color = "#fff"; 
    }
});


let heading = document.querySelector('.Categories');

function showBooksCategories(bookArray) {
    heading.textContent = `Books in ${bookArray[0].list_name}`;
    showBookContainer.innerHTML = "";
    bookArray.forEach(bookItem => {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book-card2");
        bookDiv.innerHTML = `
            <div>
                <img src="${bookItem.book_image}" alt="${bookItem.title}" width="200" height="250" />
                <h3>${bookItem.title}</h3>
                <p>${bookItem.author}</p>
                <div class="quickView-2" style="display: none;">
                    <p>Quick view</p>
                </div>
            </div>
        `;
        showBookContainer.appendChild(bookDiv);

        
        bookDiv.addEventListener("mouseenter", function() {
            const quickView = bookDiv.querySelector(".quickView-2");
            quickView.style.display = "flex";
        });

        bookDiv.addEventListener("mouseleave", function() {
            const quickView = bookDiv.querySelector(".quickView-2");
            quickView.style.display = "none";
        });

        
        const quickView = bookDiv.querySelector(".quickView-2");
        quickView.addEventListener("click", function() {
            showBookInfo(bookItem); 
        });
    });
}


fetchCategories(url2);
fetchData(url);
