import clsx from 'clsx';
import ErrorMessage from '../components/ErrorMessage/index';

export default function NotFoundPage() {
  return (
    <>
      <ErrorMessage
        pageTitle='Pagina não encontrada'
        contentTitle=' 404'
        content=' Erro 404 - A página que você está tentando acessar não existe neste site.'
      />
    </>
  );
}
