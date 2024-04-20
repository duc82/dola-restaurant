interface CustomErrorProps {
  message: string;
  status: number;
}

class CustomError extends Error {
  public status: number;

  constructor({ message, status }: CustomErrorProps) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }
}

export default CustomError;
