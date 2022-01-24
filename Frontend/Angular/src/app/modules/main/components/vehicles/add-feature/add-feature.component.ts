import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FeaturesService } from 'src/app/services/features.service';

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.scss']
})
export class AddFeatureComponent implements OnInit {

  public selectedD = 3;
  constructor(
    private featureService : FeaturesService,
    ) { }

    public featureForm: FormGroup = new FormGroup({
      name: new FormControl(''),
      desirability: new FormControl(''),
    });

    ngOnInit(): void {
      this.reloadFields();
    }

    private reloadFields(): void{
      this.featureForm.patchValue({
        name: '',
        desirability: 3,
      })
    }

    public add(): void{

      var message = document.getElementById('message')!;

      if(!this.featureForm.invalid){
        this.featureService.addFeature(this.featureForm.value).subscribe({
          next: (result) =>
          {
            message.style.color = "green";
            message.innerHTML = "Feature successfully added!";
            this.reloadFields();
          },
          error: (error) =>{
            console.error(error);
          }
        });
      }
      else{
        message.style.color = "red";
        message.innerHTML = "Name cannot be empty!";
      }

      message.style.display = "flex";
    }
}
