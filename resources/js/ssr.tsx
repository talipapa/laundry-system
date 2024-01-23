import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import { ThemeProvider } from './Components/theme-provider'
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
import route from "ziggy-js";
import { Ziggy } from './ziggy'



createServer(page =>
  createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    page,
    render: ReactDOMServer.renderToString,
    resolve: name => {
      const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
      return pages[`./Pages/${name}.tsx`]
    },
    setup: ({ App, props }) =>{
      // Set global function route
      (global as any).route = (name: string, params: any, absolute: any, config = Ziggy) => route(name, params, absolute, config);
      
    return( 
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App {...props} />
    </ThemeProvider>)},
    }),
)