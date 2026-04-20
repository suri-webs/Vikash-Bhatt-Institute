export function getServerUrl() {
    return process.env.NEXT_PUBLIC_API_URL || 'https://vikas-bhatt-classes-server.onrender.com/api';
}