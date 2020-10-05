import { LangType } from '../../types/index';

const { MIN_PASSWORD_LENGTH }: any = process.env;

const lang: LangType = {
  user: {
    received: {
      success: "User received",
      error: "Error user received",
      warning: "User not found"
    },
    create: {
      success: "User created",
      error: "Error user create",
      warning: "This email was registered earlier"
    },
    data: {
      password: {
        error: 'Passwords do not match',
        short: `Password cannot be shorter than ${MIN_PASSWORD_LENGTH} characters`
      },
      id: {
        error: 'The transferred user data does not match the stored'
      }
    },
    login: {
      error: 'Login failed',
      warning: 'Login and password do not match',
      success: 'Successful login'
    }
  },
  redis: {
    received: {
      error: "Error getting cache",
      warning: "No cache found for this event",
      success: "Cash received successfully" 
    },
    save: {
      error: "Error saving to cache",
      warning: "",
      success: "Successfully saving data to cache"
    },
    del: {
      error: "Error deleting from cache",
      warning: "",
      success: "Successful deletion from cache"
    }
  },
  auth: {
    access: {
      error: "Access to this resource is denied",
      warning: "Not enough rights",
      success: "Accessed"
    }
  }
};

export default lang;