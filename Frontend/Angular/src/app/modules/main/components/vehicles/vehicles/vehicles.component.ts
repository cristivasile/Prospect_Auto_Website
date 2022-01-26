import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  @Input() messageFromParent: any;

  @Output() messageFromChild = new EventEmitter<string>();


  public vehicles: any;
  public brandSet: Set<string> = new Set<string>();
  public brands: any;
  public isAdmin: boolean = false;
  public displayStatus: boolean = false;
  public hasSearch: boolean = false;
  public hasFilter: boolean = false;
  public count: any;
  public displayedColumns = ['brand', 'model', 'year', 'mileage', 'price'];
  constructor(
    private vehiclesService: VehiclesService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dataService : DataService,
  ) {
  }

  public SearchForm: FormGroup = new FormGroup({
    type: new FormControl(''),
  });

  public FilterForm: FormGroup = new FormGroup({
    sort: new FormControl(''),
    sortAsc: new FormControl(false),
    brand: new FormControl(''),
    minYear: new FormControl(0),
    maxMileage: new FormControl(0),
    maxPrice: new FormControl(0),
  });

  async ngOnInit(): Promise<void> {

    if(localStorage.getItem('Role') == "Admin" || localStorage.getItem('Role') == "SysAdmin"){
      this.isAdmin = true;
    }

    this.getState();
    this.beforeVehiclesLoad();
    this.loadVehicles();

  }

  private getState() : void{
    this.hasFilter = this.dataService.getHasFilters();
    this.hasSearch = this.dataService.getHasSearch();

    if(this.hasSearch){
      this.SearchForm.patchValue({
        type: this.dataService.getSearch(),
      });
    }

    if(this.hasFilter){
      var filters = this.dataService.getFilters();
      this.FilterForm.patchValue({
        sort: filters.sort,
        sortAsc: filters.sortAsc,
        brand: filters.brand,
        minYear: filters.minYear,
        maxMileage: filters.maxMileage,
        maxPrice: filters.maxPrice,
      });
    }
  }

  private beforeVehiclesLoad() : void {
    var queryMessage = document.getElementById("queryI")!;
    var endMessage = document.getElementById("endI")!;
    endMessage.style.display = 'none';
    queryMessage.style.display = "none";
  }

  private afterVehiclesLoad() : void {
    var endMessage = document.getElementById("endI")!;
    var loading = document.getElementById("loading")!;
    endMessage.style.display = 'flex';
    loading.style.display = 'none';
  }

  private loadVehicles(getAll : boolean = false) : void{
    var viewport = document.getElementById("myViewport")!;
    var loading = document.getElementById("loading")!;


    this.beforeVehiclesLoad();

    var vehicleCards = Array.from(document.getElementsByClassName("myCard")! as HTMLCollectionOf<HTMLElement>);

    vehicleCards.forEach(x => x.style.display = "none");

    loading.style.display = "flex";

    viewport.style.height = `${3}vw`;

    if(!getAll){
      if(!this.hasSearch && !this.hasFilter){
        this.vehiclesService.getAllAvailableVehicles().subscribe({
          next : (result) => this.getVehiclesSuccessful(result),
          error : (error) => this.getVehiclesFailed(error)
        });
      }

      else if(this.hasSearch){
        let search = this.SearchForm.get('type')!.value;

        this.vehiclesService.getAllAvailableByType(search).subscribe({
          next : (result) => this.getVehiclesSuccessful(result,` (type containing '${search}')`),
          error : (error) => this.getVehiclesFailed(error)
        });

      }

      else if(this.hasFilter){
        this.vehiclesService.getAllAvailableFiltered(this.FilterForm.value).subscribe({
          next : (result) => this.getVehiclesSuccessful(result, " (filtered)"),
          error : (error) => this.getVehiclesFailed(error)
        });
      }
    }
    else{
      this.vehiclesService.getAllVehicles().subscribe({
        next : (result) => this.getVehiclesSuccessful(result),
        error : (error) => this.getVehiclesFailed(error)
      });
    }
  }

  private getVehiclesSuccessful(result: any, queryType: string="") : void{
    var queryMessage = document.getElementById("queryI")!;
    var viewport = document.getElementById("myViewport")!;
    var endMessage = document.getElementById("endI")!;

    this.afterVehiclesLoad();
    this.vehicles = result;
    this.loadBrands();

    queryMessage.innerHTML = `<p> &nbsp; Displaying ${this.vehicles.length} results${queryType}:</p>`;

    this.count = this.vehicles.length;
    endMessage.style.display = 'flex';

    if(this.count == undefined)
      this.count = 0;

    viewport.style.height = `${this.count * 7.7 + 4.6}vw`;

    if(this.count == 0){
      endMessage.innerHTML = "No results found";
    }
    else{
      endMessage.innerHTML = "End of results";
      queryMessage.style.display = "flex";
    }
  }

  private getVehiclesFailed(error: any){
    var viewport = document.getElementById("myViewport")!;
    var endMessage = document.getElementById("endI")!;

    this.afterVehiclesLoad();

    viewport.style.height = `${3}vw`;
    endMessage.innerHTML = "No results found";

    console.error(error);
  }

  private loadBrands() : void{
    for(var index = 0; index < this.vehicles.length; index++)
      this.brandSet.add(this.vehicles[index].brand);

    this.brands = Array.from(this.brandSet).sort();
  }

  public deleteVehicle(vehicle: any) : void{

    this.vehiclesService.deleteVehicle(vehicle.id).subscribe({
      next: async (result) => {
        this.loadVehicles();
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

  public view(id: string) : any{
    this.router.navigate([`/main/vehicle/view/${id}`])
  }

  public viewAll() : any{
    this.displayStatus = true;
    this.loadVehicles(true);
  }

  public searchBy(): void{
    this.hasSearch = true;
    this.hasFilter = false;
    this.displayStatus = false;

    this.FilterForm.patchValue({
      sort: '',
      sortAsc: false,
      brand: '',
      minYear: 0,
      maxMileage: 0,
      maxPrice: 0,
    });

    this.patchState();
    this.loadVehicles();
  }

  public filter(): void {
    this.hasSearch = false;
    this.hasFilter = true;
    this.displayStatus = false;

    this.SearchForm.patchValue({
      type: '',
    });

    this.patchState();
    this.loadVehicles();
  }

  public reset(): void {
    this.hasSearch = false;
    this.hasFilter = false;
    this.displayStatus = false;

    this.FilterForm.patchValue({
      sort: '',
      sortAsc: false,
      brand: '',
      minYear: 0,
      maxMileage: 0,
      maxPrice: 0,
    });

    this.SearchForm.patchValue({
      type: '',
    });

    this.patchState();
    this.loadVehicles();
  }

  public patchState() : void{
    var input = document.getElementById("typeSearch")! as HTMLInputElement;
    this.dataService.patchState(this.hasSearch, this.hasFilter, this.FilterForm.value, input.value);
  }
}
