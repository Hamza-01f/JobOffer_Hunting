import { Component } from '@angular/core';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-features',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {

}
