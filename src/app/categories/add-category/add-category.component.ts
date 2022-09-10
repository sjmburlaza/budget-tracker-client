import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category, UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  form: any = {
    name: null,
    type: null
  };

  constructor(public ref: DynamicDialogRef, private userService: UserService,) { }

  categories: Category[] = [];

  ngOnInit(): void {
  }
  
  addCategory(name: string, type: string): void {
    name = name.trim();

    if (!name){
      return;
    }
    this.userService.addCategory({name, type} as Category).subscribe( category => {
      this.categories.push(category);
    });
  }

  close() {
    this.ref.close();
}

}
