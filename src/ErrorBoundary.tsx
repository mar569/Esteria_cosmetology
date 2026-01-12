import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}


class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }


    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }


    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary поймал ошибку:', error, errorInfo);

    }

    render(): ReactNode {
        if (this.state.hasError) {

            if (this.props.fallback) {
                return this.props.fallback;
            }


            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] text-white text-center px-4">
                    <h1 className="text-4xl font-bold mb-4">Что-то пошло не так</h1>
                    <p className="text-lg text-gray-400 mb-8">
                        Произошла ошибка. Пожалуйста, обновите страницу или вернитесь позже.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-white text-[#0d0d0d] font-semibold rounded-xl transition hover:bg-gray-100"
                    >
                        Обновить страницу
                    </button>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details className="mt-4 text-left">
                            <summary className="cursor-pointer text-gray-300">Подробности ошибки (только в разработке)</summary>
                            <pre className="text-red-400 text-sm mt-2 whitespace-pre-wrap">
                                {this.state.error.stack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;