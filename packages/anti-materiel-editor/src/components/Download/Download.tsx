import React, { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import './Download.scss';

export const Download: React.FC<DownloadProps> = ({
  data,
  filename,
  children,
}) => {
  const anchor = useRef<HTMLAnchorElement>(null);

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  });

  const handleOnClick = (): void => {
    if (!anchor.current) {
      return;
    }

    anchor.current.click();
  };

  return (
    <>
      <a
        href={url}
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
