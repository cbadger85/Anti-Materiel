import React, { useRef } from 'react';
import { Button } from '../Button/Button';
import './Download.scss';

export const Download: React.FC<DownloadProps> = ({
  data,
  filename,
  children,
}) => {
  const anchor = useRef<HTMLAnchorElement>(null);
  const jsonData =
    'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

  const handleOnClick = (): void => {
    if (!anchor.current) {
      return;
    }

    anchor.current.click();
  };

  return (
    <>
      <a
        href={`data:${jsonData}`}
        download={`${filename}.json`}
        className="button--download"
        ref={anchor}
      >
        <span />
      </a>
      <Button color="secondary" onClick={handleOnClick}>
        {children}
      </Button>
    </>
  );
};

interface DownloadProps {
  data: object;
  filename: string;
}
