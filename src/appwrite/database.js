import { Client, Databases, ID } from "appwrite";
import config from "../config/config";

class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwrite.baseUrl)
      .setProject(config.appwrite.projectId);

    this.databases = new Databases(this.client);
  }

  // methods
  
  async getAllExpenses() {
    try {
      const response = await this.databases.listDocuments(
        config.appwrite.databaseId,
        config.appwrite.collectionId
      );
      if (!response) {
        return null;
      }
      const expenses = response.documents;
      return expenses ? expenses : [];
    } catch (error) {
      console.log(`Could not fetch expenses :: Error = ${error.message}`);
      throw error;
    }
  }

  async getSingleExpense({ expenseId }) {
    try {
      const expense = await this.databases.getDocument(
        config.appwrite.databaseId,
        config.appwrite.collectionId,
        expenseId
      );
      return expense ? expense : null;
    } catch (error) {
      console.log(
        `Could not fetch the desired expense :: Error = ${error.message}`
      );
      throw error;
    }
  }

  async createNewExpense({ name, amount, category, userId }) {
    try {
      const expense = await this.databases.createDocument(
        config.appwrite.databaseId,
        config.appwrite.collectionId,
        ID.unique(),
        {
          name,
          amount,
          category,
          userId,
        }
      );
      return expense ? expense : null;
    } catch (error) {
      console.log(`New Expense Creation failed :: Error = ${error.message}`);
      throw error;
    }
  }

  async deleteExpense({ expenseId }) {
    try {
      // Appwrite response for deleteDocument() is just an empty object {message:""}
      await this.databases.deleteDocument(
        config.appwrite.databaseId,
        config.appwrite.collectionId,
        expenseId
      );
    } catch (error) {
      console.log(`Expense Deletion failed :: Error = ${error.message}`);
      throw error;
    }
  }

  async updateExpense(expenseId, { name, amount, category }) {
    try {
      const updatedExpense = await this.databases.updateDocument(
        config.appwrite.databaseId,
        config.appwrite.collectionId,
        expenseId,
        {
          name,
          amount,
          category,
        }
      );
      return updatedExpense ? updatedExpense : null;
    } catch (error) {
      console.log(`Expense Updation failed :: Error = ${error.message}`);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
