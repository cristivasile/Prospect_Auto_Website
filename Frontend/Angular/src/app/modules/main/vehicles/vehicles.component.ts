import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  @Input() messageFromParent: any;

  @Output() messageFromChild = new EventEmitter<string>();

  public vehicles: any;
  public displayedColumns = ['brand', 'model', 'year', 'mileage', 'price'];
  constructor(
    private vehiclesService: VehiclesService,
  ) {
  }

  ngOnInit(): void {

    this.vehiclesService.getAllAvailableVehicles().subscribe({
      next : (result) => {
        this.vehicles = result;
        console.log(this.vehicles);
      },
      error : (error) => {
        console.error(error);
      }
    });

  }

}
