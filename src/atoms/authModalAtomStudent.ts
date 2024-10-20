import { atom } from 'recoil';

// Define the types for the modal state
type AuthModalState = {
  isOpen: boolean;
  companyLogin: boolean;
  studentLogin: boolean;
  type: 'loginCompany' | 'loginStudent' | 'registerCompany' | 'registerStudent' | 'forgotPassword';
};

// Initialize the modal state
const initialAuthModalState: AuthModalState = {
  isOpen: false,
  companyLogin: false,
  studentLogin: false, // This should be false initially unless specified otherwise
  type: 'loginStudent', // Set a valid default type
};

// Create the Recoil atom for the auth modal state
export const authModalState = atom<AuthModalState>({
  key: 'authModalState', // Unique key for the atom
  default: initialAuthModalState, // Initial state
});
