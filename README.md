# Project for job interview in Department of Software Development and OTT Solutions.

========================

## Indroduction

This project involves conducting HTTP GET requests to analyze various attributes of the response. It provides the flexibility to specify the number of request iterations and the interval between each request. The key features include:

-   **Request Analysis**: Each HTTP GET request captures and examines the following attributes:

    -   **Status Code**: The HTTP status code returned by the server.
    -   **Content Type**: The type of content included in the response.
    -   **Response Time**: The duration taken to receive the response.

-   **Customization Options**:

    -   **Request Iterations**: Users can specify how many times the GET request should be executed. (Default 10)
    -   **Request Interval**: Users can set the time gap between consecutive requests. (Default 5)

-   **Additional Analytics**:
    -   **Minimum Response Time**: The shortest duration observed among the request responses.
    -   **Maximum Response Time**: The longest duration observed among the request responses.
    -   **Average Response Time**: The mean duration of all request responses.

This project aims to provide insights into the performance and characteristics of HTTP GET requests, allowing users to analyze response times across multiple iterations. It offers valuable metrics such as minimum, maximum, and average response times to aid in performance evaluation.

## Technologies

Required version of Node.js: v20.10.0.

## Launch

To run this project, install it locally using npm:

```
$ npm install
$ npm start
```

If you'd like to use personalised options use:

```
$ npm install
$ npx ts-node index.ts --x=[your_number_of_iteration] --y=[your_interval_time_in_seconds]
```
