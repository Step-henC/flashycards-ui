# What is this App

This is a Flash Card app with a social component that allows for real-time comment streaming. The video [can be seen here](https://www.linkedin.com/posts/stephen-e-cunningham-7077b6239_i-wanted-to-play-with-kafka-for-real-time-activity-7156449722835042304-I4MT?utm_source=share&utm_medium=member_desktop). 
This project relies on the [backend server, found here](https://github.com/Step-henC/flashycards-backend) to create a user ID on login.
From there, users can create flashcards. To take advantage of the kafka-driven comment feature, you can use the [comment server here](https://github.com/Step-henC/flashycards-backend)
or follow instructions on the backend server, to set up kafka locally and curl to create topics. 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## How to Run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Flashy Cards Features

Flashy cards is a standard React UI with use of browser storage DB known as **[DexieJS](https://dexie.org/)**. Dexie JS is a light-weight IndexedDB wrapper
ideal for complex object storage. Faster than JSON parsing from localStorage. To avoid prop-drilling, new flash card decks are stored in Dexie JS DB with the 
Dexie-generated ID placed in the URL for retrieval in the flashcard page. The deck is then extracted from DB to be worked by user. 
Comment objects are also stored in DexieJS DB. Dexie offers a number of SQL-like features ideal for sorting and filtering data too. 

## Considerations

- TODO Implement DexieJS for sort and filter features
