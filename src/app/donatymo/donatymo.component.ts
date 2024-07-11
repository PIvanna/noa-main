import { Component } from '@angular/core';

@Component({
  selector: 'app-donatymo',
  templateUrl: './donatymo.component.html',
  styleUrls: ['./donatymo.component.scss']
})
export class DonatymoComponent {
  public count = 2264409;
  private targetCount = 4064409;
  private interval: any;

  ngAfterViewInit() {
    this.startIncrementing();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startIncrementing() {
    this.interval = setInterval(() => {
      if (this.count < this.targetCount) {
        this.count += 50000;
      } else {
        clearInterval(this.interval);
      }
    }, 100); // інтервал в мілісекундах
  }
  images = [
    'https://firebasestorage.googleapis.com/v0/b/noa1-cc860.appspot.com/o/images%2F419a1479-rotated-699x437.webp?alt=media&token=45cef2cb-49bc-4200-b868-82ca8b6c7ce2',
    'https://firebasestorage.googleapis.com/v0/b/noa1-cc860.appspot.com/o/images%2Fzobrazhennya_viber_2023-06-04_16-59-46-342.jpg?alt=media&token=a95b905a-3c11-455a-8105-803428e1d33f',
    'https://firebasestorage.googleapis.com/v0/b/noa1-cc860.appspot.com/o/images%2F419a1479-rotated-699x437.webp?alt=media&token=45cef2cb-49bc-4200-b868-82ca8b6c7ce2',
    'https://firebasestorage.googleapis.com/v0/b/noa1-cc860.appspot.com/o/images%2F419a1479-rotated-699x437.webp?alt=media&token=45cef2cb-49bc-4200-b868-82ca8b6c7ce2',
    'https://firebasestorage.googleapis.com/v0/b/noa1-cc860.appspot.com/o/images%2F419a1479-rotated-699x437.webp?alt=media&token=45cef2cb-49bc-4200-b868-82ca8b6c7ce2',
    'https://firebasestorage.googleapis.com/v0/b/noa1-cc860.appspot.com/o/images%2F419a1479-rotated-699x437.webp?alt=media&token=45cef2cb-49bc-4200-b868-82ca8b6c7ce2',
    'https://firebasestorage.googleapis.com/v0/b/noa1-cc860.appspot.com/o/images%2F419a1479-rotated-699x437.webp?alt=media&token=45cef2cb-49bc-4200-b868-82ca8b6c7ce2',
    'https://firebasestorage.googleapis.com/v0/b/noa1-cc860.appspot.com/o/images%2F419a1479-rotated-699x437.webp?alt=media&token=45cef2cb-49bc-4200-b868-82ca8b6c7ce2',
  ];

  currentIndex = 0;

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
