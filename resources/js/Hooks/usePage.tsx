import { UsePageProps } from '../types/types';
import { usePage as Page } from '@inertiajs/inertia-react';

export function usePage(): UsePageProps {
  return Page();
}
