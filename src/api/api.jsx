// Import Axios library
import axios from 'axios';
import { Service } from 'axios-middleware';
import { base_url, openstreetmap } from '../utils/Appconstants'; // Fix typo in import path

// Define API module using Immediately Invoked Function Expression (IIFE)
const API = (() => {
    // Declare variables
    let instance; // Singleton instance of the API object
    let token = ''; // Variable to store authentication token

    // Function to update token with passed arguments
    const updateArgsToken = (args) => {
        token = args; // Update token
    };
    
    // Remove trailing slashes from base URLs
    const removeTrailingSlash = (url) => {
        // console.log(url,'url===>')
        return url.replace(/\/+$/, ''); // Removes trailing slashes
    };

    // Constructor function to initialize API instance
    const constructor = ({ args } = {}) => {
        // Local variable to create Axios service
        let service = new Service(axios);

        // Register interceptors for request lifecycle
        service.register({
            async onRequest(config) {
                // Logic to handle request intercept
                // config.baseURL = removeTrailingSlash(config.baseURL);
                // config.headers.Authorization = `Bearer ${token}`;
                // console.log(config,'config====>')
                return config;
            },

            async onResponse(response) {
                // Logic to handle response intercept
                // console.log(response,'response----')
                return response;
            },

            async onResponseError(error) {
                // console.log(error,'errorr-mesg----')
                // Logic to handle response error intercept
                throw error; // Throw error to propagate it
            },
        });

        // Return configured Axios instances for different services
        return {
            // Auth service
            auth: axios.create({
                baseURL: base_url,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
            customuser: axios.create({
                baseURL: base_url,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
            orders: axios.create({
                baseURL: base_url,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
            menu: axios.create({
                baseURL: base_url,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
            base: axios.create({
                baseURL: base_url,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
            openstreetmap: axios.create({
                baseURL: openstreetmap,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
        };
    };

    // Static methods associated with the API instance
    let _static = {
        // Method to get singleton instance of the API object
        getInstance: (args) => {
            if (instance === undefined) {
                token = ''; // Reset token if instance is undefined
                instance = constructor(args); // Initialize instance
            } else if (args) {
                // Update token with passed arguments
                updateArgsToken(args);
            }
            return instance; // Return singleton instance
        },
    };

    return _static; // Return static methods
})();

// Export API module
export { API };
