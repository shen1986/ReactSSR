import axios from 'axios';

const baseUrl = 'http://localhost:3333/api/v1'; // 开发环境

export const get = (url: string, params: any) => {
    new Promise((resolve, reject) => {
        axios.get(`${baseUrl}${url}`, {
            params: {
                ...params,
            },
        })
          .then((res) => {
              console.log(params);
              if (res.data && res.data.success) {
                  resolve(res.data);
              } else {
                  reject(res.data);
              }
          })
          .catch((error) => {
              if (error.response) {
                  reject(error.response.data);
              } else {
                  reject({
                      success: false,
                      err_msg: error.message,
                  });
              }
          });
    });
};

export const post = (url: string, params: any, data: any) => (
    new Promise((resolve, reject) => {
        axios.post(`${baseUrl}${url}`, {
            params,
            data,
        })
            .then((res) => {
                if (res.data && res.data.success) {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            })
            .catch((error) => {
                if (error.response) {
                    reject(error.response.data);
                } else {
                    reject({
                        success: false,
                        err_msg: error.message,
                    });
                }
            });
    })
);
