import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePatchDepartament } from '@/hooks';
import { Department } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface Props {
  department: Department;
  departmentId: number;
}

export default function EditDepartmentModal({
  department,
  departmentId,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation } =
    usePatchDepartament({
      setIsOpen: setIsEditModalOpen,
      departmentId: departmentId,
    });

  return (
    <>
      <Button variant="outline" size="icon" className="mr-2">
        <Pencil onClick={() => setIsEditModalOpen(true)} className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Departamento</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <div className="col-span-3 flex flex-col">
                <Input
                  id="name"
                  defaultValue={department.name}
                  className="col-span-3"
                  type="text"
                  {...register('name')}
                />
                {errors?.name && (
                  <span id="name-error" className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </span>
                )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descripción
                </Label>
                <div className="col-span-3 flex flex-col">
                <Input
                  id="description"
                  defaultValue={department.description}
                  className="col-span-3"
                  {...register('description')}
                />
                {errors?.description && (
                  <span id="description-error" className="text-red-500 text-sm mt-2">
                    {errors.description.message}
                  </span>
                )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departmentProgramId" className="text-right">
                  Programa
                </Label>
                <div className="col-span-3 flex flex-col">
                <Input
                  id="departmentProgramId"
                  defaultValue={department.departmentProgramId}
                  className="col-span-3"
                  {...register('departmentProgramId')}
                />
                {errors?.departmentProgramId && (
                  <span
                    id="departmentProgramId-error"
                    className="text-red-500 text-sm mt-2"
                  >
                    {errors.departmentProgramId.message}
                  </span>
                )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budgetCodeId" className="text-right">
                  Código de presupuesto
                </Label>
                <div className="col-span-3 flex flex-col">
                <Input
                  id="budgetCodeId"
                  defaultValue={department.budgetCodeId}
                  className="col-span-3"
                  {...register('budgetCodeId')}
                />
                {errors?.budgetCodeId && (
                  <span
                    id="budgetCodeId-error"
                    className="text-red-500 text-sm mt-2"
                  >
                    {errors.budgetCodeId.message}
                  </span>
                )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departmentHeadId" className="text-right">
                  Jefe de departamento
                </Label>
                <div className="col-span-3 flex flex-col">
                  <Input
                    id="departmentHeadId"
                    defaultValue={department.departmentHeadId}
                    className="col-span-3"
                    {...register('departmentHeadId')}
                  />
                  {errors?.departmentHeadId && (
                    <span
                      id="departmentHeadId-error"
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.departmentHeadId.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
