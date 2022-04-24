import { Component, Input, OnChanges, Output, } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
    selector:'pm-star',
    templateUrl:'./star.component.html',
    styleUrls:['./star.component.css']
})
export class StarComponent implements OnChanges {

   @Input() rating:number = 0;
            cropWidth:number = 0;

    @Output() starClick: EventEmitter<string> 
                      = new EventEmitter<string>() ; 

    onClick(){
        this.starClick.emit(`rating value is ${this.rating}`);
    }
    ngOnChanges(): void {
        this.cropWidth = this.rating * 75/5;
    }


  
}