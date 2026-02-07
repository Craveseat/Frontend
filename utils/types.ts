export type SignUpDetails = {
  username: string;
  fullName: string;
  phone_number: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type LoginDetails = {
  email_or_username: string;
  password: string;
};
