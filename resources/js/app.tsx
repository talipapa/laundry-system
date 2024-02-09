import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './Components/theme-provider';
import { ParallaxProvider } from 'react-scroll-parallax';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const rootElement: any = document.getElementById('app');

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        
        
        
        root.render(
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <ParallaxProvider>
                    <App {...props} />
                </ParallaxProvider>

            </ThemeProvider>
        );
        delete el.dataset.page;
    },
    progress: {
        color: '#4B5563',
    },
});
