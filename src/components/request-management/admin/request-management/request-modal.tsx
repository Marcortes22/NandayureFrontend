import { RequestDetails } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Calendar, FileText, DollarSign } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { formatDate } from '@/lib/utils';
import { getRequestState, getRequestType } from '../../request-helpers';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const requestTypeRoutes: { [key: number]: string } = {
  1: '/request/vacation-request/',
  2: '/request/salary-certificate/',
  3: '/request/pay-slip/',
};

const RequestModal = ({
  request,
  isOpen,
  onClose,
}: {
  request: RequestDetails | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  if (!request) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles de la Solicitud</DialogTitle>
          <DialogDescription>
            ID de Solicitud: {request.id} | ID de Empleado: {request.EmployeeId}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="flex items-center gap-2">
              {request.RequestTypeId === 1 && <Calendar className="h-4 w-4" />}
              {request.RequestTypeId === 2 && <FileText className="h-4 w-4" />}
              {request.RequestTypeId === 3 && (
                <DollarSign className="h-4 w-4" />
              )}
              <span className="font-semibold">Tipo de Solicitud:</span>
            </div>
            <span>{getRequestType(request.RequestTypeId)}</span>
            <span className="font-semibold">Fecha de Solicitud:</span>
            <span>{formatDate(request.date)}</span>
            <span className="font-semibold">Estado:</span>
            <Badge
              variant={
                request.RequestStateId === 2
                  ? 'approving'
                  : request.RequestStateId === 3
                  ? 'rejecting'
                  : 'pending'
              }
              className="w-24 flex items-center justify-center"
            >
              {getRequestState(request.RequestStateId)}
            </Badge>
          </div>

          {request.RequestTypeId === 1 && request.RequestVacation && (
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="font-semibold">Días Solicitados:</span>
              <span>{request.RequestVacation.daysRequested}</span>
              <span className="font-semibold">Fecha de Salida:</span>
              <span>{formatDate(request.RequestVacation.departureDate)}</span>
              <span className="font-semibold">Fecha de Regreso:</span>
              <span>{formatDate(request.RequestVacation.entryDate)}</span>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Proceso de Aprobación</h3>
            {request.RequestApprovals.map((approval) => (
              <div key={approval.id} className="rounded-md border p-4">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold">Número de Proceso:</span>
                  <span>{approval.processNumber}</span>
                  <span className="font-semibold">ID del Aprobador:</span>
                  <span>{approval.approverId || 'N/A'}</span>
                  <span className="font-semibold">Estado:</span>
                  <Badge
                    variant={
                      approval.approved
                        ? 'approving'
                        : approval.approved === false
                        ? 'rejecting'
                        : 'pending'
                    }
                    className="w-24 flex items-center justify-center"
                  >
                    {approval.approved
                      ? 'Aprobado'
                      : approval.approved === false
                      ? 'Rechazado'
                      : 'Pendiente'}
                  </Badge>
                  {approval.ApprovedDate && (
                    <>
                      <span className="font-semibold">
                        Fecha de Aprobación:
                      </span>
                      <span>{formatDate(approval.ApprovedDate)}</span>
                    </>
                  )}
                  {approval.observation && (
                    <>
                      <span className="font-semibold">Observación:</span>
                      <span>{approval.observation}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {request.RequestStateId === 2 && request.RequestTypeId === 1 && (
          <div className="flex justify-end mt-4">
            <Link
              href={`/request/vacation-request/${request.RequestVacation?.id}`}
            >
              <Button>Imprimir</Button>
            </Link>
          </div>
        )}

        {request.RequestStateId === 2 && request.RequestTypeId === 2 && (
          <div className="flex justify-end mt-4">
            <Link
              href={`/request/salary-certificate/${request.RequestSalaryCertificate?.id}`}
            >
              <Button>Imprimir</Button>
            </Link>
          </div>
        )}
        {request.RequestStateId === 2 && request.RequestTypeId === 3 && (
          <div className="flex justify-end mt-4">
            <Link
              href={`/request/pay-slip/${request.RequestPaymentConfirmation?.id}`}
            >
              <Button>Imprimir</Button>
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestModal;
