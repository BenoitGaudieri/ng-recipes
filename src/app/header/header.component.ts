import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() feautreSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onSelect(feature: string) {
    this.feautreSelected.emit(feature);
  }
}
