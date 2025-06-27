import { FormConfig } from "../../../shared/components/form/form.component";
import { TableColumn } from "../../../shared/components/table/table.component";

export const vehicleFormConfig: FormConfig = {
  title: 'Registrar Vehículo',
  subtitle: 'Completa la información del vehículo',
  submitButtonText: 'Guardar',
  cancelButtonText: 'Cancelar',
  showCancelButton: true,
  fields: [
    {
      name: 'Make',
      label: 'Marca',
      type: 'text',
      required: true
    },
    {
      name: 'Model',
      label: 'Modelo',
      type: 'text',
      required: true
    },
    {
      name: 'Year',
      label: 'Año',
      type: 'number',
      required: true
    },
    {
      name: 'VIN',
      label: 'VIN',
      type: 'text',
      required: true
    },
    {
      name: 'LicensePlate',
      label: 'Placa',
      type: 'text',
      required: true
    },
     {
      name: 'Mileage',
      label: 'Kilometraje',
      type: 'number',
      required: true
    },
    {
      name: 'Color',
      label: 'Color',
      type: 'text',
      required: false
    },
    {
      name: 'Engine',
      label: 'Motor',
      type: 'text',
      required: false
    },
   
    {
      name: 'Transmission',
      label: 'Transmisión',
      type: 'text',
      required: false
    },
    {
      name: 'Notes',
      label: 'Notas',
      type: 'textarea',
      required: false
    },
   
  ]
};

export const vehicleTableConfig: TableColumn[] = [
  {
    key: 'make',
    label: 'Marca',
    type: 'text',
    sortable: true,
    align: 'left',
  },
  {
    key: 'model',
    label: 'Modelo',
    type: 'text',
    sortable: true,
    align: 'left',
  },
  {
    key: 'year',
    label: 'Año',
    type: 'number',
    sortable: true,
    align: 'center',
  },
  {
    key: 'vin',
    label: 'VIN',
    type: 'text',
    sortable: false,
    align: 'left',
  },
  {
    key: 'licensePlate',
    label: 'Placa',
    type: 'text',
    sortable: true,
    align: 'left',
  },
];