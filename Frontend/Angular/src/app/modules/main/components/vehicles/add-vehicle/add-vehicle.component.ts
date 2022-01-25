import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild, ɵɵsetComponentScope } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { vehicleOutputType } from 'src/app/interfaces/vehicle-output-model';
import { FeaturesService } from 'src/app/services/features.service';
import { LocationsService } from 'src/app/services/locations.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { AddFeatureComponent } from '../add-feature/add-feature.component';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: [
    './add-vehicle.component.scss',
    '../common.scss',
  ]
})

export class AddVehicleComponent implements OnInit {

  @ViewChild('myInput') input!: ElementRef;

  constructor(
    private router: Router,
    private locationService: LocationsService,
    private featureService: FeaturesService,
    private vehicleService: VehiclesService,
    public dialog: MatDialog,
  ) { }

  private file: any;
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

  ngOnInit(): void {
    this.loadLocations();
    this.loadFeatures();
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

  public goBack():void {
    this.router.navigate(['/main/vehicles']);
  }

  public addFeature() : void {

    var dialogRef = this.dialog.open(AddFeatureComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.loadFeatures();
    })

  }

  public addVehicle() : void{
    var message = document.getElementById('messageOutput')!;

    if(!this.vehicleForm.invalid){
      message.style.color = "green";
      message.style.display = "block";
      message.innerHTML = "Vehicle succesfully inserted!"
      var imageB64;

      var reader = new FileReader();
      reader.readAsDataURL(this.file);

      reader.onload = () => {
        imageB64 = reader.result as string;

        var requestBody : vehicleOutputType = {
          image: imageB64,
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

        this.vehicleService.addVehicle(requestBody).subscribe({
          next: (result) => {
            console.log(result);
          },
          error: (error) => {
            console.error(error);
          }
        })

        this.vehicleForm.reset();
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

  public onFileUpload(event: any): void{
    this.file = event.target.files[0];

    if(!this.file.type.startsWith('image')){
      this.input.nativeElement.value = "";
    }
    else{
      this.input.nativeElement.style.color = "black";
    }
  }
}
