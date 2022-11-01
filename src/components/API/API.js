import axios from 'axios';

export const school = (query) => 
    axios({
        method: 'post',
        url: 'https://as01.prod.ruangortu.id:8080/api/cobrand/rekapDataSekolahFilter',
        data: query,
        headers: {
            'Content-Type': 'application/json',
        }
});

export const addAnswers = (query) => 
    axios({
        method: 'post',
        url: 'https://as01.prod.ruangortu.id:8080/api/cms/quisenerGadgetAddictionAdd',
        data: query,
        headers: {
            'Content-Type': 'application/json',
        }
});

export const getAnswers = (query) => 
    axios({
        method: 'post',
        url: 'https://as01.prod.ruangortu.id:8080/api/cms/quisenerGadgetAddictionFilter',
        data: query,
        headers: {
            'Content-Type': 'application/json',
        }
});