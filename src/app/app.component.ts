import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend_test';

  ngOnInit(): void {
    const toggleButton = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');

    toggleButton?.addEventListener('click', function () {
      wrapper?.classList.toggle('toggled');
    });
  }

}
