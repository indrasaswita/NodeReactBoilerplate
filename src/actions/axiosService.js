import axios from 'axios';
import {
	API_GET,
	API_POST,
	API_PUT,
	API_DELETE,
	API_OPTIONS
} from './../enums/types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const baseApi = process.env.REACT_APP_BASEAPIURL;
const sendApi = (url, action, whendone = null) => {
	const token = cookies.get('auth_token') || null;
	switch (action.type) {
		case API_GET:
			axios
				.get(`${baseApi}${url}`, {
					headers: {
						"authorization": 'Bearer ' + token,
            "accept": 'application/json',
						"content-Type": 'application/json',
					},
					params: action.params
				})
				.then(response => {
					const result = response.data.data;
					const message = response.data.message;

					if (whendone && whendone instanceof Function) {
						whendone(message, result);
					} else {
						console.error("[Actions] AxiosService Error: Get function need 3rd param `whendone` not exists");
					}
				}).catch(error => {
				console.log('error get', error);
			});
			break;
		case API_POST:
			axios
				.post(`${baseApi}${url}`, action.data, {
					headers: {
						"authorization": 'Bearer ' + token,
						"accept": 'application/json',
						"content-Type": 'application/json',
					},
					params: action.params
				})
				.then(response => {
					const result = response.data.data;
					const message = response.data.message;

					if (whendone instanceof Function) {
						whendone(message, result);
					}
				}).catch(error => {
				console.log('error post', error);
			});
			break;
		case API_DELETE:
			axios
				.delete(`${baseApi}${url}`, {
          headers: {
            "authorization": 'Bearer ' + token,
            "accept": 'application/json',
            "content-Type": 'application/json',
          },
        })
				.then(response => {
					const result = response.data.data;
					const message = response.data.message;

					if (whendone instanceof Function) {
						whendone(message, result);
					}
				}).catch(error => {
				console.log('error delete', error);
			});
			break;
	}
};

export default sendApi;