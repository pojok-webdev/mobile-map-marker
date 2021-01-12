import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { ModalController } from '@ionic/angular';
import { EntryEarnComponent } from '../entry-earn/entry-earn.component';

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
    private locationService: LocationService,
    private modal:ModalController
  ) {
    this.reload()
  }
  async entryEarn(item){
    let _moda = await this.modal.create({component:EntryEarnComponent,componentProps:{title:'Entri Perolehan',item:item}})
    _moda.present()
    _moda.onDidDismiss().then(data=>{
      console.log('Success EntryEarn',data)
    },err=>{
      console.log('Error EntryEarn',err)
    })
  }
  showMap(loc){
    window.location.href = "https://www.google.com/maps?q="+loc.latitude+","+loc.longitude+""
  }
  reload(){
    this.locationService.getData(result=>{
      console.log('Get data result',result)
      this.locations = result
      this.filter()
    })
  }
  filter(){
    console.log("Filterparam",this.filterparam)
    this.filteredLocations = this.locations.filter(item=>{
      if((item.name.toLowerCase().indexOf(this.filterparam.toLowerCase())>-1)||(item.cp.toLowerCase().indexOf(this.filterparam.toLowerCase())>-1)||(item.address.toLowerCase().indexOf(this.filterparam.toLowerCase())>-1)||(item.district.toLowerCase().indexOf(this.filterparam.toLowerCase())>-1)){
        console.log("Item",item)
        return item
      }
    })
  }
}
