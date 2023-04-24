# Table of Contents
- General Info
- Tech info
- Installation
- Architecture

## General Info
Test task for WebbyLab, movie app

## Tech info
- [React](https://reactjs.org)
- [Next.js](https://nextjs.org)
- [redux-toolkit](https://redux-toolkit.js.org)

- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [testing-library](https://testing-library.com)
- [react-hook-form](https://react-hook-form.com)
- [eslint](https://eslint.org)
- [framer motion](https://www.framer.com/motion/)
- [headlessUI](https://headlessui.dev)
- [fontawesome](https://fontawesome.com)

## <a name="installation"></a>Installation
To have this app running on your local computer, please follow the below steps:

Clone repository:
```
$ git clone https://github.com/AleksandrSekker/webbylabtest.git
```
or
```
$ git clone git@github.com:AleksandrSekker/webbylabtest.git
```

Install project dependencies:
```
$ npm install
```
add .env.local file with the following variables:
```
NEXT_PUBLIC_HOSTNAME=localhost
```
```
NEXT_PUBLIC_PORT=8000
```
```
NEXT_PUBLIC_API_URL=http://${NEXT_PUBLIC_HOSTNAME}:${NEXT_PUBLIC_PORT}/api/v1/
```

### Run Docker
Run Docker Pull Command:
```
$ docker pull webbylabhub/movies
```
Run Docker:
```
$ docker run --name movies -p 8000:8000 webbylabhub/movies
```
or in one line:
```
$ docker pull webbylabhub/movies && docker run --name movies -p 8000:8000 -d webbylabhub/movies
```
Run the project:
```
$ npm run dev 
```
### Don't forget login or register, it's required for all manipulations with movies as token is required

## Architecture
### React
As create react-react-app was deleted from official documentation as recommended way to create new applications, i had 3 options: Next.js, Gatsby or Remix. As i already have experience with Next.js, i decided to use it.
### Redux
Redux was used for state management. I used redux-toolkit for creating store, reducers and actions. I used it because it's recommended way and because it's easy to use and it's not required to write a lot of code
### TypeScript
I decided to use TypeScript because it's offers benefits such as type safety, improved scalability, enhanced productivity, better code organization, and improved collaboration.
### Tailwind CSS
I decided to use Tailwind CSS offers benefits such as rapid development, consistent design, customization, responsive design, and accessibility.
### Testing Library
Use unit test for testing React applications provides benefits such as encouraging more maintainable and robust tests, a simple API, emphasis on behavior testing, async testing, accessibility testing, and integration with popular frameworks.
### React Hook Form
As i have few forms in my app, i decided to use React Hook Form because this form library provides benefits such as simplified form management, reduced boilerplate code, improved performance and scalability, and support for both controlled and uncontrolled components.
### Eslint
I added Eslint because it's important to have a linter in your project. I added only few rules but it's provide benefits such as enforcing code consistency, identifying and preventing bugs and errors, improving code readability, and enhancing collaboration among developers.
### Framer Motion
As i have few animations in my app, i decided to use Framer Motion because it's a production-ready animation library for React.
### Headless UI
As I have few components in my app, i decided to use Headless UI because it's a collection of completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.
### Fontawesome
As i have few icons in my app, i decided to use Fontawesome because it's a library of free and premium SVG icons for you to use on your website.

