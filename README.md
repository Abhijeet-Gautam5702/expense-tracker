![](https://i.postimg.cc/MTc0tzH0/Screenshot-2024-08-30-232128.png)

# Expense Tracker

This is a full-stack expense tracker web application built using React, Tailwind-CSS and Appwrite (for backend services).

This project stands out because of the following aspects:

1. User authentication (Login/Signup using email & password).

2. Neat and sleek User Interface.

3. CRUD operations (Create, Read, Update, Delete)

4. Convinient form handling.

5. Efficient state management for quicker response.

6. Heavily commented code (explaining each lind) to assist fellow programmers.

7. Production grade best-practices (from latest JS syntax to error-proof error handling).

## Deployed Link

The project is depoloyed on Vercel. Here's the [deployed link](https://expense-tracker-indol-pi.vercel.app/)

## Screenshots

![](https://i.postimg.cc/wj6hZX3j/Screenshot-2024-08-30-232310.png)
![](https://i.postimg.cc/CK5bLwGy/Screenshot-2024-08-30-232202.png)
![](https://i.postimg.cc/GpfG46K4/Screenshot-2024-08-30-232224.png)
![](https://i.postimg.cc/P52mjC8z/Screenshot-2024-08-30-232253.png)

## Installation

To install this project and test it locally, follow the given steps:-

### Setting up Appwrite for the project

You will need an [Appwrite](https://www.appwrite.io/) account.

- Login to your appwrite account and create a new project for "web" and set the `hostname` field to "localhost" or "*" to avoid any CORS errors.

- Create a new database named "expense-db". Then, create a collection named "expenses". (Note that you can name them anything of your choice).

- Go to the settings of "expenses" collection and set the create, read, update and delete permissions to "User".

- Find and copy ProjectId, DatabaseId, CollectionId, Base URL of the entire project and populate the `.env` file (which is created taking reference from `.env.sample`)

### Setting up the project locally

- Ensure that you have Node installed in your machine locally (if not, [install from here](https://nodejs.org/en)) by running the following command  

```bash
node
```

- Clone the repository by running the following command

```bash
git clone https://github.com/Abhijeet-Gautam5702/expense-tracker.git
```

- Install the dependencies

```bash
npm install
```

- Taking the `.env.sample` file as reference, create a new `.env` file in the root directory and populate it with required sensitive information like Appwrite-URL, Project-ID, Database-ID and Collection-ID.

- Run the project

```bash
npm run dev
```

## Tech stack and libraries

- ReactJS
- Tailwind-CSS
- Appwrite
- React Hook Form
- Redux Toolkit
- React Router Dom
- Vercel (for deployment)
