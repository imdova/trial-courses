"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Switch } from "@/components/UI/switch";
import { Badge } from "@/components/UI/badge";
import {
  Plus,
  Edit,
  Trash2,
  CreditCard,
  Wallet,
  Building,
  Smartphone,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/UI/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/alert-dialog";

export interface PaymentMethod {
  id: string;
  name: string;
  type: "credit_card" | "bank_transfer" | "e_wallet" | "mobile_payment";
  description: string;
  isActive: boolean;
  processingFee: number; // percentage
  transactionCount?: number;
}

const PAYMENT_TYPE_ICONS = {
  credit_card: CreditCard,
  bank_transfer: Building,
  e_wallet: Wallet,
  mobile_payment: Smartphone,
};

const PAYMENT_TYPE_LABELS = {
  credit_card: "Credit Card",
  bank_transfer: "Bank Transfer",
  e_wallet: "E-Wallet",
  mobile_payment: "Mobile Payment",
};

const PaymentMethodsList = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      name: "Visa/Mastercard",
      type: "credit_card",
      description: "Accept major credit cards",
      isActive: true,
      processingFee: 2.9,
      transactionCount: 1245,
    },
    {
      id: "2",
      name: "Bank Transfer",
      type: "bank_transfer",
      description: "Direct bank account transfer",
      isActive: true,
      processingFee: 0.5,
      transactionCount: 320,
    },
    {
      id: "3",
      name: "PayPal",
      type: "e_wallet",
      description: "PayPal digital wallet",
      isActive: true,
      processingFee: 3.4,
      transactionCount: 567,
    },
    {
      id: "4",
      name: "Mobile Money",
      type: "mobile_payment",
      description: "Mobile payment services",
      isActive: false,
      processingFee: 1.5,
      transactionCount: 89,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    type: "credit_card" as PaymentMethod["type"],
    description: "",
    processingFee: 0,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      type: "credit_card",
      description: "",
      processingFee: 0,
    });
  };

  const handleAddMethod = () => {
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      ...formData,
      isActive: true,
      transactionCount: 0,
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditMethod = () => {
    if (!selectedMethod) return;
    
    setPaymentMethods(
      paymentMethods.map((method) =>
        method.id === selectedMethod.id
          ? { ...method, ...formData }
          : method
      )
    );
    setIsEditDialogOpen(false);
    setSelectedMethod(null);
    resetForm();
  };

  const handleDeleteMethod = () => {
    if (!selectedMethod) return;
    
    setPaymentMethods(
      paymentMethods.filter((method) => method.id !== selectedMethod.id)
    );
    setIsDeleteDialogOpen(false);
    setSelectedMethod(null);
  };

  const handleToggleStatus = (methodId: string) => {
    setPaymentMethods(
      paymentMethods.map((method) =>
        method.id === methodId
          ? { ...method, isActive: !method.isActive }
          : method
      )
    );
  };

  const openEditDialog = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setFormData({
      name: method.name,
      type: method.type,
      description: method.description,
      processingFee: method.processingFee,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Payment Methods</CardTitle>
              <CardDescription>
                Manage available payment methods for students
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {paymentMethods.map((method) => {
              const Icon = PAYMENT_TYPE_ICONS[method.type];
              return (
                <div
                  key={method.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {method.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-xs"
                          >
                            {PAYMENT_TYPE_LABELS[method.type]}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {method.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Processing Fee:</span>
                            <span className="font-medium text-gray-900">
                              {method.processingFee}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Transactions:</span>
                            <span className="font-medium text-gray-900">
                              {method.transactionCount || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Active</span>
                          <Switch
                            checked={method.isActive}
                            onCheckedChange={() => handleToggleStatus(method.id)}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(method)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDeleteDialog(method)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Payment Method Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Add a new payment method for students to use
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-name">Method Name *</Label>
              <Input
                id="add-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Visa/Mastercard"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-type">Type *</Label>
              <select
                id="add-type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as PaymentMethod["type"],
                  })
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="e_wallet">E-Wallet</option>
                <option value="mobile_payment">Mobile Payment</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-description">Description</Label>
              <Input
                id="add-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-fee">Processing Fee (%)</Label>
              <Input
                id="add-fee"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.processingFee}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    processingFee: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="2.9"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddMethod}>Add Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Method Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Payment Method</DialogTitle>
            <DialogDescription>
              Update payment method details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Method Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Visa/Mastercard"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-type">Type *</Label>
              <select
                id="edit-type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as PaymentMethod["type"],
                  })
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="e_wallet">E-Wallet</option>
                <option value="mobile_payment">Mobile Payment</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-fee">Processing Fee (%)</Label>
              <Input
                id="edit-fee"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.processingFee}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    processingFee: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="2.9"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedMethod(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleEditMethod}>Update Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payment Method</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">&quot;{selectedMethod?.name}&quot;</span>?
              This action cannot be undone and may affect existing transactions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedMethod(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMethod}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentMethodsList;

