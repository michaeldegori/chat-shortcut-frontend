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

export const REACT_APP_AUTH0_DOMAIN = 'kiddiekredit.auth0.com';
export const REACT_APP_AUTH0_CLIENT_ID = 'LVfVnJg9zngBlm5fIPkAPsZO5wyveh1z';
export const REACT_APP_AUTH0_AUDIENCE = 'https://api.kiddiekredit.com';
export const SERVER_URL = getServerUrl();
