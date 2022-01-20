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

  constructor(
    private vehiclesService: VehiclesService,
  ) {
  }

  ngOnInit(): void {

    console.log(this.messageFromParent);

    this.vehiclesService.getAllAvailableVehicles().subscribe({
      next : (result) => {
        console.log(result);
      },
      error : (error) => {
        console.error(error);
      }
    });

  }

  public event(){
    this.messageFromChild.emit("message from child");
  }

}
