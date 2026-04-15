
 const DEVELOPMENT_SERVER_URL = 'http://localhost:3001/api';
// const PROD_SERVER_URL = 'https://vikas-bhatt-classes-server.onrender.com/api';

export function getServerUrl() {
//     //const env = process.env.NEXT_PUBLIC_APP_ENV;
//     if (env == 'production') {
//         return `${PROD_SERVER_URL}/api`;
//     }
//     //    else if (env == 'test') {
//     //     return `${BETA_SERVER_URL}/api`;
//     //   }
    return `${DEVELOPMENT_SERVER_URL}`;
}
