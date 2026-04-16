const DEVELOPMENT_SERVER_URL = 'http://localhost:8080/api';
const PROD_SERVER_URL = 'https://vikas-bhatt-classes-server.onrender.com/api';
const BETA_SERVER_URL = 'https://vikas-bhatt-classes-server-beta.onrender.com/api';

export function getServerUrl() {
    const env = process.env.NEXT_PUBLIC_APP_ENV;

    console.log("ENV:", env);

    if (env === 'production') return PROD_SERVER_URL;
    if (env === 'test') return BETA_SERVER_URL;

    return PROD_SERVER_URL;
}