// src/lib/services/ValidationService.ts
// Service pentru validare centralizat cu Zod

import { z } from 'zod';
import type { Transaction } from '$shared/types/transaction';

// Transaction validation schema
export const TransactionSchema = z.object({
  id: z.string().uuid(),
  date: z.string().datetime(),
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required')
});

// Partial schema for updates
export const TransactionUpdateSchema = TransactionSchema.partial().omit({ id: true });

// Category validation
export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  icon: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  type: z.enum(['income', 'expense', 'both']),
  isDefault: z.boolean().default(false)
});

// User preferences validation
export const UserPreferencesSchema = z.object({
  isDark: z.boolean().default(false),
  currency: z.string().default('RON'),
  language: z.enum(['en', 'ro']).default('ro'),
  dateFormat: z.string().default('DD/MM/YYYY'),
  startOfWeek: z.enum(['monday', 'sunday']).default('monday')
});

// Filter validation
export const FilterSchema = z.object({
  searchQuery: z.string().optional(),
  type: z.enum(['all', 'income', 'expense']).default('all'),
  dateRange: z.object({
    start: z.string().datetime().nullable(),
    end: z.string().datetime().nullable()
  }).optional(),
  categories: z.array(z.string()).optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional()
});

export class ValidationService {
  // Validate with custom error messages
  validateTransaction(data: unknown): { success: boolean; data?: Transaction; errors?: string[] } {
    try {
      const validated = TransactionSchema.parse(data);
      return { success: true, data: validated };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
        return { success: false, errors };
      }
      return { success: false, errors: ['Unknown validation error'] };
    }
  }

  // Safe parse with type guard
  isValidTransaction(data: unknown): data is Transaction {
    return TransactionSchema.safeParse(data).success;
  }

  // Validate partial update
  validateTransactionUpdate(data: unknown) {
    return TransactionUpdateSchema.safeParse(data);
  }

  // Validate user preferences
  validatePreferences(data: unknown) {
    return UserPreferencesSchema.safeParse(data);
  }

  // Validate filters
  validateFilters(data: unknown) {
    return FilterSchema.safeParse(data);
  }

  // Create validated transaction with auto-generated fields
  createTransaction(data: Omit<Transaction, 'id' | 'date'>): Transaction | null {
    const newTransaction = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };

    const result = this.validateTransaction(newTransaction);
    return result.success ? result.data : null;
  }

  // Sanitize user input
  sanitizeAmount(value: string): number | null {
    const cleaned = value.replace(/[^0-9.,]/g, '').replace(',', '.');
    const num = parseFloat(cleaned);
    return isNaN(num) || num <= 0 ? null : num;
  }

  // Format error messages for UI
  formatErrors(errors: z.ZodError): Record<string, string> {
    const formatted: Record<string, string> = {};
    errors.errors.forEach(error => {
      const field = error.path.join('.');
      formatted[field] = error.message;
    });
    return formatted;
  }
}

// Singleton instance
export const validation = new ValidationService();

// Export schemas for use in forms
export const schemas = {
  transaction: TransactionSchema,
  transactionUpdate: TransactionUpdateSchema,
  category: CategorySchema,
  preferences: UserPreferencesSchema,
  filter: FilterSchema
};