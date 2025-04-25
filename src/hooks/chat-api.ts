"use client"

import axios from "axios";

const API_URL_TEST: any = 'https://cw.i24.dev/api/v1';
const TOKEN: any = 'B68puvfKsCzD5StRz9cMkkrj';

export function useChatAPI() {
    const getConversations = async () => {
        try {
            const response = await axios.get('/api/get-conversations').then((res: any) => {return res?.data?.data});

            return response;
        } catch (error) {
            console.error(error);
        }

        return null
    }

    const getChatdetails = async (id: any) => {
        try {
            // const response = await axios.get(`https://cw.i24.dev/api/v1/accounts/1/conversations/${id}/messages`,{
            const response = await axios.get(`/api/get-chatdetails`,{
                // params: {
                //     'msg-id': id
                // }
            }).then((res: any) => {return res?.data?.data});

            return response;
        } catch (error) {
            console.error(error);
        }

        return null
    }

    return {
        getConversations,
        getChatdetails
    }
}