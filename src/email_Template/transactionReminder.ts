export function transactionReminderTemplate(name: string, description: string, date: Date, amount: number): string {
  const valor = amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const data = new Date(date).toLocaleDateString('pt-BR');

  return `
    <h3>⏰ Lembrete de Transação</h3>
    <p>Olá, <strong>${name}</strong>!</p>
    <p>Você tem uma transação programada para o dia <strong>${data}</strong>.</p>
    <p>Descrição: <strong>${description}</strong></p>
    <p>Valor: <strong>${valor}</strong></p>
  `;
}