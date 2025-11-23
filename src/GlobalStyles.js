import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
:root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --primary-light: #dbeafe;
    --dark: #1f2937;
    --medium: #6b7280;
    --light: #f3f4f6;
    --white: #ffffff;
}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--white);
    color: var(--medium);
    line-height: 1.5;
}

h1, h2, h3, h4 {
    color: var(--dark);
    font-weight: bold;
}

a {
    text-decoration: none;
    color: inherit;
}
`;