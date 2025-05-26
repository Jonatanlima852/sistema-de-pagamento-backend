export function monthlySummaryTemplate(name: string, income: number, expense: number, balance: number): string {
  const format = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return `
    <h2>Resumo Financeiro do Mês</h2>
    <p>Olá, <strong>${name}</strong>!</p>
    <p><strong>Receitas:</strong> ${format(income)}</p>
    <p><strong>Despesas:</strong> ${format(expense)}</p>
    <p><strong>Saldo:</strong> ${format(balance)}</p>
    <p style="margin-top: 16px;">Acompanhe de perto seus gastos para manter sua saúde financeira!</p>
  `;
}