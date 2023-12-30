import Total from '../Total/Total.tsx';
import TransactionForm from '../Modals/TransactionForm/TransactionForm.tsx';
import {  useAppSelector } from '../../app/hooks.ts';
import { isTransactionFormVisible } from '../Modals/TransactionForm/transactionFormSlice.ts';

const Transactions = () => {
  const isVisible = useAppSelector(isTransactionFormVisible);

  return (
    <div>
      <Total />
      transactions here
      {isVisible ? <TransactionForm /> : <></>}
    </div>
  );
};

export default Transactions;
