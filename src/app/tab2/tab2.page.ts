import { Component } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  locations
  filteredLocations
  filterparam = ""
  constructor(
    private locationService: LocationService
  ) {
    this.reload()
  }
  showMap(loc){
    window.location.href = "https://www.google.com/maps?q="+loc.latitude+","+loc.longitude+""
  }
  reload(){
    this.locationService.getData(result=>{
      console.log(result)
      this.locations = result
      this.filter()
    })
  }
  filter(){
    this.filteredLocations = this.locations.filter(item=>{
      console.log("ITEM",item.name.toLowerCase().indexOf(this.filterparam.toLowerCase())>-1)
      if((item.name.toLowerCase().indexOf(this.filterparam.toLowerCase())>-1)||(item.address.toLowerCase().indexOf(this.filterparam.toLowerCase())>-1)||(item.district.toLowerCase().indexOf(this.filterparam.toLowerCase())>-1)){
        console.log("Item",item)
        return item
      }
    })
  }
}
