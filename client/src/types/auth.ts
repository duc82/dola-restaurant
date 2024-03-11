interface LoginDTO {
  email: string;
  password: string;
}

interface SignUpDTO extends LoginDTO {
  fullName: string;
  phone: string;
}

export type { LoginDTO, SignUpDTO };
