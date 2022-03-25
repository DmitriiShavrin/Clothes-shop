module.exports = {

    async request(url, cb, method = 'get', data) {
        const baseUrl = 'http://localhost:5000';

        const fd = new FormData();
        let obj = {}

        if (method != 'get') {
            for (let key in data) {
                fd.append(key, data[key]);
            }

            obj.body = fd;
        }


        const response = await fetch(baseUrl + url, {
            method,
            ...obj
        });

        cb(await response.json());

    },
    searchText: '',
    spin: true
}