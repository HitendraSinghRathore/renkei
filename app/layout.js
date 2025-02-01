
import { Source_Serif_4 } from 'next/font/google';
import './globals.css';
import './styles.css';
import PropTypes from 'prop-types';
import { Slide, ToastContainer } from 'react-toastify';

import ScrollToTopButton from './components/ScrollToTopBtn';
import 'react-toastify/dist/ReactToastify.css';

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif-pro',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Renkei',
  description: 'A collaborative whiteboard app to create and share your ideas.',
  keywords: 'whiteboard, collaboration, ideas, project management',
  author: 'hitendrarathore0@gmail.com',
  creator: 'Hitendra Rathore',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sourceSerif4.variable} font-serif antialiased`}>
        <ScrollToTopButton />
        {children}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
          bodyClassName="toastBody"
        />
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
