// src/lib/services/ExportService.ts
import type { Transaction } from '$shared/types/transaction';
import type { Stats } from '$shared/types/stats';

interface ExportOptions {
  format: 'json' | 'txt';
  includeStats?: boolean;
}

class ExportService {
  exportJSON(transactions: Transaction[], stats?: Stats): string {
    const data = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      transactions,
      stats: stats || undefined,
      summary: {
        totalTransactions: transactions.length,
        totalIncome: transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0),
        totalExpenses: transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0)
      }
    };

    return JSON.stringify(data, null, 2);
  }

  exportTXT(transactions: Transaction[], stats?: Stats): string {
    let txt = '='.repeat(50) + '\n';
    txt += 'SWIFT FINANCE - TRANSACTION EXPORT\n';
    txt += `Export Date: ${new Date().toLocaleString()}\n`;
    txt += '='.repeat(50) + '\n\n';

    if (stats) {
      txt += 'SUMMARY:\n';
      txt += `Total Balance: $${stats.balance.toFixed(2)}\n`;
      txt += `Total Income: $${stats.income.toFixed(2)}\n`;
      txt += `Total Expenses: $${stats.expenses.toFixed(2)}\n`;
      txt += `Transaction Count: ${stats.transactionCount}\n\n`;
    }

    txt += 'TRANSACTIONS:\n';
    txt += '-'.repeat(50) + '\n';

    transactions.forEach((t, index) => {
      txt += `${index + 1}. ${t.date.split('T')[0]} - ${t.description}\n`;
      txt += `   Type: ${t.type.toUpperCase()} | Category: ${t.category}\n`;
      txt += `   Amount: $${t.amount.toFixed(2)}\n`;
      txt += '-'.repeat(50) + '\n';
    });

    return txt;
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

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

  importJSON(jsonString: string): { transactions: Transaction[]; stats?: Stats } | null {
    try {
      const data = JSON.parse(jsonString);

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

export const exportService = new ExportService();