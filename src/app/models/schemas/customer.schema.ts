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
      name: 'FirstName',
      label: 'Nombre',
      type: 'text',
      required: true
    },
    {
      name: 'LastName',
      label: 'Apellido',
      type: 'text',
      required: true
    },
    {
      name: 'Email',
      label: 'Correo electrónico',
      type: 'email',
      required: true
    },
    {
      name: 'PhoneNumber',
      label: 'Teléfono',
      type: 'text',
      required: false
    },
    {
      name: 'Address',
      label: 'Dirección',
      type: 'text',
      required: false
    },
    {
      name: 'City',
      label: 'Ciudad',
      type: 'text',
      required: false
    },
    {
      name: 'PostalCode',
      label: 'Código Postal',
      type: 'text',
      required: false
    },
    {
      name: 'State',
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
    align: 'left',
  },
];