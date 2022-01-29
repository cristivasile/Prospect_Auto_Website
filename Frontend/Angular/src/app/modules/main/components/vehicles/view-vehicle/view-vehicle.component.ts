import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectUnsubscribedError, reduce } from 'rxjs';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: [
    '../common.scss',
    './view-vehicle.component.scss',
  ]
})
export class ViewVehicleComponent implements OnInit {

  private id: any;
  public vehicle: any;
  public phoneNumber: string = "0744111222";
  public isSold: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehiclesService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadVehicle();
  }

  private loadVehicle() : void{
    var notFound = document.getElementById('notFoundError')!;
    var found = document.getElementById('found')!;
    var featureContainer = document.getElementById("fContainer")!;

    this.vehicleService.getVehicleById(this.id).subscribe({
      next: (result) =>{
        this.vehicle = result;

        found.style.display = 'block';
        if(this.vehicle.features.length == 0)
              featureContainer.style.display = "none";
        //vehicle can not be edited, since it has been sold
        if(this.vehicle.status.vehicleStatus == "Sold"){
          this.isSold = true;
          var button = document.getElementById("buyVehicleButton")!;
          button.innerHTML = "<strike style='color:red'>Sold</strike>";
        }
      },
      error: (error) =>{
        notFound.style.display = 'block';
        var toDiscard = Array.from(document.getElementsByClassName('discardOnError')! as HTMLCollectionOf<HTMLElement>);

        toDiscard.forEach(element => {
          element.style.display = "none";
        });

        console.error(error);
      }
    })
  }

  public goto() : void{
    this.router.navigate(['/main/vehicles']);
  }

  public getImage(image: string) : any{
    var trustedImage = this.sanitizer.bypassSecurityTrustResourceUrl(image);
    return trustedImage;
  }

  private sleep(ms : any) : any{
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public purchaseVehicle() : void{
    var message = document.getElementById('messageOutput')!;

    this.vehicleService.sellVehicle(this.id).subscribe({
      next: async (result) => {
        message.style.display = "flex";
        message.style.color = "green";
        message.innerHTML = "Thank you for your purchase! You will be redirected.";

        await this.sleep(5000);
        this.router.navigate(['/main/vehicles']);
      },
      error: async (error) => {
        message.style.display = "flex";
        message.style.color = "red";
        message.innerHTML = "An error occured. Perhaps this vehicle has been sold? The page will refresh.";
        console.log(error);
        await this.sleep(5000);
        window.location.reload();
      }
    })
  }

}

