import React, { useEffect, useRef } from 'react';
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

  return (
    <div className="download">
      <h2 className="managed-content__title">Download Army Data</h2>
      <div>
        <a
          href={url}
          download={`${filename}.json`}
          className="button button--secondary button--download"
          ref={anchor}
        >
          {children}
        </a>
      </div>
    </div>
  );
};

interface DownloadProps {
  data: object;
  filename: string;
}
