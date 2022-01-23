import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FeaturesService } from 'src/app/services/features.service';
import { LocationsService } from 'src/app/services/locations.service';
import { AddFeatureComponent } from '../add-feature/add-feature.component';


type locationType = {
  address : string,
  id : string,
  employeeNumber: number,
  size : string
};

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})

export class AddVehicleComponent implements OnInit {

  constructor(
    private router: Router,
    private locationService: LocationsService,
    private featureService: FeaturesService,
    public dialog: MatDialog,
  ) { }

  public featureList : any = [];
  public locationList : any = [];
  public vehicleForm: FormGroup = new FormGroup({
    brand: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl(''),
    mileage: new FormControl(''),
    engineSize: new FormControl(''),
    power: new FormControl(''),
    location: new FormControl(''),
    features: new FormControl(''),
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

    console.log(this.vehicleForm.get('features'));

    var dialogRef = this.dialog.open(AddFeatureComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.loadFeatures();
    })

  }
}
