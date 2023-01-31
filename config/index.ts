export const env = process.env.REACT_APP_ENV;

function getServerUrl() {
    const envApiUrls: { [key: string]: string } = {
        development: 'http://localhost:3070',
        production: 'http://3.88.8.153:8080/',
    };
    if (env && env in envApiUrls) {
        return envApiUrls[env];
    }
    return envApiUrls.production;
}

export const SERVER_URL = getServerUrl();
