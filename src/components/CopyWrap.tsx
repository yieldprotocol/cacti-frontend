import { useEffect, useState } from 'react';
import { CheckCircleIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import copy from 'copy-to-clipboard';

const CopyWrap = ({ children, text, className }: any) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copy_ = (e: any) => {
    // console.log(e);
    e.stopPropagation();
    setCopied(true);
    copy(text);
  };

  useEffect(() => {
    copied && (async () => setTimeout(() => setCopied(false), 5000))();
  }, [copied]);

  return (
    <button className={`flex items-center gap-2 ${className}`} onClick={(e: any) => copy_(e)}>
      {children}
      <div className="h-5 w-5">
        {copied ? <CheckCircleIcon /> : <DocumentDuplicateIcon />}
      </div>
    </button>
  );
};

export default CopyWrap;
