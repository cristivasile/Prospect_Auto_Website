import { query } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  public count: any;
  public displayedColumns = ['brand', 'model', 'year', 'mileage', 'price'];
  constructor(
    private vehiclesService: VehiclesService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    var viewport = document.getElementById("myViewport")!;
    var queryMessage = document.getElementById("queryI")!;
    var endMessage = document.getElementById("endI")!;
    endMessage.style.display = 'none';
    queryMessage.style.display = "none";

    await this.sleep(500);

    this.vehiclesService.getAllAvailableVehicles().subscribe({
      next : (result) => {
        this.afterLoad();
        this.vehicles = result;
        this.count = this.vehicles.length;
        endMessage.style.display = 'flex';

        if(this.count == undefined)
          this.count = 0;

        viewport.style.height = `${this.count * 7.7 + 3}vw`;

        if(this.count == 0){
          console.log("here");
          endMessage.innerHTML = "No results found";
        }
        else{
          endMessage.innerHTML = "End of results";
          queryMessage.style.display = "flex";
        }
        console.log(this.count * 7.7 + 1);
      },
      error : (error) => {
        this.afterLoad();

        viewport.style.height = `${3}vw`;
        endMessage.innerHTML = "No results found";

        console.error(error);
      }
    });

  }

  afterLoad() : void {
    var endMessage = document.getElementById("endI")!;
    var loading = document.getElementById("loading")!;
    endMessage.style.display = 'flex';
    loading.style.display = 'none';
  }

  private sleep(ms : any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
