// Axios responses have a lot of data. This shows only the most relevant data.
function showResponse(axiosResponse, callback) {
  const fullResponse = axiosResponse.response === undefined
    ? axiosResponse
    : axiosResponse.response;
  const abridgedResponse = {
    data: fullResponse.data,
    status: fullResponse.status,
    statusText: fullResponse.statusText,
  };
  callback(abridgedResponse);
}

/**
 * IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE.
 * EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API.
 * 
 * You can use axios to make API calls like this:
 * const body = { bar: 'baz' };
 * axios.post('/api/foo', body)
 *   .then(showResponse) // on success (Status Code 200)
 *   .catch(showResponse); // on failure (Other Status Code)
 * See https://github.com/axios/axios for more info
 */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for addUser, fields has properites 'username' and 'password'
 * callbackSuccess is a function that formats and returns a successful response
 * callbackFailure is a function that formats and returns a failed response
 */

// USER SERVICES

function addUser(fields, callbackSuccess, callbackFailure) {
  axios.post('/api/users', fields)  // req.body fields are included like this
    .then(response => showResponse(response, callbackSuccess)) // on success (Status Code 200)
    .catch(response => showResponse(response, callbackFailure)); // on failure (Other Status Code)
}

function getUser(fields, callbackSuccess, callbackFailure) {
  axios.get('/api/users/' + fields.username + '/' + fields.password) // req.param fields are included like this
    .then(response => showResponse(response, callbackSuccess)) // on success (Status Code 200)
    .catch(response => showResponse(response, callbackFailure)); // on failure (Other Status Code)
}

// CLOTHING SERVICES

function getAllClothing(callbackSuccess, callbackFailure) {
  axios.get('/api/clothing') 
    .then(response => showResponse(response, callbackSuccess)) // on success (Status Code 200)
    .catch(response => showResponse(response, callbackFailure)); // on failure (Other Status Code)
}

function getUserDonatedClothing(fields, callbackSuccess, callbackFailure) {
  axios.get('/api/clothing/donated/' + fields.username) 
    .then(response => showResponse(response, callbackSuccess)) // on success (Status Code 200)
    .catch(response => showResponse(response, callbackFailure)); // on failure (Other Status Code)
}

function getUserPendingClothing(fields, callbackSuccess, callbackFailure) {
  axios.get('/api/clothing/pending/' + fields.username) 
    .then(response => showResponse(response, callbackSuccess)) // on success (Status Code 200)
    .catch(response => showResponse(response, callbackFailure)); // on failure (Other Status Code)
}

function getUserPickedUpClothing(fields, callbackSuccess, callbackFailure) {
  axios.get('/api/clothing/pickedup/' + fields.username) 
    .then(response => showResponse(response, callbackSuccess)) // on success (Status Code 200)
    .catch(response => showResponse(response, callbackFailure)); // on failure (Other Status Code)
}

function donateClothingItem(fields, callbackSuccess, callbackFailure) {
  axios.post('/api/clothing', fields) 
    .then(response => showResponse(response, callbackSuccess)) // on success (Status Code 200)
    .catch(response => showResponse(response, callbackFailure)); // on failure (Other Status Code)
}