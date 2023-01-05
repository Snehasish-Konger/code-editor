# Documentation for Online Compiler

## Introduction

This is an online code editor that allows users to write and execute code in a variety of programming languages. It features a Monaco Editor, which is the same code editor that powers Visual Studio Code. The Monaco Editor provides syntax highlighting and autocomplete for over 40 programming languages, making it a powerful tool for developers.

The code editor also has customizable themes, allowing users to personalize their coding experience. Additionally, the compiled code's execution information (such as time taken and memory used) is displayed to the user, providing insight into the performance of their code.

## Tech Stack

The project uses the following technologies:

- React.js: React.js is a JavaScript library for building user interfaces. It is used for the front-end of the project.
- TailwindCSS: TailwindCSS is a utility-first CSS framework that provides a set of low-level styles and utility classes. It is used for styling the project.
- Judge0: Judge0 is an API that allows users to compile and execute code in a variety of programming languages. It is used to compile and execute code in the project.
- RapidAPI: RapidAPI is a platform that allows developers to find, test, and connect to APIs. It is used to quickly deploy the Judge0 API in the project.
- Monaco Editor: The Monaco Editor is a code editor that powers Visual Studio Code. It is used as the code editor in the project.

## Project Structure

The project has the following structure:

- `components`: This directory contains all the components and reusable code snippets for the project. Components are self-contained pieces of code that represent a part of the user interface. Examples of components in the project include the `CodeEditorWindow` and `Landing` components.
- `hooks`: This directory contains all the custom hooks used in the project. Hooks are functions that allow React components to interact with other parts of the application, such as the state or the database. An example of a hook in the project is the keypress hook, which is used to compile code using keyboard events.
- `lib`: This directory contains library functions that are used throughout the project. These functions may perform a variety of tasks, such as defining the theme of the editor.
- `constants`: This directory contains constants that are used in the project. Constants are values that do not change and are used to represent fixed data, such as the `languageOptions` and `customStyles` for dropdowns.
- `utils`: This directory contains general utility functions that are used to help maintain the code. These functions may perform tasks such as formatting data or validating inputs.

Here is the project structure-

```text
Project-Online-Compiler
│   README.md
│   package.json
│   ...
│
|───public
│   │   index.html
│   │   ...
│
└───src
│   │   index.js
│   │   ...
│
└───components
│   │   CodeEditorWindow.js
│   │   Landing.js
│   │   ...
│
└───hooks
│   │   useKeypress.js
│   │   ...
│
└───lib
│   │   defineTheme.js
│   │   ...
│
└───constants
│   │   languageOptions.js
│   │   customStyles.js
│   │   ...
│
└───utils
    │   formatData.js
    │   validateInputs.js
    │   ...
```

## Features

The code editor has the following features:

1. Code Editing: The code editor is powered by the Monaco Editor, which provides syntax highlighting and autocomplete for over 40 programming languages. This makes it a powerful tool for developers to write and edit code.

2. Compiling and Executing Code: The code editor can compile and execute code on a web app with standard input and output. It supports a wide range of programming languages, allowing users to write and execute code in their language of choice.

3. Customizable Themes: The user can choose from a list of available themes to personalize the appearance of the code editor.

4. Execution Information: The user can view information about the execution of their compiled code, such as the time taken and the memory used. This provides insight into the performance of the code.

## Conclusion

This online code editor is a powerful tool for writing and executing code in a variety of programming languages. Its Monaco Editor provides syntax highlighting and autocomplete, making it a user-friendly and efficient tool for developers. The customizable themes and execution information provide additional functionality and insight for the user.

Overall, the tech stack and project structure work together to provide a seamless experience for the user, and the combination of React.js, TailwindCSS, Judge0, RapidAPI, and the Monaco Editor make it a well-rounded and effective code editor.
