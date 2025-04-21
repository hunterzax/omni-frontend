'use client';

import { useEffect, useState } from 'react';

const CHATWOOT_BASE_URL = 'https://cw2.i24.dev';

export default function CWPage() {
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function initChatwoot() {
            try {
                setIsLoading(true);
                setIsLoading(false);
            } catch (err) {
                console.error('Error:', err);
            }
        }

        initChatwoot();
    }, []);

    // Construct URL with custom parameters
    const iframeUrl = new URL(CHATWOOT_BASE_URL);
    iframeUrl.searchParams.set('hideTopNav', 'true');
    // Add any other parameters that Chatwoot supports for customization

    return (
        <div className="w-full h-screen flex flex-col">
            <iframe
                src={iframeUrl.toString()}
                className="w-full flex-1 border-none"
                allow="camera;microphone;fullscreen;display-capture"
            />
        </div>
    );
}
