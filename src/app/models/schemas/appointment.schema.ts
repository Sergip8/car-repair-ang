import { FormConfig } from '../../../shared/components/form/form.component';
import { TableColumn } from '../../../shared/components/table/table.component';
import { AppointmentStatus } from '../appointment';

export const appointmentFormConfig: FormConfig = {
  title: 'Registrar Cita',
  subtitle: 'Completa la información de la cita',
  submitButtonText: 'Guardar',
  cancelButtonText: 'Cancelar',
  showCancelButton: true,
  fields: [
    {
      name: 'scheduledDateTime',
      label: 'Fecha y Hora',
      type: 'datetime-local',
      required: true
    },
    {
      name: 'estimatedDurationMinutes',
      label: 'Duración Estimada (minutos)',
      type: 'number',
      required: true
    },
    // {
    //   name: 'status',
    //   label: 'Estado',
    //   type: 'select',
    //   required: true,
    //   options: [
    //     { label: 'Programada', value: AppointmentStatus.Scheduled },
    //     { label: 'Confirmada', value: AppointmentStatus.Confirmed },
    //     { label: 'En Progreso', value: AppointmentStatus.InProgress },
    //     { label: 'Completada', value: AppointmentStatus.Completed },
    //     { label: 'Cancelada', value: AppointmentStatus.Cancelled },
    //     { label: 'No Asistió', value: AppointmentStatus.NoShow }
    //   ]
    // },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      required: false
    },
    {
      name: 'customerNotes',
      label: 'Notas del Cliente',
      type: 'textarea',
      required: false
    }
  ]
};

export const appointmentTableConfig: TableColumn[] = [
  {
    key: 'scheduledDateTime',
    label: 'Fecha y Hora',
    type: 'date',
    sortable: true,
    align: 'left',
  },
  {
    key: 'customerId',
    label: 'Cliente',
    type: 'number',
    sortable: true,
    align: 'left',
  },
  {
    key: 'vehicleId',
    label: 'Vehículo',
    type: 'number',
    sortable: true,
    align: 'left',
  },
  {
    key: 'estimatedDurationMinutes',
    label: 'Duración (min)',
    type: 'number',
    sortable: true,
    align: 'center',
  },
  {
    key: 'status',
    label: 'Estado',
    type: 'text',
    sortable: true,
    align: 'center',
  },
  {
    key: 'description',
    label: 'Descripción',
    type: 'text',
    sortable: false,
    align: 'left',
  },
  {
    key: 'customerNotes',
    label: 'Notas del Cliente',
    type: 'text',
    sortable: false,
    align: 'left',
  },
];
