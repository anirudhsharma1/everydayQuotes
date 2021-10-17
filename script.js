const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Show Loader 

function loading(){
    loader.hidden= false;
    quoteContainer.hidden= true;
}

// Hide Loader

function complete(){
    quoteContainer.hidden= false;
    loader.hidden= true;
}




let apiQuotes = [];

// Show Quotes
function newQuote(){
    loading();
// Pick a random Quote 
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

// Check if Author Field is blank and replace it with 'Unkown'

if(!quote.author){
    authorText.textContent = 'Unknown';
}
else {
    authorText.textContent = quote.author;
}

// Check Quote length to determine styling
if(quote.text.length > 50){
    quoteText.classList.add('long-quote');
}
else{
    quoteText.classList.remove('long-quote');
}
// Set the quote, hide loader
quoteText.textContent = quote.text;
complete();

}

//  Get Quotes From API

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
        // Catch Error Here
    }
}

// Tweet Quotes 

const tweetQuote = () => { 
const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
window.open(twitterUrl, '_blank');
}


// Event Listener

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load

getQuotes();