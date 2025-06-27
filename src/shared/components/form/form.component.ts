import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'datetime-local';
  placeholder?: string;
  required?: boolean;
  validators?: any[];
  options?: { value: any; label: string }[]; // Para select y radio
  rows?: number; // Para textarea
  disabled?: boolean;
  value?: any;
  errorMessages?: { [key: string]: string };
}

export interface FormConfig {
  title?: string;
  subtitle?: string;
  fields: FormField[];
  submitButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
}

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class GenericFormComponent implements OnInit {
  @Input() config: FormConfig = { fields: [] };
  @Input() initialData: any = {};
  @Input() loading: boolean = false;

  
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
  @Output() formChange = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    const formControls: { [key: string]: any } = {};

    this.config.fields.forEach(field => {
      const validators = [];
      
      if (field.required) {
        validators.push(Validators.required);
      }
      
      if (field.type === 'email') {
        validators.push(Validators.email);
      }
      
      if (field.validators) {
        validators.push(...field.validators);
      }

      const initialValue = this.initialData[field.name] || field.value || '';
      
      formControls[field.name] = [
        { value: initialValue, disabled: field.disabled || false },
        validators
      ];
    });

    this.form = this.fb.group(formControls);

    // Emit form changes
    this.form.valueChanges.subscribe(value => {
      this.formChange.emit(value);
    });
  }

 onSubmit() {
  if (this.form.valid) {
    const formValue = { ...this.form.value };

    // Convertir los campos numéricos a número
    this.config.fields.forEach(field => {
      if (field.type === 'number') {
        const value = formValue[field.name];
        if (value !== null && value !== undefined && value !== '') {
          formValue[field.name] = Number(value);
        }
      }
    });

    this.formSubmit.emit(formValue);
  } else {
    this.markAllFieldsAsTouched();
  }
}

  onCancel() {
    this.formCancel.emit();
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.form.get(fieldName);
    const field = this.config.fields.find(f => f.name === fieldName);
    
    if (control?.errors && control.touched) {
      const errorKey = Object.keys(control.errors)[0];
      
      if (field?.errorMessages && field.errorMessages[errorKey]) {
        return field.errorMessages[errorKey];
      }
      
      // Default error messages
      switch (errorKey) {
        case 'required':
          return `${field?.label} es requerido`;
        case 'email':
          return 'Ingrese un email válido';
        case 'minlength':
          return `Mínimo ${control.errors[errorKey].requiredLength} caracteres`;
        case 'maxlength':
          return `Máximo ${control.errors[errorKey].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${control.errors[errorKey].min}`;
        case 'max':
          return `El valor máximo es ${control.errors[errorKey].max}`;
        default:
          return 'Campo inválido';
      }
    }
    
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && control.touched);
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.valid && control.touched);
  }
}