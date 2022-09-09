import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Category, UserService } from '../_services/user.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.userService.getDetails().subscribe(data => {
      const categories = data.categories;
      this.categories.push(...categories)
    });
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

}
