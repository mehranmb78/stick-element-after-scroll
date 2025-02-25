import { Component, signal } from '@angular/core';
import { StickAfterScrollDirective } from '../stick-after-scroll.directive/stick-after-scroll.directive';

@Component({
  selector: 'app-header',
  imports: [StickAfterScrollDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMainHeaderStick = signal(false)
}
