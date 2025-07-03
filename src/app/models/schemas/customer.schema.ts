import { FormConfig } from "../../../shared/components/form/form.component";
import { TableColumn } from "../../../shared/components/table/table.component";

export const createCustomerFormConfig: FormConfig = {
  title: 'Crear Cliente',
  subtitle: 'Completa los datos del nuevo cliente',
  submitButtonText: 'Guardar',
  cancelButtonText: 'Cancelar',
  showCancelButton: true,
  fields: [
    {
      name: 'firstName',
      label: 'Nombre',
      type: 'text',
      required: true
    },
    {
      name: 'lastName',
      label: 'Apellido',
      type: 'text',
      required: true
    },
    {
      name: 'phoneNumber',
      label: 'Teléfono',
      type: 'text',
      required: false
    },
    {
      name: 'email',
      label: 'Email',
      type: 'search',
      required: false
    },
    {
      name: 'address',
      label: 'Dirección',
      type: 'text',
      required: false
    },
    {
      name: 'city',
      label: 'Ciudad',
      type: 'text',
      required: false
    },
    {
      name: 'postalCode',
      label: 'Código Postal',
      type: 'text',
      required: false
    },
    {
      name: 'state',
      label: 'Departamento/Estado',
      type: 'text',
      required: false
    }
  ]
};

export const customerTableConfig: TableColumn[] = [
  {
      key: 'firstName',
      label: 'Nombre',
    type: 'text',
    sortable: true,
    align: 'left',
  },
  {
      key: 'lastName',
      label: 'Apellido',
      type: 'text',
      sortable: true,
      align: 'left',
  },
  {
      key: 'phoneNumber',
      label: 'Teléfono',
    type: 'text',
    sortable: true,
    align: 'left',
  },
  {
      key: 'city',
      label: 'Ciudad',
    type: 'text',
    sortable: false,
    align: 'left',
  },
  {
      key: 'address',
      label: 'Dirección',
    type: 'text',
    sortable: true,
    align: 'left',
  },
   {
      key: 'action',
      label: 'Acciones',
    type: 'actions',
    sortable: true,
    align: 'center',
  },
];