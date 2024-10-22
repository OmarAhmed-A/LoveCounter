import React, { useState } from 'react';
import feather from 'feather-icons';

interface CopyableLinkProps {
  link: string;
  wrap?: boolean;
}

const CopyableLink: React.FC<CopyableLinkProps> = ({ link, wrap = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyIcon = (
    <span 
      dangerouslySetInnerHTML={{ 
        __html: feather.icons['copy'].toSvg({ 
          width: 16, 
          height: 16,
          'stroke-width': 2,
          class: 'icon'
        }) 
      }} 
    />
  );

  const checkIcon = (
    <span 
      dangerouslySetInnerHTML={{ 
        __html: feather.icons['check'].toSvg({ 
          width: 16, 
          height: 16,
          'stroke-width': 2,
          class: 'icon'
        }) 
      }} 
    />
  );

  return (
    <div className="link-container">
      <div 
        className={wrap ? 'copyable-link-wrap' : 'copyable-link-scroll'}
        onClick={handleCopy}
        title={link}
      >
        {link}
      </div>
      <button 
        className={`copy-button ${copied ? 'success' : ''}`}
        onClick={handleCopy}
      >
        {copied ? (
          <>
            {checkIcon}
            Copied!
          </>
        ) : (
          <>
            {copyIcon}
            Copy
          </>
        )}
      </button>
    </div>
  );
};

export default CopyableLink;