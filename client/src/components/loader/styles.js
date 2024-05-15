import styled from 'styled-components';

export const LoaderContainer = styled.div`
    height: 100%; 
    width: 100%; 
`

export const Loader = styled.div`
   position: fixed;
   top: 50%; 
   left: 50%; 
   width: 17.6px;
   height: 17.6px;
   border-radius: 17.6px;
   box-shadow: 44px 0px 0 0 rgba(132,134,237,0.2), 35.6px 26px 0 0 rgba(132,134,237,0.4), 13.64px 41.8px 0 0 rgba(132,134,237,0.6), -13.64px 41.8px 0 0 rgba(132,134,237,0.8), -35.6px 26px 0 0 #8486ed;
   animation: spinner-b87k6z 0.6s infinite linear;

   @keyframes spinner-b87k6z {
    to {
       transform: rotate(360deg);
    }
`
