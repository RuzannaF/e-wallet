import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 200;
    src: local('Manrope ExtraLight'), url('/fonts/Manrope-ExtraLight.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 300;
    src: local('Manrope Light'), url('/fonts/Manrope-Light.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 400;
    src: local('Manrope'), url('/fonts/Manrope-Regular.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 500;
    src: local('Manrope Medium'), url('/fonts/Manrope-Medium.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 600;
    src: local('Manrope SemiBold'), url('/fonts/Manrope-SemiBold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 700;
    src: local('Manrope Bold'), url('/fonts/Manrope-Bold.ttf') format('truetype');
  }

`;

export default GlobalStyle;