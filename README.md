# RestAP

This project features a dynamic RestAPI created using Node.js and MongoDB. The API makes it easy to retrieve and work with data freely. Users can perform tasks like searching, sorting, selecting and changing data formats.The API runs on localhost:8000 and provides two main routes:

## Route 1 - Pagination and Data Manipulation

- **Endpoint**: `/`
- **Description**: This route provides data in a paginated form, with each page displaying 10 entries. Users can perform various operations:

  - **Search**: Data can be searched by name or company.
    - Example: `localhost:8000?search=name`
  - **Sorting**: Users can sort the data.
    - Example: `localhost:8000?sort=field`
  - **Selecting Specific Fields**: Users can select specific fields to view.
    - Example: `localhost:8000?select=name`
  - **Pagination**: Users can navigate between pages.
    - Example: `localhost:8000?page=2`
  - **Changing Data Format**:
    - XML format: `localhost:8000?format=xml`
    - CSV format: `localhost:8000?format=csv` (Downloads 10 entries based on the current page)

## Route 2 - All Data Display

- **Endpoint**: `/view`
- **Description**: This route displays all data in sorted order. Users can also change the format of the data:

  - **Changing Data Format**:
    - XML format: `localhost:8000/view?format=xml`
    - CSV format: `localhost:8000/view?format=csv` (Downloads all entries)

## How to Run

1. Ensure you have npm, Node.js, and a MongoDB Atlas account.
2. Clone this repository and navigate to the project directory.
3. Install dependencies: `npm install`
4. Replace the MongoDB connection string in the project with your MongoDB Atlas connection string.
5. Start the server: `npm start`
6. The API will be accessible at `localhost:8000`

## Live Demo

Visit the hosted version [here](https://restapi-production-06bd.up.railway.app/).
