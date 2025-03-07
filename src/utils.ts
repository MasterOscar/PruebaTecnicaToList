export const isValidToken = (token: string | null): boolean => {
    return token !== null && token.trim() !== "";
  };
  
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  