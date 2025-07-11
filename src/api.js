import axios from 'axios';

const API_BASE_URL = "https://banking-system-feny.onrender.com/Account";  // Backend URL

export const createAccount = (accountData) => {
    return axios.post(`${API_BASE_URL}/create`, accountData);
};

export const deposit = (accountNumber, amount) => {
    return axios.post(`${API_BASE_URL}/deposit/${accountNumber}?amount=${amount}`);
};

export const withdraw = (accountNumber, amount, pin) => {
    return axios.post(`${API_BASE_URL}/withdraw/${accountNumber}?amount=${amount}&pin=${pin}`);
};

export const transfer = (sender, receiver, amount, pin) => {
    return axios.post(`${API_BASE_URL}/transfer?senderAccountnumber=${sender}&receiverAccountnumber=${receiver}&amount=${amount}&pin=${pin}`);
};

export const checkBalance = (accountNumber, pin) => {
    return axios.get(`${API_BASE_URL}/balance/${accountNumber}?pin=${pin}`);
};

export const deleteAccount = (accountNumber, pin) => {
    return axios.delete(`${API_BASE_URL}/delete/${accountNumber}?pin=${pin}`);
};
