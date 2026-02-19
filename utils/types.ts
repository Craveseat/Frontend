export type SignUpDetails = {
  username: string;
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type LoginDetails = {
  email_or_username: string;
  password: string;
};

export type LoginUserDetails = {
  id: string;
  username: string;
  email: string;
  full_name: string;
  user_type: string;
  is_active: boolean;
  active_role: string;
  bio: string;
  phone_number: string;
  delivery_address: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};
