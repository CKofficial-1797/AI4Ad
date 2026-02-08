import React, { useState } from 'react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import apiClient from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface AddBalanceDialogProps {
    onSuccess: () => void;
}

const AddBalanceDialog: React.FC<AddBalanceDialogProps> = ({ onSuccess }) => {
    const [amount, setAmount] = useState('');
    const { user } = useAuth();

    const handleAddBalance = async () => {
        try {
            const response = await apiClient.post(import.meta.env.VITE_ADD_BALANCE_URL,
                {
                    user_id: user?.id,
                    wallet_id: user?.wallet_id,
                    amount: Number(amount),
                }
            );
            onSuccess();
            window.location.href = response.data.url;
        } catch {
            toast({
                title: 'Error',
                description: 'Failed to add balance. Please try again.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Balance</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Balance</DialogTitle>
                    <DialogDescription>
                        Enter the amount you want to add to your wallet.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddBalance}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddBalanceDialog;
