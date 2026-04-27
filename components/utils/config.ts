export function getServerUrl() {
    // https://vikas-bhatt-classes-server.onrender.com/api
    // http://localhost:8080/api
    return process.env.NEXT_PUBLIC_API_URL || 'https://vikas-bhatt-classes-server.onrender.com/api';
}