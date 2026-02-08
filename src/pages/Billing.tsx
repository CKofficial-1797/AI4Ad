import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import apiClient from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import AddBalanceDialog from '@/components/AddBalanceDialog';

interface Transaction {
  id: string;
  created_at: number;
  user_id: string;
  wallet_id: string;
  amount: number;
  status: string;
  stripe_payment_id: string;
}

const Billing = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchBalance = async () => {
    try {
      const response = await apiClient.get(import.meta.env.VITE_GET_BALANCE_URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      setBalance(response.data.wallet.total_balance);
      const sortedTransactions = response.data.transactions.sort((a: Transaction, b: Transaction) => b.created_at - a.created_at);
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error("Failed to fetch balance", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchBalance();
    }
  }, [user]);

  return (
    <DashboardLayout
      title="Billing"
      subtitle="Manage your balance and view transaction history"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Balance</CardTitle>
            <AddBalanceDialog onSuccess={fetchBalance} />
          </CardHeader>
          <CardContent>
            {loading ? <p>Loading...</p> : <p className="text-4xl font-bold">₹{balance.toLocaleString()}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serial No.</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.status === 'paid' ? 'default' : 'destructive'}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
