const ipAddress = process.env.REACT_APP_API_IP_ADDRESS;
const port = process.env.REACT_APP_API_PORT;
const protocol = process.env.REACT_APP_API_PROTOCOL;

// ベースURLを作成
export const baseUrl = `${protocol}://${ipAddress}:${port}`;
