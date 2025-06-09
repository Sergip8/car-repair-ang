import { Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home-brands',
  imports: [CardComponent, NgFor],
  templateUrl: './home-brands.component.html',
  styleUrl: './home-brands.component.scss'
})
export class HomeBrandsComponent {
  marcas = [
    {
      title: 'Toyota',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota.svg',
    },
    {
      title: 'Ford',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
    },
    {
      title: 'BMW',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
    },
    {
      title: 'Mercedes-Benz',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Mercedes-Benz_Logo_2010.svg',
    },
    {
      title: 'Audi',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
    },
    {
      title: 'Volkswagen',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg',
    },
    {
      title: 'Honda',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg',
    },
    {
      title: 'Nissan',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Nissan_2020_logo.svg',
    },
    {
      title: 'Chevrolet',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_Chevrolet.svg',
    },
    {
      title: 'Hyundai',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg',
    },
  ];
}
