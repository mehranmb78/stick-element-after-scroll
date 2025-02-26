import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { StickAfterScrollDirective } from './stick-after-scroll.directive/stick-after-scroll.directive';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, StickAfterScrollDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isMainSectionHeaderSticky = signal(false)
}
