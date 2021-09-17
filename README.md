![GitHub contributors](https://img.shields.io/github/contributors/Chen-Yu-Chang/Calories_Tracker?logo=Github&style=for-the-badge)

# Calories_Tracker

EC463 Software Mini Project - Teammates: Chen-Yu Chang, Byron Mitchell

## Goal

* Frontend
    * Authentication
    * Barcode Scanner

* Backend
    * Rest API to return data
    * Firebase store data

## API Link 

[Food Data Central API](https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY)

More information on Food Data Central

* [Food Data Central Guide](https://fdc.nal.usda.gov/api-guide.html)

## App Overview

Our design of the app is using _React Native Expo_ for both the frontend and the backend design.

### Screens Functionality

* __Login Page__: 
    * This page allows users to log in to their own account.
    * If the users do not have an account yet, press the sign up button to create an individual account.
    * We also provide sign in method using Google account.

* __Sign Up Page__:
    * This page allows new users to create their own account with their email and password.
    * After creating account, we will navigate them to the login page to check if the account is successfully created.

* __Welcome Page__: 
    * We welcome all users to come back to our app, and they can start the functionality of the app when they press the start button.

* __Method Page__ :
    * This page takes you to the button that can start scanning your products.

* __Barcode Page__:
    * This page allows users to scan the food product's barcode and it triggers the api to search from the food data central.
    * This also returns the food name of the product and its calories.
    * When scanning the next item, users can press scan again button.