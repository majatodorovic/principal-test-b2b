import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const generateDeviceToken = (): string => {
  return 'device_' + Math.random().toString(12) + Date.now();
};

const getDeviceToken = (): string => {
  let device_token = Cookies.get('device_token');
  if (!device_token) {
    device_token = generateDeviceToken();
    Cookies.set('device_token', device_token, { expires: 365 });
  }
  return device_token;
};

const getCustomerToken = (): string => {
  let customer_token = Cookies.get('customer_token');
  if (!customer_token) {
    customer_token = getDeviceToken();
    Cookies.set('customer_token', customer_token, { expires: 365 });
  }
  return customer_token;
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Payload = any;

const makeRequest = async (
  method: RequestMethod,
  path: string,
  payload: Payload,
  token: string | null = null,
): Promise<any> => {
  const device_token = getDeviceToken();
  const customer_token = getCustomerToken();
  const finalToken = token ?? customer_token;

  try {
    const response: AxiosResponse = await axios({
      method: method,
      url: `${process.env.NEXT_PUBLIC_API_URL}${path.replace(/^\//, '')}`,
      headers: {
        'device-token': device_token,
        'customer-token': finalToken,
        'Cache-Control': 'no-store',
      },
      data: payload,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error?.response?.data;
    }
    return { error: 'An unexpected error occurred' };
  }
};

export const post = async (
  path: string,
  payload: Payload,
  token: string | null = null,
): Promise<any> => {
  return makeRequest('POST', path, payload, token);
};
