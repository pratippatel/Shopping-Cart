import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  productForm: any;
  imageData: any;
  notif = new Notyf();

  constructor(
    private formBuilder: FormBuilder,
    private http: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      imgURL: ['', Validators.required],
    });
  }

  onAddProduct(): void {
    console.log({ values: this.productForm.value });
    const formData = new FormData();
    Object.keys(this.productForm.value).forEach((key) =>
      formData.append(key, this.productForm.value[key])
    );
    this.http.addProduct(formData).subscribe((res) => {
      console.log({ res });
      this.notif.success('Product Added !!');
      this.router.navigate(['/']);
    });
  }

  get imgURL() {
    return this.productForm.get('imgURL');
  }
  get name() {
    return this.productForm.get('name');
  }
  get price() {
    return this.productForm.get('price');
  }
  get description() {
    return this.productForm.get('description');
  }
}
