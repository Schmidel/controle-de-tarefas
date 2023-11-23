import { useState, useEffect } from 'react';

interface TransactionProps {
  id: string;
  name: string;
  amount: number;
  onEdit: (transaction: TransactionData) => void;
  onDelete: (id: string) => void;
}

interface TransactionData {
  id: string;
  name: string;
  amount: number;
}

function Transaction({ id, name, amount, onEdit, onDelete }: TransactionProps) {
  const [form, setForm] = useState<TransactionData>({ id: '', name: '', amount: 0 });

  function handleEdit() {
    onEdit({ id, name, amount });
    setForm({ id, name, amount });
  }

  function handleDelete() {
    onDelete(id);
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { id, name, amount } = form;

    if (id) {
      // Edit the transaction with this ID
      onEdit({ id, name, amount });
    } else {
      // Create a new transaction
      onEdit({ id: `${Math.random()}`, name, amount });
    }

    setForm({ id: '', name: '', amount: 0 });
  }

  return (
    <div className="transaction" id={`transaction-${id}`}>
      <span className="transaction-title">{name}</span>
      <span className={`transaction-amount ${amount > 0 ? 'credit' : 'debit'}`}>
        {new Intl.NumberFormat('pt-BR', {
          compactDisplay: 'long',
          currency: 'BRL',
          style: 'currency',
        }).format(amount)}
        {amount > 0 ? ' C' : ' D'}
      </span>
      <button className="edit-btn" onClick={handleEdit}>
        Editar
      </button>
      <button className="delete-btn" onClick={handleDelete}>
        Excluir
      </button>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={id} onChange={handleFormChange} />
        <input type="text" name="name" value={form.name} onChange={handleFormChange} />
        <input type="number" name="amount" value={form.amount} onChange={handleFormChange} />
        <button type="submit">{id ? 'Salvar' : 'Criar'}</button>
      </form>
    </div>
  );
}

export default Transaction