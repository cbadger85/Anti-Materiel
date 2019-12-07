import React, { useEffect, useRef } from 'react';
import { Download as DownloadIcon } from 'react-feather';
import './Download.scss';
import { color } from '../../styles/colors';

export const Download: React.FC<DownloadProps> = ({ data, filename }) => {
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
          <DownloadIcon color={color.supporting.indigo[0]} size="1rem" />
          <span>Save</span>
        </a>
      </div>
    </div>
  );
};

interface DownloadProps {
  data: object;
  filename: string;
}
