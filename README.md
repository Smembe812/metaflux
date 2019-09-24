This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>

## How the application works

Simply upload a picture of any actor on the start page. The app will fetch the identity of the actor in the image from [https://www.clarifai.com] (Clarifai's) celebrity model

From there the app will fetch all the movies from the [http://api.themoviedb.org] (Movies API) and you can click on a movie to vie more info.