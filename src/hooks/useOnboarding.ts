import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'onboarding_completed';

export const useOnboarding = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    // Vérifie si l'onboarding a déjà été complété
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  });

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setHasCompletedOnboarding(true);
  };

  return {
    hasCompletedOnboarding,
    completeOnboarding,
  };
};
