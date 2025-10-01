// src/lib/services/ExportService.ts
// Service pentru export date - JSON și TXT only

import type { Transaction } from '$shared/types/transaction';
import type { Stats } from '$shared/types/stats';

export interface ExportOptions {
  format: 'json' | 'txt';
  includeStats?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export class ExportService {

  // Export transactions as JSON
  exportJSON(transactions: Transaction[], stats?: Stats): string {
    const data = {
      exportDate: new Date().toISOString(),
      version: '1.0.0',
      transactions,
      stats: stats || null,
      metadata: {
        count: transactions.length,
        currency: 'RON'
      }
    };

    return JSON.stringify(data, null, 2);
  }

  // Export as plain text report
  exportTXT(transactions: Transaction[], stats?: Stats): string {
    const lines: string[] = [];
    const date = new Date().toLocaleDateString('ro-RO');

    lines.push('='.repeat(50));
    lines.push('SWIFT FINANCE - RAPORT TRANZACȚII');
    lines.push('='.repeat(50));
    lines.push(`Data export: ${date}`);
    lines.push('');

    if (stats) {
      lines.push('SUMAR:');
      lines.push(`- Venituri totale: ${stats.totalIncome.toFixed(2)} RON`);
      lines.push(`- Cheltuieli totale: ${stats.totalExpenses.toFixed(2)} RON`);
      lines.push(`- Balanță: ${stats.totalBalance.toFixed(2)} RON`);
      lines.push(`- Rata economii: ${stats.savingsRate.toFixed(1)}%`);
      lines.push('');
      lines.push('-'.repeat(50));
      lines.push('');
    }

    lines.push('TRANZACȚII:');
    lines.push('');

    // Group by type
    const income = transactions.filter(t => t.type === 'income');
    const expenses = transactions.filter(t => t.type === 'expense');

    if (income.length > 0) {
      lines.push('VENITURI:');
      income.forEach(t => {
        const date = new Date(t.date).toLocaleDateString('ro-RO');
        lines.push(`  ${date} - ${t.category}: ${t.amount.toFixed(2)} RON`);
        lines.push(`    ${t.description}`);
      });
      lines.push('');
    }

    if (expenses.length > 0) {
      lines.push('CHELTUIELI:');
      expenses.forEach(t => {
        const date = new Date(t.date).toLocaleDateString('ro-RO');
        lines.push(`  ${date} - ${t.category}: ${t.amount.toFixed(2)} RON`);
        lines.push(`    ${t.description}`);
      });
    }

    lines.push('');
    lines.push('='.repeat(50));

    return lines.join('\n');
  }

  // Download file utility
  downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Main export method
  export(
    transactions: Transaction[],
    options: ExportOptions,
    stats?: Stats
  ): void {
    const timestamp = new Date().toISOString().slice(0, 10);

    if (options.format === 'json') {
      const content = this.exportJSON(transactions, options.includeStats ? stats : undefined);
      this.downloadFile(content, `swift-finance-${timestamp}.json`, 'application/json');
    } else if (options.format === 'txt') {
      const content = this.exportTXT(transactions, options.includeStats ? stats : undefined);
      this.downloadFile(content, `swift-finance-${timestamp}.txt`, 'text/plain');
    }
  }

  // Import JSON data
  importJSON(jsonString: string): { transactions: Transaction[]; stats?: Stats } | null {
    try {
      const data = JSON.parse(jsonString);

      // Validate structure
      if (!data.transactions || !Array.isArray(data.transactions)) {
        throw new Error('Invalid JSON structure');
      }

      return {
        transactions: data.transactions,
        stats: data.stats || undefined
      };
    } catch (error) {
      console.error('Import error:', error);
      return null;
    }
  }
}

// Singleton instance
export const exportService = new ExportService();