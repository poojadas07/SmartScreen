import { Component, OnInit } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons/faTelegramPlane';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faFacebookF = faFacebookF;
  faEnvelope = faEnvelope;
  faTwitter = faTwitter;
  faWhatsapp = faWhatsapp;
  faLinkedinIn = faLinkedinIn;
  faTelegramPlane = faTelegramPlane;
  faLink = faLink;

}
