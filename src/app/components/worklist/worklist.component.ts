import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'sample 1', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'sample 2', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'sample 3', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'sample 4', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'sample 5', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'sample 6', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'sample 7', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'sample 8', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'sample 9', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'sample 10', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.css']
})
export class WorklistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
