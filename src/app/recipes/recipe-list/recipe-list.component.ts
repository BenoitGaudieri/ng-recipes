import { Component, OnInit } from '@angular/core';

// Models
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [
        // call the constructor
        new Recipe("Test recipe", "this is a test", "https://blog.giallozafferano.it/inventaricette/wp-content/uploads/2020/04/panino-con-hamburger-fb.jpg"),
        new Recipe("Test recipe", "this is a test", "https://blog.giallozafferano.it/inventaricette/wp-content/uploads/2020/04/panino-con-hamburger-fb.jpg"),
        
    ]

  constructor() { }

  ngOnInit(): void {
  }

}
