As mentioned in previous assignments, something along the lines of JSDoc would be sufficient. For each route, include a brief explanation for each possible status code that can be returned.


post '/api/users' -
    200: successfully created user 
    400: username or password not properly formatted 
    403: user already logged in 

post('/api/users/session - 
    200: successfully sign in 
    400: username doesn't exist, different than current username  
    401: invalid credentials 
    403: user already logged in 

delete('/api/users/session - 
    200: successfully sign out 
    403: user already logged out 



post('/api/listings'
    200: successfully create listing 
    400: invalid address or information of a listing 
    403: person creating listing is not a rental agency 
    401: this address already exists 

get('/api/listings/renter'
    200: successfully view all listings for each renter 
    400: no listings to view 

get('/api/listings/rentalAgency'
    200: successfully view all listings for each rental agency 
    400: no listings to view 

post('/api/applications/'
    200: successfully add application 
    403: person creating application is not a renter/applicant or user is not logged in 
    401: this application already exists 

get('/api/applications'
    200: successfuly get application 
    403: person getting application is not the government 

get('/api/applications/users'
    200: successfully get completed applications 

get('/api/applications/items/'
    200: get a certain Application item (like housing doc)

put('/api/applications/submit/ 
    200: user submits application successfully
    400: application has missing information 
    403: user is not a applicant or no user is logged in 
    402: application has invalid information 

delete('/api/applications/submit/'
    200: user removes application 
    403: user is not a applicant or no user is logged in 

put('/api/applications/housing_birth
    200: user updates housing birth 
    402: invalid information 


put('/api/applications/housing_rental'
    200: user updates housing rental 
    402: invalid information 

put('/api/applications/housing_tax'
    200: user updates housing tax 
    402: invalid information 


put('/api/applications/residency_id'
    200: user updates residency id  
    402: invalid information 

put('/api/applications/residency_rental'
    200: user updates residency rental  
    402: invalid information 

put('/api/applications/residency_school
    200: user updates residency school   
    402: invalid information 

put('/api/applications/residency_utility'
    200: user updates residency utility    
    402: invalid information 


put('/api/applications/emergency_eviction'
    200: user updates emergency eviction     
    402: invalid information 

put('/api/applications/emergency_homeless
    200: user updates emergency homeless      
    402: invalid information 

put('/api/applications/emergency_overcrowded
    200: user updates emergency overcrowded       
    402: invalid information 



get('/api/applications/housing_names/
    200: user gets housing names 
    400: user not the government 

.... ( for rest of getting documents )