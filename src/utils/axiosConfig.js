const isProduction = process.env.NODE_ENV === 'production';

export const apiDomain = isProduction ? 'https://bosscar.com/api' : 'http://localhost:3001';

export const axiosUrl = `${apiDomain}`;