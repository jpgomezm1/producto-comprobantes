export interface UserBankAccount {
  id: string;
  user_id: string;
  account_nickname: string;
  account_number: string;
  account_holder_name: string;
  created_at: string;
}

export interface UserBankAccountFormData {
  account_nickname: string;
  account_number: string;
  account_holder_name: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  user_id_card: string;
  business_name: string;
  selected_plan: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}