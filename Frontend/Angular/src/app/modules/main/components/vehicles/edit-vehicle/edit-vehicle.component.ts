import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router} from '@angular/router';
import { vehicleOutputType } from 'src/app/interfaces/vehicle-output-model';
import { FeaturesService } from 'src/app/services/features.service';
import { LocationsService } from 'src/app/services/locations.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { AddFeatureComponent } from '../add-feature/add-feature.component';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: [
    '../common.scss',
    './edit-vehicle.component.scss',
  ]
})
export class EditVehicleComponent implements OnInit {

  @ViewChild('myInput') input!: ElementRef;

  private file: any;
  public id: string = "";
  public vehicleFound: boolean = true;
  public addImage: boolean = false;
  public vehicle: any;
  public featureList : any = [];
  public locationList : any = [];
  public vehicleForm: FormGroup = new FormGroup({
    image: new FormControl(''),
    brand: new FormControl(''),
    model: new FormControl(''),
    mileage: new FormControl(''),
    year: new FormControl(''),
    engineSize: new FormControl(''),
    power: new FormControl(''),
    location: new FormControl(''),
    features: new FormControl(''),
    price: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehiclesService,
    private featureService: FeaturesService,
    private locationService: LocationsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() : void {

    //to avoid errors on page load
    this.vehicle = {
      brand : "",
      model : "",
      year : ""
    }

    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadLocations();
    this.loadFeatures();
    this.loadVehicle();
 }

  private loadVehicle() : void{
    var notFound = document.getElementById('notFoundError')!;
    var found = document.getElementById('found')!;

    this.vehicleService.getVehicleById(this.id).subscribe({
      next: (result) =>{
        this.vehicleFound = true;
        this.vehicle = result;

        var loading = document.getElementById('loading')!;
        loading.style.display = 'none';
        found.style.display = 'block';

        //vehicle can not be edited, since it has been sold
        if(this.vehicle.status.vehicleStatus == "sold"){
          this.vehicleFound = false;
          var message = document.getElementById('')!;
          var description = document.getElementById('description')!;
          message.innerHTML = "Vehicle not available";
          description.innerHTML = "The vehicle you have requested has been sold. It can not be edited!";
        }
        else{
          this.loadVehicleIntoForm();
        }
      },
      error: (error) =>{
        this.vehicleFound = false;

        notFound.style.display = 'block';
        var loading = document.getElementById('loading')!;
        var toDiscard = Array.from(document.getElementsByClassName('discardOnError')! as HTMLCollectionOf<HTMLElement>);

        toDiscard.forEach(element => {
          element.style.display = "none";
        });
        loading.style.display = 'none';

        console.error(error);
      }
    })
  }

  private loadLocations() : void{
    this.locationService.getAllLocations().subscribe({
      next : (result) => {
        this.locationList = result;
      },
      error : (error) => {
        console.error(error);
      }
    });
  }

  private loadFeatures() : void{
    this.featureService.getAllFeatures().subscribe({
      next : (result) => {
        this.featureList = result;
      },
      error : (error) => {
        console.error(error);
      }
    });
  }

  private loadVehicleIntoForm(): void{
    var featureIds : any = [];

    for(var index = 0; index < this.vehicle.features.length; index++){
      featureIds.push(this.vehicle.features[index]!.id);
    }

    this.vehicleForm.patchValue({
      image: '',
      brand: this.vehicle.brand,
      model: this.vehicle.model,
      mileage: this.vehicle.odometer,
      year: this.vehicle.year,
      engineSize: this.vehicle.engineSize,
      power: this.vehicle.power,
      location: this.vehicle.locationId,
      features: featureIds,
      price: this.vehicle.price,
    })
  }

  public goBack():void {
    this.router.navigate(['/main/vehicles']);
  }

  public goto(): void{
    this.router.navigate(['/main']);
  }

  public addFeature() : void {

    var dialogRef = this.dialog.open(AddFeatureComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.loadFeatures();
    })
  }

  public onFileUpload(event: any): void{
    this.file = event.target.files[0];

    if(!this.file.type.startsWith('image')){
      this.input.nativeElement.value = "";
    }
    else{
      this.input.nativeElement.style.color = "black";
    }
  }

  public imageToggle() : void{
    this.addImage = !this.addImage;
  }

  public updateVehicle() : void{
    var message = document.getElementById('messageOutput')!;

    if(!this.vehicleForm.invalid){
      message.style.color = "green";
      message.style.display = "block";
      message.innerHTML = "Vehicle succesfully inserted!"
      var imageB64 = "none";

      if(this.addImage){
      //image must be updated, create image base64 converter
      var reader = new FileReader();
      reader.readAsDataURL(this.file);

        reader.onload = () => {
          imageB64 = reader.result as string;
          var requestBody = this.getRequestBody(imageB64);

          this.sendUpdateRequest(requestBody);
        }
      }
      else{

        //request must be created without
        var requestBody = this.getRequestBody("");

        this.sendUpdateRequest(requestBody);
      }
    }
    else{
      message.style.color = "red";
      message.style.display = "block";
      message.innerHTML = "Please check your input!"

      if(this.input.nativeElement.value == "")
        this.input.nativeElement.style.color = "red";
    }
  }

  private getRequestBody(imageLink: string) : any{
    var requestBody : vehicleOutputType = {
      image: imageLink,
      brand : this.vehicleForm.get('brand')!.value,
      model : this.vehicleForm.get('model')!.value,
      odometer : this.vehicleForm.get('mileage')!.value,
      year : this.vehicleForm.get('year')!.value,
      engineSize : this.vehicleForm.get('engineSize')!.value,
      power : this.vehicleForm.get('power')!.value,
      locationId : this.vehicleForm.get('location')!.value,
      features : this.vehicleForm.get('features')!.value,
      price: this.vehicleForm.get('price')!.value,
    }
    return requestBody;
  }

  private sendUpdateRequest(requestBody: any) : any{
    this.vehicleService.updateVehicle(requestBody, this.id).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
