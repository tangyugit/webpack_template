class Request {
    constructor({ url = '', data = {} } = {}) {
        this.url = url;
        this.data = data;
    }
    http(type = 'get') {
        return new Promise((resolve, reject)=> {
            $.ajax({
                url: this.url,
                type: type,
                dataType: 'Json',
                data: this.data,
                success: res=> resolve(res),
                error: err=> reject(err)
            });
        });
    }
}