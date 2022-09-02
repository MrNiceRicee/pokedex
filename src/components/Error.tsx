import ctl from '@netlify/classnames-template-literals';
import Link from 'next/link';

const statusCodeHashMessages: {
  [key: number]: string;
} = {
  404: 'This page could not be found',
  500: 'An unexpected error has occurred',
};

const Error = ({
  error,
  statusCode,
}: {
  error?: string;
  statusCode?: number;
}) => {
  const displayErrorOrStatusCodeError = () => {
    if (typeof error === 'string') {
      return error;
    }
    return (
      statusCodeHashMessages[statusCode || -1] ??
      'An unexpected error has occurred'
    );
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center relative w-1/2 h-20 overflow-hidden">
        <div
          // animation with bounce effect and a 300ms delay
          className={ctl(`
          absolute
          inset-0
          w-full h-full
          flex items-center justify-center
          animate-slideInBottom delay-300
          `)}
        >
          <h1 className="text-6xl font-bold text-gray-700">{statusCode}</h1>
        </div>
      </div>
      <div
        className="w-1/2 h-0.5 bg-gray-300 my-4
      animate-growWidth
      "
      />
      <div className="flex flex-col items-center justify-center relative w-1/2 h-14 overflow-hidden">
        <div
          className={ctl(`
          absolute
          inset-0
          w-full h-full
          flex items-center justify-center
          delay-300
          animate-slideInTop
          `)}
        >
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            {displayErrorOrStatusCodeError()}
          </h2>
        </div>
      </div>
      <Link href="/">
        <a
          className={ctl(`
          px-4 py-2
          text-sm font-medium text-gray-100
          bg-gray-500 rounded-md
          `)}
        >
          Go back home
        </a>
      </Link>
    </div>
  );
};

export default Error;
