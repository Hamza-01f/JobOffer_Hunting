import { Component } from '@angular/core';
import { Header } from '../shared/pages/header/header';
import { Footer } from '../shared/pages/footer/footer';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-features',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {

}
