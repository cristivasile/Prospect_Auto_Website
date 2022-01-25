import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  @Input() messageFromParent: any;

  @Output() messageFromChild = new EventEmitter<string>();


  public vehicles: any;
  public isAdmin: boolean = false;
  public displayStatus: boolean = false;
  public count: any;
  public displayedColumns = ['brand', 'model', 'year', 'mileage', 'price'];
  constructor(
    private vehiclesService: VehiclesService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
  }

  async ngOnInit(): Promise<void> {

    var viewport = document.getElementById("myViewport")!;

    this.beforeLoad();

    if(localStorage.getItem('Role') == "Admin" || localStorage.getItem('Role') == "SysAdmin"){
      this.isAdmin = true;
    }

    await this.sleep(500);

    await this.loadVehicles();

  }

  private async loadVehicles() : Promise<void>{
    var viewport = document.getElementById("myViewport")!;
    var queryMessage = document.getElementById("queryI")!;
    var endMessage = document.getElementById("endI")!;
    var loading = document.getElementById("loading")!;

    var vehicleCards = Array.from(document.getElementsByClassName("myCard")! as HTMLCollectionOf<HTMLElement>);

    vehicleCards.forEach(x => x.style.display = "none");

    loading.style.display = "flex";

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
          endMessage.innerHTML = "No results found";
        }
        else{
          endMessage.innerHTML = "End of results";
          queryMessage.style.display = "flex";
        }
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

  beforeLoad() : void {
    var queryMessage = document.getElementById("queryI")!;
    var endMessage = document.getElementById("endI")!;
    endMessage.style.display = 'none';
    queryMessage.style.display = "none";
  }

  private sleep(ms : any) : any{
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public deleteVehicle(vehicle: any) : void{
    this.vehiclesService.deleteVehicle(vehicle.id).subscribe({
      next: async (result) => {
        await this.loadVehicles();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  public editVehicle(id: string) : void{
    this.router.navigate([`/main/vehicle/edit/${id}`])
  }

  public addNew() : void{
    this.router.navigate(['/main/vehicle/add']);
  }

  public getImage(image: string) : any{
    var trustedImage = this.sanitizer.bypassSecurityTrustResourceUrl(image);
    return trustedImage;
  }

  public view(id: string, event: any) : any{
    event.stopPropagation();
    this.router.navigate([`/main/vehicle/view/${id}`])
  }

  public viewAll() : any{
    var viewport = document.getElementById("myViewport")!;
    var queryMessage = document.getElementById("queryI")!;
    var endMessage = document.getElementById("endI")!;

    this.vehiclesService.getAllVehicles().subscribe({
      next : (result) => {

        this.afterLoad();
        this.vehicles = result;
        console.log(result);
        this.displayStatus = true;

        this.count = this.vehicles.length;
        endMessage.style.display = 'flex';

        if(this.count == undefined)
          this.count = 0;

        viewport.style.height = `${this.count * 7.7 + 3}vw`;

        if(this.count == 0){
          endMessage.innerHTML = "No results found";
        }
        else{
          endMessage.innerHTML = "End of results";
          queryMessage.style.display = "flex";
        }
      },
      error : (error) => {
        this.afterLoad();

        viewport.style.height = `${3}vw`;
        endMessage.innerHTML = "No results found";

        console.error(error);
      }
    });
  }

  public searchBy() : void{
    var viewport = document.getElementById("myViewport")!;
    var queryMessage = document.getElementById("queryI")!;
    var endMessage = document.getElementById("endI")!;

    var input = document.getElementById("typeSearch")! as HTMLInputElement;

    this.vehiclesService.getAllAvailableFiltered(input.value).subscribe({
      next : (result) => {

        this.afterLoad();
        this.vehicles = result;
        console.log(result);
        this.displayStatus = true;

        this.count = this.vehicles.length;
        endMessage.style.display = 'flex';

        if(this.count == undefined)
          this.count = 0;

        viewport.style.height = `${this.count * 7.7 + 3}vw`;

        if(this.count == 0){
          endMessage.innerHTML = "No results found";
        }
        else{
          endMessage.innerHTML = "End of results";
          queryMessage.style.display = "flex";
        }
      },
      error : (error) => {
        this.afterLoad();

        viewport.style.height = `${3}vw`;
        endMessage.innerHTML = "No results found";

        console.error(error);
      }
    });
  }
}
