const quoteContainer  = document.getElementById('quote-container');
const quoteText  = document.getElementById('quote');
const authorText  = document.getElementById('author');
const twitterBtn  = document.getElementById('twitter');
const newQuoteBtn  = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes= [];

// Show Loading Screen
function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading Screen
function hideLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
    // show loader
    showLoader();

    // Pick a random quote from API quote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (quote.author == null) {
        authorText.textContent = 'Unknown';        
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    // complete laoding
    hideLoading();
}

// Get Qutoes from API
async function getQutoes() {
    // Show Loader
    showLoader();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
        console.log('Error: ', err)
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listenener
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQutoes();