"use client"

import axios from "axios";

const API_URL_TEST: any = 'https://cw.i24.dev/api/v1';
const TOKEN: any = 'B68puvfKsCzD5StRz9cMkkrj';

export async function useChatAPI() {

    // let config = {
    //     method: 'get',
    //     maxBodyLength: Infinity,
    //     url: 'https://cw.i24.dev/api/v1/accounts/1/conversations',
    //     // url: 'https://cors-anywhere.herokuapp.com/https://cw.i24.dev/api/v1/accounts/1/conversations',
    //     headers: {
    //         'api_access_token': 'B68puvfKsCzD5StRz9cMkkrj',
    //         'Access-Control-Allow-Origin': '*'
    //     },
    //     withCredentials: false,

    // };

    // console.log('config', config)

    // axios.request(config)
    //     .then((response) => {
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    try {
        const response = await axios.get('/api/komservice');
        console.log('xxxx',response.data);
    } catch (error) {
        console.error(error);
    }
    // const getConversations = async () => {
    //     // try {
    //     //     const response: any = await fetch(`${API_URL_TEST}/accounts/1/conversations`, { 
    //     //       method: 'get',
    //     //       headers: { 'api_access_token': `${TOKEN}` },
    //     //     }).then((res) => console.log('===> res', res));

    //     //     return response;
    //     //   } catch (err) {
    //     //     return null;
    //     // }  




    //     // const response:any = await fetch(`${API_URL_TEST}/accounts/1/conversations`, {
    //     //     method: 'GET',
    //     //     headers: {

    //     //         'api_access_token': `${TOKEN}`
    //     //     },
    //     // });

    //     // console.log(">>> response", response)





    //     // let config = {
    //     //     method: 'get',
    //     //     maxBodyLength: Infinity,
    //     //     url: 'https://cw.i24.dev/api/v1/accounts/1/conversations',
    //     //     headers: { 
    //     //         'api_access_token': 'B68puvfKsCzD5StRz9cMkkrj'
    //     //     }
    //     // };

    //     // axios.request(config)
    //     //     .then((response) => {
    //     //     console.log(JSON.stringify(response.data));
    //     //     })
    //     //     .catch((error) => {
    //     //     console.log(error);
    //     // });



    //     // XXXXX


    // }

    // return {
    //     getConversations
    // }
}