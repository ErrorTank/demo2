
const AsyncCache = {
    createAsyncCache(fn) {
        let existed = {};
        let loadings = {};

        return {
            retrieve(key) {
                if (existed.hasOwnProperty(key)) {
                    return Promise.resolve(existed[key]);
                }
                if (loadings.hasOwnProperty(key)) {
                    return loadings[key];
                }
                return new Promise((res) => {
                    loadings[key] = fn(key).then(val => {
                        delete loadings[key];

                        existed[key] = val;
                        res(val);
                    });
                });
            },
            getInCache(key) {
                return existed[key];
            },
            changeExisted: (key, data) => {
                existed[key] = data;
            }
        };
    }
};

export {
    AsyncCache
}
