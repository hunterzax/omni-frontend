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
            const response = await axios.get(`/api/get-chatdetails`, { params: {'msg-id': id}}).then((res: any) => {return res?.data});

            return response;
        } catch (error) {
            console.log('errrorrrrr')
            console.error(error);
        }

        return null
    }

    const getUserdetails = async (id: any) => {
        try {
            const response = await axios.get(`/api/get-user-detail`, { params: {'msg-id': id}}).then((res: any) => {return res?.data});

            return response;
        } catch (error) {
            console.log('errrorrrrr')
            console.error(error);
        }

        return null
    }

    const getConversationsByid = async (id: any) => {
        try {
            const response = await axios.get(`/api/get-conversations-by-inbox`, { params: {'id': id}}).then((res: any) => {return res?.data?.data});

            return response;
        } catch (error) {
            console.log('errrorrrrr')
            console.error(error);
        }

        return null
    }

    const sendChat = async (id: any, body: any) => {
        try {
            const response = await axios.post(`/api/send-message`, { params: {'msg-id': id}, body }).then((res: any) => {return res?.data});

            return response;
        } catch (error) {
            console.log('errrorrrrr')
            console.error(error);
        }

        return null
    }

    return {
        getConversations,
        getChatdetails,
        getUserdetails,
        getConversationsByid,
        sendChat
    }
}

export function useLabelAPI() {
    const getLabels = async () => {
        try {
            const response = await axios.get('/api/get-labels').then((res: any) => {return res?.data?.payload});

            return response;
        } catch (error) {
            console.error(error);
        }

        return null
    }

    return {
        getLabels
    }
}

export function useInboxesAPI() {
    const getInboxes = async () => {
        try {
            const response = await axios.get('/api/get-inboxes').then((res: any) => {return res?.data?.payload});

            return response;
        } catch (error) {
            console.error(error);
        }

        return null
    }

    return {
        getInboxes
    }
}

export function useContactsAPI() {
    const getContactList = async () => {
        try {
            const response = await axios.get('/api/get-contacts').then((res: any) => {return res?.data});

            return response;
        } catch (error) {
            console.error(error);
        }

        return null
    }

    const getContactdetails = async (id: any) => {
        try {
            const response = await axios.get(`/api/get-contact-details`, { params: {'id': id}}).then((res: any) => {return res?.data?.payload});

            return response;
        } catch (error) {
            console.log('errrorrrrr')
            console.error(error);
        }

        return null
    }

    return {
        getContactList,
        getContactdetails
    }
}