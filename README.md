# EvitalTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Project Structure

The entire project code is located in the `main` branch.

## Features

## Login Page

- URL: `http://localhost:4200/login`
- Users can log in using the login form.
- Upon clicking the login button:
- User credentials are stored in `localStorage`.
- The user is redirected to the dashboard.

## Dashboard Page

- URL: `http://localhost:4200/dashboard`

-It allows users to search for medicines and add them to their cart.

1. **Medicine Search**:

   - Users can search for medicines by typing in the search bar.
   - Search begins automatically after the user types at least 3 characters, with a debounce time of 1 second.
   - Search results include medicine details such as name, content, price, MRP, packing size, and manufacturer.

2. **Medicine Availability**:

   - Each medicine card is color-coded to indicate availability:
     - **Red Card**: The medicine is not available for patients.
     - **Green Card**: The medicine is available for patients.

3. **Loading Indicator**:

   - A spinner is displayed while search results are being fetched.

4. **Error Handling**:

   - Displays error messages if there is an issue with fetching medicines.

5. **Add to Cart**:

   - Users can add a medicine to the cart by clicking the "Add to Cart" button.
   - A success alert is shown upon adding a medicine.

6. **No Results**:
   - If no medicines are found, a friendly message prompts the user to try another search.

## Checkout Page

- URL: `http://localhost:4200/checkout`

## Features

## Cart Items Display:

1.  The checkout page fetches the list of medicines added to the cart from localStorage.
2.  Displays medicine details including name, content, price, MRP, packing size, and manufacturer.

## Select Patient:

1. A "Select Patient" button is displayed if no patient has been selected yet.
2. On clicking the button, a dialog box opens to allow the selection or addition of a patient.

## Patient Dialog:

## Search for Existing Patient:

1. Users can search for a patient by ID.
2. If found, the patient's details are displayed in a card format with a "Select" button.

## Add New Patient:

1. If the patient is not found, users can click "Add New" to fill a form with details such as name, date of birth, gender, blood group, mobile number, and ZIP code.
2. On submission, the new patient is saved and automatically selected.

## Place Order:

1. After selecting a patient, the "Place Order" button becomes active.
2. On clicking "Place Order":
   - The selected patient's details and medicines from the cart are sent to the server.
   - Displays success or error messages based on the API response.
   - If successful, the cart is cleared, and the user is redirected to the dashboard.

## Empty Cart Handling:

1. If the cart is empty, a friendly message is displayed: "Your cart is empty"
