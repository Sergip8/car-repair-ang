
import { Component, OnInit } from '@angular/core';
import { createCustomerFormConfig, customerTableConfig } from '../../../../models/schemas/customer.schema';
import { CustomerService } from '../../../../../_core/services/customer.service';
import { PaginationRequest } from '../../../../models/pagination';
import { AlertService } from '../../../../../_core/services/alert.service';
import { Customer } from '../../../../models/customer';
import { finalize } from 'rxjs';
import { UserService } from '../../../../../_core/services/user.service';
import { UserSearch } from '../../../../models/user';

@Component({
  selector: 'app-admin-customer',
  standalone: false,
  templateUrl: './admin-customer.component.html',
  styleUrl: './admin-customer.component.scss'
})
export class AdminCustomerComponent implements OnInit {


  tableData: any[] = []; 
  formData!: Customer 
  paginationData = { page: 0, size: 10, count: 0 };
  customerFormSchema = createCustomerFormConfig
  customerTableColumns = customerTableConfig
  pagination = new PaginationRequest();
  isModalOpen = false;
  modalTitle = '';
  modalSize: 'small' | 'medium' | 'large' | 'fullscreen' = 'medium';
  modalPosition: 'left' | 'center' | 'right' = 'right';
  formTitle = ""
  formSubtitle = ""
  requestType: "create" | "update" = "create"
  userEmailSearch: UserSearch[] = []
  inputFormDropdown?: {field: string, data: string[]}
  itemForEdit!: Customer

  constructor(private customerService: CustomerService, private userService: UserService, private alert: AlertService) {

  }

  ngOnInit() {

    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers(this.pagination).subscribe({
      next: (response) => {
        this.tableData = response.content; // Asegúrate de que 'data' es la propiedad correcta
        this.paginationData.count = response.totalElements; // Asegúrate de que 'count' es la propiedad correcta
        this.paginationData.page = response.page;
        this.paginationData.size = response.size;
        console.log('Clientes cargados:', this.tableData);
      },
      error: (error) => {
        console.error('Error al cargar los clientes:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe({
      next: msn => console.log(msn),
      error: (error) => this.alert.error(error.message, 'danger')

    })
  }
  editCustomer(data: Customer){
    this.customerService.updateCustomer(data.id, data).subscribe({
      next: d => this.alert.success(d.message, d.type ),
      error: e => this.alert.error(e.error.message, 'error')
    })
  }
  addCustomer(data: Customer){
      this.customerService.createCustomer(data).subscribe({
      next: d => this.alert.success(d.message, d.type ),
      error: e => this.alert.error(e.error.message, 'error')
    })
  }
  onEdit(data: Customer) {
    this.itemForEdit = data
    this.formTitle = "Editar Cliente"
    this.requestType = "update"
    this.formData = data
    console.log(this.formData)
    this.isModalOpen = true
  }
  onDelete(data: any) {
    this.deleteCustomer(data.id)
  }
  pageChange($event: number) {
    throw new Error('Method not implemented.');
  }
  onFormSubmit(data: any) {
    console.log(data)
    if(data.id){
      if(this.compareObjects(data, this.itemForEdit))
        this.alert.info("no se realizo ningun cambio", "info")
      else
      this.editCustomer(data)
    }else{
      this.addCustomer(data)
    }
    this.isModalOpen = false
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onModalOpened(): void {
    console.log('Modal abierto');
  }

  onModalClosed(): void {
    console.log('Modal cerrado');
  }
  onAdd() {
    this.requestType = "create"
    this.formTitle = "Crear Cliente"
      this.formData = new Customer
    this.isModalOpen = true
}
getUserByEmail(query: string, key: string){
  this.userService.searchCustomerByEmail(query).subscribe({
    next: data => {this.userEmailSearch = data
      console.log(data)
       this.inputFormDropdown = {
      data: data.map(d => d.email),
        field: key
    }
    }
  })
}
onSearch(data: {value:string, field: string}){
  console.log(data)
  if(data.field === "email"){
    this.getUserByEmail(data.value, data.field)
   
  }
}
compareObjects<T extends Record<string, any>>(obj1: T, obj2: T): boolean {
  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];
  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

}
