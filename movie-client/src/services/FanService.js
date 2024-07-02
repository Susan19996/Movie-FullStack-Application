const FAN_SERVICE_URL = "https://movietable-server.herokuapp.com/api/fan";
const FAN_SERVICE_URL_LOCAL = "http://localhost:8080/api/fan";
/**
 * Fan Service class to interact with backend server.
 */
export default class FanService {
     register = (user) => {
        return fetch(FAN_SERVICE_URL+"/register",{
            body: JSON.stringify(user),
                  headers: {
                           'Content-Type': 'application/json'
                           },
                  method: 'POST'}).then(usr => {return usr.json()});
    };

     login = (user) => {
        return fetch(FAN_SERVICE_URL+"/login",{
            body: JSON.stringify(user),
              headers: {
                    'Content-Type': 'application/json'
                 },
               method: 'POST'}).then(usr => {return usr.json()});
    };

     updateProfile = (user) => {
        return fetch(FAN_SERVICE_URL+"/profile",{
                 body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                method: 'PUT'}).then(usr => {return usr.json()});
    };

     logoutUser = () => {
        return fetch(FAN_SERVICE_URL+"/logout",{
                 headers: {
             'Content-Type': 'application/json'
            },
         method: 'POST'});
    };

    getLikedMovies = (username) => {
         return fetch(FAN_SERVICE_URL+"/"+username+"/movies")
             .then(response => response.json());
    }

    getAllReviews = (username) => {
        return fetch(FAN_SERVICE_URL+"/"+username+"/reviews")
            .then(response => response.json());
    }

    findAllFans = () => {
        return fetch(FAN_SERVICE_URL+"/all")
            .then(response => response.json());
    }
}