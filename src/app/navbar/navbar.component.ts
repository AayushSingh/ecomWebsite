import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/internal/Observable';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(public dialog: MatDialog) {

  }

  /**
   *
   */
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
  }

  /**
   * @param {string} value
   * @returns {string[]}
   * @private
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
  }

}
