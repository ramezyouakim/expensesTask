import {FetchMethods, HOSTNAME} from '../../constants/backendEndpoints';
import {errors} from '../../constants/errors';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

const fetchWithTimeout = (url: string, options?: {}, timeout = 5000) => {
  const controller = new AbortController();
  const {signal} = controller;

  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new Error('Request Timeout'));
    }, timeout);
  });

  const fetchPromise = fetch(url, {...options, signal});

  return Promise.race([fetchPromise, timeoutPromise]);
};

export const makeRequest = async (
  url: string,
  method: FetchMethods,
  body?: {},
) => {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    const response = await fetchWithTimeout(url, {
      method: method,
      headers: headers,
      body: body && JSON.stringify(body),
    });
    return await handleRequestResponse(response);
  } catch (error) {
    console.log('makeRequest ', error);
    ErrorHandler.showErrorMessage();
  }
};

const handleRequestResponse = async (response: any) => {
  try {
    if (response) {
      console.log(response.status);
      switch (response.status) {
        case 200:
        case 201:
          /* Handling Success */
          return await response.json();
        case 204:
          ErrorHandler.showErrorMessage();
          return null;
        case 400: {
          const errorMessageParse = await response.json();
          ErrorHandler.showErrorMessage(
            errors.default.title,
            errorMessageParse,
          );
          return null;
        }

        case 401:
        case 403:
          /* Handling forbidden request */
          //get refresh token there is no auth in this task
          ErrorHandler.showErrorMessage();
          return null;
        case 404: {
          /* Handling not found request */
          const errorMessageParse = await response.json();
          ErrorHandler.showErrorMessage(
            errors.default.title,
            errorMessageParse,
          );
          return null;
        }
        case 500:
          /* Handling internal server error */
          ErrorHandler.showErrorMessage();
          return null;
        default:
          ErrorHandler.showErrorMessage();
          return null;
      }
    } else {
      ErrorHandler.showErrorMessage();
      return null;
    }
  } catch (error) {
    console.log('handleRequestResponse ', error);
    ErrorHandler.showErrorMessage();
  }
};

export const getUrlPath = (path: string) => {
  return HOSTNAME + path;
};
