import { Button, Result } from "antd";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { publickRoutes } from "../routes/routes";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title="500"
          subTitle="Извините, что-то пошло не так"
          extra={
            <Button 
              onClick={() => window.location.href = publickRoutes.home} 
              type="primary"
            >
              Вернуться на главную страницу
            </Button>
          }
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;