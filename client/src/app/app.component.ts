import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from './search.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ng-domain-lookup';
  domain: string;
  message: any;
  errorMessage: any;
  loading = false;

  constructor(private searchService: SearchService,
              private Title: Title) {}

  ngOnInit() {
    this.Title.setTitle('Ng-domain-lookup');
  }

  search(form: NgForm) {
    if (form.valid) {
      this.message = null;
      this.errorMessage = null;

      this.loading = !this.loading;
      this.searchService.checkDomain(this.domain)
      .then(
        data => {
          this.loading = !this.loading;
          this.message = data;
        }
      ).catch(
        err => {
          this.loading = !this.loading;
          this.errorMessage = err;
        }
      );
    }
  }

}
