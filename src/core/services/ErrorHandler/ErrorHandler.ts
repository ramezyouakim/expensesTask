import {Alert} from 'react-native';
import {errors} from '../../constants/errors';

// we can create a sentry service
// and use it here to log the error

class ErrorHandler {
  private static instance: any;

  constructor() {
    if (ErrorHandler.instance) {
      return ErrorHandler.instance;
    }

    ErrorHandler.instance = this;
  }

  showErrorMessage = (errorTitle?: string, errorMessage?: string) => {
    const title = errorTitle || errors.default.title;
    const Message = errorMessage || errors.default.message;

    Alert.alert(title, Message);
  };
}

export default new ErrorHandler();
