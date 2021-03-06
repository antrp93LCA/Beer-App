import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IBeer } from '../interfaces/ibeer';
import { DataService } from '../services/data.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  dataSource: MatTableDataSource<IBeer>;

  count =26;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dataService: DataService) {}

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'image_url',
    'abv',
    'ibu',
    'tag',
  ];

  async ngOnInit() {
    const data = await this.dataService.getDataBeers();
    this.dataSource = new MatTableDataSource(data);

    this.dataSource.sort = this.sort;
    this.sort.direction = 'asc';
    this.sort.active = this.displayedColumns[0];
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getTableBeers() {
    return await this.dataService.getDataBeers();
  }

  async addBeer(){
    this.dataSource = new MatTableDataSource(await this.dataService.getDataCount(this.count++));

    this.dataSource.sort = this.sort;
    this.sort.direction = 'asc';
    this.sort.active = this.displayedColumns[0];
  }
}
