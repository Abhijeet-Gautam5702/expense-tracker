import { Client, Account, ID } from "appwrite";
import config from "../config/config";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwrite.baseUrl)
      .setProject(config.appwrite.projectId);

    this.account = new Account(this.client);
  }

  // methods

  async userSignup({ email, password, name }) {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      // If user-account is successfully created => log the user in
      if (response) {
        const session = await this.userLogin({ email, password });
        return session ? session : null;
      }
    } catch (error) {
      console.log(`User Signup failed :: Error = ${error.message}`);
      throw error;
    }
  }

  async userLogin({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session ? session : null;
    } catch (error) {
      console.log(`User Login failed :: Error = ${error.message}`);
      throw error;
    }
  }

  async getLoggedInUser() {
    try {
      const user = await this.account.get();
      return user ? user : null;
    } catch (error) {
      console.log(`Could not fetch logged-in user :: Error = ${error.message}`);
      throw error;
    }
  }

  async userLogout() {
    try {
      const response = await this.account.deleteSessions();
      return response ? response : null;
    } catch (error) {
      console.log(`User Logout failed :: Error = ${error.message}`);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
