import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Función para combinar clases de CSS de manera condicional
 * Utiliza clsx para manejar condicionales y tailwind-merge para evitar conflictos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Función alternativa simple si no tienes clsx y tailwind-merge
 */
export function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}