import { type ReactElement } from 'react';
import { BrandUploads } from './pages/UploadFileUsage';
import { ThemeToggle } from './Components';
import './App.css';

export const App = (): ReactElement => {
    return (

        <div className='app'>
            <header className="app-header">
                <h1>Switch themes</h1>
                <ThemeToggle />
            </header>
            <main className="relative isolate h-dvh">
                <div className="mx-auto max-w-7xl text-center lg:px-8">
                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Welcome to Frontify</h1>
                    <p className="mt-4 text-base sm:mt-6">
                        Organize, Collaborate, and Elevate Your Brand Story!
                    </p>
                </div>
                <BrandUploads />
            </main>
        </div>
    );
};
