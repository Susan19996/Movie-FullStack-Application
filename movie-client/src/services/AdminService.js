const ADMIN_SERVICE_URL = "https://movietable-server.herokuapp.com/api/admin";
const ADMIN_SERVICE_URL_LOCAL = "http://localhost:8080/api/admin";
/**
 * Admin Service class to interact with backend server.
 */
export default class AdminService {
    register = (user) => {
        return fetch(ADMIN_SERVICE_URL+"/register",{
                                                     body: JSON.stringify(user),
                                                     headers: {
                                                         'Content-Type': 'application/json'
                                                     },
                                                     method: 'POST'}).then(usr => {return usr.json()});
    }

    login = (user) => {
        return fetch(ADMIN_SERVICE_URL+"/login",{
                                                  body: JSON.stringify(user),
                                                  headers: {
                                                      'Content-Type': 'application/json'
                                                  },
                                                  method: 'POST'}).then(usr => {return usr.json()});
    }

    updateProfile = (user) => {
        return fetch(ADMIN_SERVICE_URL+"/profile",{
                                                    body: JSON.stringify(user),
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    method: 'PUT'}).then(usr => {return usr.json()});
    }

    logoutUser = () => {
        return fetch(ADMIN_SERVICE_URL+"/logout",{
                                                   headers: {
                                                       'Content-Type': 'application/json'
                                                   },
                                                   method: 'POST'});
    }

    getRecommendMovies = (admin) => {
        return fetch(ADMIN_SERVICE_URL+"/"+admin+"/recommended")
            .then(response => response.json());
    }
}