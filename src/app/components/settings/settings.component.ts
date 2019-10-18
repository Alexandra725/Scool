import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  toggleMenu(e){
    const menu = document.querySelector('#toggle');  
    const menuItems = document.querySelector('#overlay');  
    const menuContainer = document.querySelector('.menu-container');  
    const menuIcon = document.querySelector('i'); 
    menuItems.classList.toggle('open');
      menuContainer.classList.toggle('full-menu');
      menuIcon.classList.add('fa-times');
      e.preventDefault();
  }
}
