'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { CreditCard, Landmark, ScanFace, CheckCircle, Hourglass, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const creditPackages = [
  { amount: 500, price: 5, popular: false },
  { amount: 1000, price: 10, popular: true },
  { amount: 5000, price: 45, popular: false },
  { amount: 10000, price: 80, popular: false },
];

const transactionHistory = [
  { id: 'txn_1', date: '2024-07-28', amount: 1000, price: 10, status: 'Completed' },
  { id: 'txn_2', date: '2024-07-15', amount: 500, price: 5, status: 'Completed' },
  { id: 'txn_3', date: '2024-07-01', amount: -200, price: null, description: 'Agent X Usage' },
];

type AuthStatus = 'idle' | 'authenticating' | 'success' | 'failed';

export default function CreditsPage({ params }: { params: { projectId: string } }) {
  const [selectedPackage, setSelectedPackage] = useState<(typeof creditPackages)[0] | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('idle');
  const projectId = params.projectId;

  const handleRechargeClick = (pkg: (typeof creditPackages)[0]) => {
    setSelectedPackage(pkg);
    setAuthStatus('idle'); // Reset auth status when opening dialog
  };

  const handleFaceIdAuth = () => {
    setAuthStatus('authenticating');
    // Simulate biometric authentication
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      setAuthStatus(isSuccess ? 'success' : 'failed');
    }, 2000);
  };

  const closeDialog = () => {
    setSelectedPackage(null);
  };

  const renderAuthContent = () => {
    switch (authStatus) {
      case 'authenticating':
        return (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Hourglass className="h-16 w-16 animate-spin text-primary" />
            <p className="font-semibold">Autenticando...</p>
            <p className="text-sm text-muted-foreground">Por favor, mira a la cámara.</p>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="font-semibold">Recarga Exitosa</p>
            <p className="text-sm text-muted-foreground">
              Se han añadido {selectedPackage?.amount} créditos a tu cuenta.
            </p>
          </div>
        );
      case 'failed':
        return (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <XCircle className="h-16 w-16 text-destructive" />
            <p className="font-semibold">Autenticación Fallida</p>
            <p className="text-sm text-muted-foreground">No se pudo verificar tu identidad. Por favor, inténtalo de nuevo.</p>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <ScanFace className="h-16 w-16 text-primary" />
            <p className="font-semibold">Verifica tu identidad para continuar</p>
            <p className="text-sm text-muted-foreground">
              Para completar la compra de {selectedPackage?.amount} créditos por ${selectedPackage?.price}, necesitamos confirmar que eres tú.
            </p>
          </div>
        );
    }
  };

  const renderAuthFooter = () => {
     switch (authStatus) {
      case 'success':
        return <Button onClick={closeDialog} className="w-full">Cerrar</Button>;
      case 'failed':
        return <Button onClick={handleFaceIdAuth} className="w-full">Intentar de Nuevo</Button>;
      case 'authenticating':
        return <Button disabled className="w-full">Procesando...</Button>;
      case 'idle':
      default:
        return <Button onClick={handleFaceIdAuth} className="w-full">Autenticar con Face ID</Button>;
    }
  }


  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Gestión de Créditos (Proyecto {projectId.toUpperCase()})</h1>
        <p className="text-muted-foreground">
          Recarga tu saldo y consulta tu historial de transacciones.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recargar Créditos</CardTitle>
              <CardDescription>
                Elige un paquete para añadir créditos a tu cuenta.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {creditPackages.map((pkg) => (
                <Card
                  key={pkg.amount}
                  className={cn(
                    'relative flex cursor-pointer flex-col items-center justify-center p-6 transition-all hover:scale-105',
                    'focus-within:ring-2 focus-within:ring-primary'
                  )}
                  onClick={() => handleRechargeClick(pkg)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRechargeClick(pkg)}
                  tabIndex={0}
                >
                  {pkg.popular && (
                    <Badge variant="default" className="absolute -top-3 right-4">
                      Popular
                    </Badge>
                  )}
                  <p className="text-4xl font-bold">{pkg.amount.toLocaleString()}</p>
                  <p className="text-muted-foreground">créditos</p>
                  <Separator className="my-4" />
                  <p className="text-xl font-semibold">${pkg.price}</p>
                  <Button variant="outline" className="mt-4 w-full">
                    Comprar ahora
                  </Button>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Saldo Actual</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold">2,350</p>
              <p className="text-muted-foreground">Créditos disponibles</p>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Métodos de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between rounded-md border p-3">
                  <div className='flex items-center gap-3'>
                    <CreditCard className="h-6 w-6" />
                    <span className="font-medium">Visa **** 4242</span>
                  </div>
                  <Badge variant="default">Primario</Badge>
                </div>
                 <div className="flex items-center justify-between rounded-md border p-3 text-muted-foreground">
                  <div className='flex items-center gap-3'>
                    <Landmark className="h-6 w-6" />
                    <span className="font-medium">Bank of America</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Añadir método de pago
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>

       <Card className="mt-8">
        <CardHeader>
            <CardTitle>Historial de Transacciones</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead className="text-right">Cantidad</TableHead>
                        <TableHead className="text-right">Estado/Precio</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactionHistory.map((txn) => (
                        <TableRow key={txn.id}>
                            <TableCell>{txn.date}</TableCell>
                            <TableCell>
                              {txn.description || `Compra de ${txn.amount} créditos`}
                            </TableCell>
                            <TableCell className={cn("text-right font-medium", txn.amount > 0 ? 'text-green-600' : 'text-red-600')}>
                                {txn.amount > 0 ? '+' : ''}{txn.amount.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                                {txn.status ? (
                                    <Badge variant={txn.status === 'Completed' ? 'secondary' : 'destructive'}>{txn.status}</Badge>
                                ) : (
                                    `$${txn.price}`
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>


      {selectedPackage && (
        <Dialog open={!!selectedPackage} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirmar Recarga</DialogTitle>
              <DialogDescription>
                Estás a punto de comprar {selectedPackage.amount} créditos.
              </DialogDescription>
            </DialogHeader>
            <div className="py-8">
              {renderAuthContent()}
            </div>
            <DialogFooter>
              {renderAuthFooter()}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
