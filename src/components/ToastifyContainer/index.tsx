'use client';
import { ToastContainer, Bounce } from 'react-toastify';
export function ToastifyContainer() {
  return (
    <ToastContainer
      position='top-center'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      theme='light'
      transition={Bounce}
    />
  );
}
